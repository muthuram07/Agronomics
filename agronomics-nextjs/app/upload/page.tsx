"use client"

import React, { useState } from "react"
import { Upload as UploadIcon, FileCheck, AlertCircle, Sprout, TrendingUp, DollarSign, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AgmarknetAPI, CommodityStats } from "@/lib/api/agmarknet"
import { WeatherAPI } from "@/lib/api/weather"
import { ProfitCalculator, HarvestRecommendation } from "@/lib/utils/profit-calculator"
import { MarketInsightsCard } from "@/components/dashboard/market-insights-card"
import { HarvestScheduler } from "@/components/dashboard/harvest-scheduler"

export default function UploadPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<{
        crop: string;
        health: string;
        disease?: string;
        confidence: number;
    } | null>(null)

    // Dashboard data for the detected crop
    const [marketStats, setMarketStats] = useState<CommodityStats | null>(null)
    const [recommendation, setRecommendation] = useState<HarvestRecommendation | null>(null)
    const [forecast, setForecast] = useState<any[]>([])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            setAnalysisResult(null) // Reset on new file
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) return
        setUploading(true)
        setAnalysisResult(null)

        try {
            const formData = new FormData()
            formData.append('file', selectedFile)

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
            const response = await fetch(`${apiUrl}/predict`, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Analysis failed')
            }

            const data = await response.json()
            
            if (data.error) {
                throw new Error(data.error)
            }

            const detectedCrop = data.label || "Unknown"
            const confidence = Math.round((data.confidence || 0) * 100)

            setAnalysisResult({
                crop: detectedCrop,
                health: confidence > 70 ? "Healthy" : "At Risk",
                disease: confidence > 70 ? "No major issues detected" : `Potential issue: ${detectedCrop}`,
                confidence: confidence
            })

            // Fetch Market Context for Detected Crop
            try {
                const stats = await AgmarknetAPI.fetchCommodityStats(detectedCrop, "Maharashtra")
                const weather = await WeatherAPI.fetchForecast(19.75, 75.71)
                const rec = ProfitCalculator.generateRecommendation(stats, weather)

                setMarketStats(stats)
                setForecast(weather)
                setRecommendation(rec)
            } catch (err) {
                console.error("Failed to fetch context", err)
            }
        } catch (err: any) {
            console.error("Upload error:", err)
            alert(err.message || "Something went wrong during analysis")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="min-h-screen py-12 bg-slate-50/50">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center animate-fade-in">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">
                            Crop Analysis & Market Sync
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Upload a photo of your crop to detect diseases and instantly get market insights and profitability recommendations.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column: Upload */}
                        <div className="space-y-6">
                            <Card className="border-border/50 shadow-sm bg-white h-full">
                                <CardHeader>
                                    <CardTitle className="text-xl">Upload Image</CardTitle>
                                    <CardDescription>Supported: JPG, PNG (Max 10MB)</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-emerald-500 hover:bg-emerald-50/10 transition-all duration-200 group">
                                        <input
                                            type="file"
                                            id="file-upload"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="cursor-pointer flex flex-col items-center gap-4"
                                        >
                                            {preview ? (
                                                <div className="space-y-4 w-full">
                                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
                                                        <img
                                                            src={preview}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium">
                                                        <FileCheck className="h-4 w-4" />
                                                        <span>{selectedFile?.name}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <UploadIcon className="h-8 w-8 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-medium text-slate-900">
                                                            Click or drag image here
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </label>
                                    </div>

                                    {selectedFile && (
                                        <div className="mt-6">
                                            <Button
                                                size="lg"
                                                onClick={handleUpload}
                                                disabled={uploading}
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-600/20"
                                            >
                                                {uploading ? "Analyzing Crop..." : "Analyze Crop"}
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Results & Insights */}
                        <div className="space-y-6">
                            {analysisResult ? (
                                <div className="space-y-6 animate-slide-in">
                                    {/* Analysis Result Card */}
                                    <Card className="border-l-4 border-l-amber-500 border-t border-r border-b border-slate-200 shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                <AlertTriangle className="h-5 w-5 text-amber-500" />
                                                Analysis Result
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Detected Crop</p>
                                                    <p className="text-lg font-bold text-slate-900">{analysisResult.crop}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Confidence</p>
                                                    <p className="text-lg font-bold text-slate-900">{analysisResult.confidence}%</p>
                                                </div>
                                                <div className="col-span-2 bg-amber-50 p-3 rounded-lg border border-amber-100">
                                                    <p className="text-xs text-amber-600 uppercase tracking-wider font-semibold mb-1">Issue Detected</p>
                                                    <p className="font-medium text-amber-900">{analysisResult.disease}</p>
                                                    <p className="text-sm text-amber-700 mt-1">Recommended Action: Apply Propiconazole fungicide immediately.</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Market Context (Dynamic) */}
                                    {marketStats && recommendation && (
                                        <>
                                            <h3 className="text-lg font-bold text-slate-900 mt-6">Market Opportunities</h3>
                                            <div className="grid gap-4">
                                                <MarketInsightsCard
                                                    commodity={analysisResult.crop}
                                                    stats={marketStats}
                                                />
                                                <HarvestScheduler
                                                    forecast={forecast}
                                                    recommendation={recommendation}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                                    <Sprout className="h-12 w-12 text-slate-300 mb-4" />
                                    <h3 className="text-lg font-semibold text-slate-900">No Analysis Yet</h3>
                                    <p className="text-slate-500 max-w-xs mt-2">
                                        Upload an image to see crop health analysis combined with real-time market data.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudRain, Sun, AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WeatherForecast } from "@/lib/api/weather"
import { HarvestRecommendation } from "@/lib/utils/profit-calculator"
import { cn } from "@/lib/utils"

interface HarvestSchedulerProps {
    forecast: WeatherForecast[]
    recommendation: HarvestRecommendation
    className?: string
}

export function HarvestScheduler({ forecast, recommendation, className }: HarvestSchedulerProps) {
    const nextRainDay = forecast.find(day => day.condition === "Rain" || day.rainProbability > 40)

    return (
        <Card className={cn("overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-slate-50", className)}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                            <Sun className="h-5 w-5 text-indigo-600" />
                        </span>
                        Smart Harvest Window
                    </CardTitle>
                    {recommendation.urgent && (
                        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 animate-pulse">
                            Action Required
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {/* Recommendation Box */}
                <div className={cn(
                    "rounded-lg p-4 mb-6 border",
                    recommendation.action === "SELL" ? "bg-emerald-50 border-emerald-100" :
                        recommendation.action === "HOLD" ? "bg-amber-50 border-amber-100" :
                            "bg-slate-100 border-slate-200"
                )}>
                    <div className="flex items-start justify-between mb-2">
                        <h4 className={cn(
                            "text-lg font-bold tracking-tight",
                            recommendation.action === "SELL" ? "text-emerald-800" :
                                recommendation.action === "HOLD" ? "text-amber-800" :
                                    "text-slate-800"
                        )}>
                            Recommendation: {recommendation.action}
                        </h4>
                        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                            {recommendation.confidence}% Confidence
                        </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        {recommendation.reason}
                    </p>
                </div>

                {/* Forecast Mini-Timeline */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        <span>5-Day Forecast</span>
                        {nextRainDay && (
                            <span className="text-indigo-600 flex items-center gap-1">
                                <CloudRain className="h-3 w-3" />
                                Rain expected {nextRainDay.date.split(',')[0]}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                        {forecast.map((day, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-2 rounded-lg bg-white border border-slate-100 shadow-sm">
                                <span className="text-[10px] text-slate-500 font-medium mb-1">
                                    {day.date.split(' ')[0]}
                                </span>
                                {day.condition === "Rain" ? (
                                    <CloudRain className="h-5 w-5 text-blue-500 mb-1" />
                                ) : day.condition === "Clouds" ? (
                                    <div className="relative">
                                        <Sun className="h-5 w-5 text-amber-400 mb-1" />
                                        <div className="absolute -bottom-1 -right-1 bg-slate-200 rounded-full w-2 h-2" />
                                    </div>
                                ) : (
                                    <Sun className="h-5 w-5 text-amber-500 mb-1" />
                                )}
                                <span className="text-xs font-bold text-slate-700">
                                    {day.temp.day}°
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

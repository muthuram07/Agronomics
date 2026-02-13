"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PriceSparkline } from "@/components/charts/price-sparkline"
import { AgmarknetAPI, CommodityStats } from "@/lib/api/agmarknet"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function InsightsPage() {
    const [commodities, setCommodities] = useState<{ name: string, stats: CommodityStats }[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchInsights() {
            const list = ["Wheat", "Soybean", "Cotton", "Onion"]
            const promises = list.map(async (name) => {
                const stats = await AgmarknetAPI.fetchCommodityStats(name, "Maharashtra")
                return { name, stats }
            })
            const results = await Promise.all(promises)
            setCommodities(results)
            setLoading(false)
        }
        fetchInsights()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 lg:px-6 py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Profit Insights</h1>
                <p className="text-secondary">Comparative analysis and historical trends for key crops.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {commodities.map(({ name, stats }, idx) => {
                    const isprofitable = stats.priceChange > 0
                    const historyPrices = stats.history.map(h => h.price)
                    const high = Math.max(...historyPrices)
                    const low = Math.min(...historyPrices)

                    return (
                        <Card key={idx} className="border-border/50 shadow-sm overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl font-bold text-slate-900">{name}</CardTitle>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide ${isprofitable ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                        {isprofitable ? "PROFITABLE" : "LOSS"}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-2 gap-8 mb-6">
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Current Price</p>
                                        <p className="text-3xl font-bold tabular-nums text-slate-900">₹{stats.currentPrice}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Net Change</p>
                                        <div className={`flex items-center gap-1 font-bold text-lg ${isprofitable ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {isprofitable ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                                            {Math.abs(stats.priceChange).toFixed(2)}%
                                        </div>
                                    </div>
                                </div>

                                <div className="h-[200px] w-full mb-6">
                                    <PriceSparkline
                                        data={stats.history}
                                        trend={stats.trend}
                                        height={200}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">30-Day High</span>
                                        <span className="font-medium text-slate-900">₹{high}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">30-Day Low</span>
                                        <span className="font-medium text-slate-900">₹{low}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

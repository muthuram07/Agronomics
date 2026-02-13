"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PriceSparkline } from "@/components/charts/price-sparkline"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { CommodityStats } from "@/lib/api/agmarknet"
import { cn } from "@/lib/utils"

interface MarketInsightsCardProps {
    commodity: string
    stats: CommodityStats
    className?: string
}

export function MarketInsightsCard({ commodity, stats, className }: MarketInsightsCardProps) {
    const { currentPrice, averagePrice, priceChange, trend, history } = stats

    const isUp = trend === "up"
    const isDown = trend === "down"

    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(currentPrice)

    return (
        <Card className={cn("overflow-hidden border-border/50", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {commodity} Market Price
                </CardTitle>
                {isUp ? (
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                ) : isDown ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                ) : (
                    <Minus className="h-4 w-4 text-slate-500" />
                )}
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline space-x-2">
                    <div className="text-3xl font-bold tabular-nums text-slate-950">
                        {formattedPrice}
                        <span className="text-sm font-normal text-muted-foreground ml-1">/q</span>
                    </div>
                    <div className={cn(
                        "text-xs font-medium px-1.5 py-0.5 rounded-full flex items-center",
                        isUp ? "bg-emerald-50 text-emerald-700" :
                            isDown ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-700"
                    )}>
                        {priceChange > 0 ? "+" : ""}{priceChange.toFixed(1)}%
                    </div>
                </div>

                <div className="mt-4 h-[40px] w-full">
                    <PriceSparkline
                        data={history.slice(-7)}
                        trend={trend}
                        height={40}
                    />
                </div>

                <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-slate-50">
                    30-Day Avg: ₹{averagePrice.toLocaleString('en-IN')}
                </p>
            </CardContent>
        </Card>
    )
}

"use client"

import React from "react"
import { format } from "date-fns"
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from "lucide-react"
import { MarketData } from "@/lib/api/agmarknet"
import { cn } from "@/lib/utils"

interface PriceTableProps {
    data: MarketData[]
    className?: string
}

export function PriceTable({ data, className }: PriceTableProps) {
    if (data.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground bg-slate-50 rounded-lg">
                No market data found. Try adjusting filters.
            </div>
        )
    }

    return (
        <div className={cn("w-full overflow-hidden rounded-xl border border-slate-100 shadow-sm bg-white", className)}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-3">Commodity</th>
                            <th className="px-6 py-3">Market</th>
                            <th className="px-6 py-3 text-right">Model Price</th>
                            <th className="px-6 py-3 text-right">Min/Max</th>
                            <th className="px-6 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((item, index) => {
                            // Simulated trend for visual demo since raw data might not have it attached
                            const isUp = index % 3 === 0
                            const isDown = index % 3 === 1

                            return (
                                <tr key={`${item.market}-${item.commodity}-${index}`} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {item.commodity}
                                        <span className="block text-xs text-slate-500 font-normal">{item.variety}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {item.market}, {item.district}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="font-bold text-slate-900">
                                                ₹{item.modal_price.toLocaleString('en-IN')}
                                            </span>
                                            {isUp ? (
                                                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                                            ) : isDown ? (
                                                <ArrowDownRight className="h-4 w-4 text-red-500" />
                                            ) : (
                                                <Minus className="h-4 w-4 text-slate-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-500 tabular-nums text-xs">
                                        ₹{item.min_price} - ₹{item.max_price}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {item.arrival_date}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

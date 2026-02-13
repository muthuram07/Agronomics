"use client"

import React, { useEffect, useState } from "react"
import { CommoditySearch } from "@/components/dashboard/commodity-search"
import { PriceTable } from "@/components/dashboard/price-table"
import { MarketData, AgmarknetAPI } from "@/lib/api/agmarknet"

export default function MarketPage() {
    const [data, setData] = useState<MarketData[]>([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState({ state: "Maharashtra", district: "", commodity: "Wheat" })

    useEffect(() => {
        async function fetchPrices() {
            setLoading(true)
            try {
                const prices = await AgmarknetAPI.fetchMarketData(filter.state, filter.district)
                // Client-side filtering if API returns all
                const filtered = prices.filter(p =>
                    (!filter.commodity || p.commodity === filter.commodity) &&
                    (!filter.district || p.district === filter.district)
                )
                // If empty mock data, generate some
                if (filtered.length === 0) {
                    // Re-fetch without strict filtering for demo purposes if mock data is limited
                    const allPrices = await AgmarknetAPI.fetchMarketData(filter.state, "")
                    setData(allPrices)
                } else {
                    setData(filtered)
                }
            } catch (error) {
                console.error("Error", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPrices()
    }, [filter])

    const handleSearch = (newFilter: { state: string; district: string; commodity: string }) => {
        setFilter(newFilter)
    }

    return (
        <div className="container mx-auto px-4 lg:px-6 py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Live Market Prices</h1>
                <p className="text-secondary mb-6">Real-time daily mandi rates for commodities across India.</p>

                <CommoditySearch onSearch={handleSearch} />
            </div>

            <div className="relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
                )}
                <PriceTable data={data} />
            </div>
        </div>
    )
}

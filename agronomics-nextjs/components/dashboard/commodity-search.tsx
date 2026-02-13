"use client"

import React, { useState } from "react"
import { Search, MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CommoditySearchProps {
    onSearch: (filters: { state: string; district: string; commodity: string }) => void
}

const STATES = ["Maharashtra", "Punjab", "Uttar Pradesh", "Karnataka", "Madhya Pradesh"]
const COMMODITIES = ["Wheat", "Rice", "Cotton", "Soybean", "Onion", "Tomato", "Potato"]

export function CommoditySearch({ onSearch }: CommoditySearchProps) {
    const [selectedState, setSelectedState] = useState("")
    const [selectedCommodity, setSelectedCommodity] = useState("")

    const handleSearch = () => {
        onSearch({
            state: selectedState,
            district: "", // Default/All
            commodity: selectedCommodity
        })
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
            <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <select
                    className="w-full h-10 pl-9 pr-4 text-sm bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 appearance-none cursor-pointer"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                >
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <select
                    className="w-full h-10 pl-9 pr-4 text-sm bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 appearance-none cursor-pointer"
                    value={selectedCommodity}
                    onChange={(e) => setSelectedCommodity(e.target.value)}
                >
                    <option value="">Select Commodity</option>
                    {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            <Button
                onClick={handleSearch}
                className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white font-medium px-6"
            >
                Search Market
            </Button>
        </div>
    )
}

"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Activity, Sun } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MarketInsightsCard } from "@/components/dashboard/market-insights-card"
import { HarvestScheduler } from "@/components/dashboard/harvest-scheduler"
import { AgmarknetAPI, CommodityStats } from "@/lib/api/agmarknet"
import { WeatherAPI, WeatherForecast } from "@/lib/api/weather"
import { ProfitCalculator, HarvestRecommendation } from "@/lib/utils/profit-calculator"
import { useAuth } from "@/components/auth-provider"
import { AuthForm } from "@/components/auth/auth-form"

export default function DashboardHome() {
  const { user, loading: authLoading } = useAuth()
  const [dataLoading, setDataLoading] = useState(true)
  const [marketStats, setMarketStats] = useState<CommodityStats | null>(null)
  const [forecast, setForecast] = useState<WeatherForecast[]>([])
  const [recommendation, setRecommendation] = useState<HarvestRecommendation | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!user) return // Don't fetch if not logged in

      try {
        // Fetch featured commodity (e.g., Wheat in Maharashtra)
        const stats = await AgmarknetAPI.fetchCommodityStats("Wheat", "Maharashtra")
        const weather = await WeatherAPI.fetchForecast(19.75, 75.71) // Maharashtra coords
        const rec = ProfitCalculator.generateRecommendation(stats, weather)

        setMarketStats(stats)
        setForecast(weather)
        setRecommendation(rec)
      } catch (error) {
        console.error("Failed to fetch dashboard data", error)
      } finally {
        setDataLoading(false)
      }
    }

    if (user) {
      fetchData()
    } else {
      setDataLoading(false)
    }
  }, [user])

  if (authLoading || (user && dataLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center space-x-2 text-muted-foreground">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        <span>Loading...</span>
      </div>
    )
  }

  // Not Logged In - Show Landing Page
  if (!user) {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 py-12 lg:py-24">
        <div className="flex-1 space-y-6 max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-emerald-100 text-emerald-800">
            New: Smart Harvest Scheduler
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900">
            Smarter Farming with Data Intelligence
          </h1>
          <p className="text-lg text-slate-600">
            Maximize your profits with real-time market prices, AI-driven crop analysis, and weather-synced harvest schedules.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <Activity className="h-4 w-4 text-emerald-600" />
              <span>Live Mandi Rates</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span>Profit Prediction</span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    )
  }

  // Logged In - Show Dashboard
  return (
    <div className="container mx-auto px-4 lg:px-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-secondary">Welcome back! Here's your farm's performance overview.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          <Activity className="h-4 w-4 text-emerald-600" />
          <span>Live Market Data: Updated 10m ago</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit Potential</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">vs last month average</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Bullish</div>
            <p className="text-xs text-muted-foreground">Wheat prices rising in 4 markets</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
            <Sun className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Wheat, Cotton, Onion</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Harvest</CardTitle>
            <Activity className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 Days</div>
            <p className="text-xs text-muted-foreground">Optimal window approaching</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">

        {/* Featured Insight (Left - Larger) */}
        <div className="col-span-4 space-y-8">
          {marketStats && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-semibold mb-4 text-slate-900">Featured Market Insight</h2>
              <MarketInsightsCard
                commodity="Wheat (Lokwan)"
                stats={marketStats}
                className="h-[300px]"
              />
            </motion.div>
          )}

          {/* Quick Actions / Links */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="hover:bg-slate-50 transition-colors cursor-pointer border-border/50">
              <CardContent className="flex flex-col items-center justify-center h-32 text-center p-4">
                <span className="text-lg font-semibold text-primary mb-2">Check Prices</span>
                <p className="text-xs text-muted-foreground">View real-time prices for all mandis</p>
              </CardContent>
            </Card>
            <Card className="hover:bg-slate-50 transition-colors cursor-pointer border-border/50">
              <CardContent className="flex flex-col items-center justify-center h-32 text-center p-4">
                <span className="text-lg font-semibold text-indigo-600 mb-2">Upload Crop</span>
                <p className="text-xs text-muted-foreground">Get instant disease analysis</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Harvest Scheduler (Right - Sidebar) */}
        <div className="col-span-3">
          {forecast.length > 0 && recommendation && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="text-xl font-semibold mb-4 text-slate-900">Smart Scheduler</h2>
              <HarvestScheduler
                forecast={forecast}
                recommendation={recommendation}
              />
            </motion.div>
          )}
        </div>

      </div>
    </div>
  )
}

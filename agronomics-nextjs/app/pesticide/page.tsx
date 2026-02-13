"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Sprout, AlertTriangle, Shield, Droplets } from "lucide-react"

export default function PesticidePage() {
    const pesticides = [
        {
            name: "Organic Neem Oil",
            type: "Organic",
            usage: "Spray on affected areas every 7-14 days",
            safety: "Safe for beneficial insects when used as directed",
            icon: Sprout,
        },
        {
            name: "Pyrethrin-based Insecticide",
            type: "Natural",
            usage: "Apply during early morning or late evening",
            safety: "Wear protective gear during application",
            icon: Shield,
        },
        {
            name: "Copper Fungicide",
            type: "Mineral",
            usage: "Apply before disease symptoms appear",
            safety: "Avoid application during hot weather",
            icon: Droplets,
        },
        {
            name: "Bacillus thuringiensis (Bt)",
            type: "Biological",
            usage: "Target specific pests, apply when larvae are young",
            safety: "Safe for humans and most beneficial insects",
            icon: AlertTriangle,
        },
    ]

    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-5xl font-bold text-slate-950 mb-4">
                            Pesticide Information
                        </h1>
                        <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                            Our platform offers detailed information on various pesticides, including usage
                            instructions and safety measures to protect your crops effectively.
                        </p>
                    </div>

                    {/* Pesticide Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {pesticides.map((pesticide, index) => {
                            const Icon = pesticide.icon
                            return (
                                <Card
                                    key={index}
                                    hoverable
                                    className="animate-scale-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <CardHeader>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 bg-indigo-50 rounded-lg">
                                                <Icon className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-2xl">{pesticide.name}</CardTitle>
                                                <span className="text-sm text-indigo-600 font-medium">
                                                    {pesticide.type}
                                                </span>
                                            </div>
                                        </div>
                                        <CardContent className="space-y-4 pt-0">
                                            <div>
                                                <h4 className="font-semibold text-slate-950 mb-2">Usage Instructions</h4>
                                                <p className="text-slate-700">{pesticide.usage}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-950 mb-2">Safety Measures</h4>
                                                <p className="text-slate-700">{pesticide.safety}</p>
                                            </div>
                                        </CardContent>
                                    </CardHeader>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Safety Guidelines */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle className="text-3xl">General Safety Guidelines</CardTitle>
                            <CardContent className="pt-6">
                                <ul className="space-y-3 text-slate-700">
                                    <li className="flex items-start gap-3">
                                        <Shield className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                                        <span>Always wear appropriate protective equipment (gloves, masks, goggles)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Shield className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                                        <span>Follow label instructions carefully and never exceed recommended dosages</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Shield className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                                        <span>Store pesticides in original containers in a secure, dry location</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Shield className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                                        <span>Keep pesticides away from children, pets, and food items</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Shield className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                                        <span>Dispose of empty containers properly according to local regulations</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    )
}

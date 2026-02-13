"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Store, MapPin, Phone, Mail } from "lucide-react"

export default function FertilizersPage() {
    const shops = [
        {
            name: "Green Valley Fertilizers",
            location: "123 Farm Road, Agricultural District",
            phone: "+1 (555) 123-4567",
            email: "contact@greenvalley.com",
            specialties: ["Organic Fertilizers", "NPK Blends", "Micronutrients"],
        },
        {
            name: "AgriCare Solutions",
            location: "456 Harvest Lane, Farming Hub",
            phone: "+1 (555) 234-5678",
            email: "info@agricare.com",
            specialties: ["Liquid Fertilizers", "Soil Amendments", "Custom Blends"],
        },
        {
            name: "FarmPro Supplies",
            location: "789 Crop Circle, Rural Center",
            phone: "+1 (555) 345-6789",
            email: "sales@farmpro.com",
            specialties: ["Bio-fertilizers", "Compost", "Soil Testing Kits"],
        },
        {
            name: "Harvest Essentials",
            location: "321 Grain Street, Market District",
            phone: "+1 (555) 456-7890",
            email: "support@harvestessentials.com",
            specialties: ["Organic Compost", "Vermicompost", "Green Manure"],
        },
    ]

    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-5xl font-bold text-slate-950 mb-4">
                            Fertilizer Shops
                        </h1>
                        <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                            Find trusted fertilizer suppliers near you. Agronomics provides insights into
                            optimal fertilizer choices based on crop type, soil conditions, and nutrient requirements.
                        </p>
                    </div>

                    {/* Shops Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {shops.map((shop, index) => (
                            <Card
                                key={index}
                                hoverable
                                className="animate-scale-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <CardHeader>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-3 bg-indigo-50 rounded-lg">
                                            <Store className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-2xl mb-2">{shop.name}</CardTitle>
                                            <div className="space-y-2 text-sm text-slate-600">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                                    <span>{shop.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 flex-shrink-0" />
                                                    <a href={`tel:${shop.phone}`} className="hover:text-indigo-600">
                                                        {shop.phone}
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 flex-shrink-0" />
                                                    <a href={`mailto:${shop.email}`} className="hover:text-indigo-600">
                                                        {shop.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <CardContent className="pt-4">
                                        <h4 className="font-semibold text-slate-950 mb-3">Specialties</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {shop.specialties.map((specialty, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-amber-50 text-slate-700 text-sm rounded-full"
                                                >
                                                    {specialty}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 glass rounded-2xl p-8">
                        <h2 className="text-3xl font-bold text-slate-950 mb-6">
                            Choosing the Right Fertilizer
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 text-slate-700">
                            <div>
                                <h3 className="font-semibold text-slate-950 mb-2">Soil Testing</h3>
                                <p className="text-sm">
                                    Always conduct soil tests before selecting fertilizers to understand nutrient deficiencies.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-950 mb-2">Crop Requirements</h3>
                                <p className="text-sm">
                                    Different crops have varying nutrient needs. Consult with experts for crop-specific recommendations.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-950 mb-2">Application Timing</h3>
                                <p className="text-sm">
                                    Apply fertilizers at the right growth stage for maximum effectiveness and minimal waste.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

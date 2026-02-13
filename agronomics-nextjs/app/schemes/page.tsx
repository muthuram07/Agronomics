"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, CheckCircle } from "lucide-react"

export default function SchemesPage() {
    const schemes = [
        {
            name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            description: "Crop insurance scheme providing financial support to farmers suffering crop loss/damage arising from unforeseen events.",
            eligibility: ["All farmers including sharecroppers and tenant farmers", "Farmers growing notified crops"],
            benefits: ["Low premium rates", "Coverage for all stages from sowing to post-harvest", "Use of technology for quick claim settlement"],
            link: "#",
        },
        {
            name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
            description: "Income support scheme providing financial assistance to all landholding farmers' families.",
            eligibility: ["All landholding farmers' families", "Small and marginal farmers"],
            benefits: ["₹6000 per year in three equal installments", "Direct benefit transfer to bank accounts", "No intermediaries"],
            link: "#",
        },
        {
            name: "Kisan Credit Card (KCC)",
            description: "Credit facility for farmers to meet their agricultural needs including cultivation and post-harvest expenses.",
            eligibility: ["Farmers - individual/joint borrowers", "Tenant farmers, oral lessees & sharecroppers"],
            benefits: ["Flexible credit limit", "Low interest rates", "Insurance coverage", "Simple documentation"],
            link: "#",
        },
        {
            name: "Soil Health Card Scheme",
            description: "Provides soil health cards to farmers which carry crop-wise recommendations of nutrients and fertilizers.",
            eligibility: ["All farmers across the country"],
            benefits: ["Free soil testing", "Customized fertilizer recommendations", "Improved soil health", "Increased crop productivity"],
            link: "#",
        },
        {
            name: "National Agriculture Market (e-NAM)",
            description: "Pan-India electronic trading portal for agricultural commodities to facilitate better price discovery.",
            eligibility: ["Farmers registered on e-NAM platform", "Traders and commission agents"],
            benefits: ["Better price discovery", "Transparent auction process", "Online payment facility", "Reduced transaction costs"],
            link: "#",
        },
        {
            name: "Paramparagat Krishi Vikas Yojana (PKVY)",
            description: "Promotes organic farming and supports farmers in adopting organic farming practices.",
            eligibility: ["Farmers willing to adopt organic farming", "Groups of farmers (minimum 50)"],
            benefits: ["Financial assistance for organic inputs", "Certification support", "Market linkages", "Training and capacity building"],
            link: "#",
        },
    ]

    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-5xl font-bold text-slate-950 mb-4">
                            Government Agricultural Schemes
                        </h1>
                        <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                            Agronomics connects farmers to relevant government schemes, subsidies, and support
                            programs designed to enhance agricultural productivity and farmer welfare.
                        </p>
                    </div>

                    {/* Schemes Grid */}
                    <div className="space-y-6">
                        {schemes.map((scheme, index) => (
                            <Card
                                key={index}
                                hoverable
                                className="animate-scale-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="p-3 bg-indigo-50 rounded-lg">
                                                <FileText className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-2xl mb-2">{scheme.name}</CardTitle>
                                                <CardDescription className="text-base">
                                                    {scheme.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    </div>

                                    <CardContent className="grid md:grid-cols-2 gap-6 pt-4">
                                        <div>
                                            <h4 className="font-semibold text-slate-950 mb-3 flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-indigo-600" />
                                                Eligibility Criteria
                                            </h4>
                                            <ul className="space-y-2 text-sm text-slate-700">
                                                {scheme.eligibility.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-slate-950 mb-3 flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-indigo-600" />
                                                Key Benefits
                                            </h4>
                                            <ul className="space-y-2 text-sm text-slate-700">
                                                {scheme.benefits.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center glass rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-slate-950 mb-4">
                            Need Help with Applications?
                        </h2>
                        <p className="text-slate-700 mb-6">
                            Contact your local agricultural office or visit the official government portals
                            for detailed application procedures and assistance.
                        </p>
                        <Button size="lg" variant="primary">
                            Contact Support
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

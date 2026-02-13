"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-5xl font-bold text-slate-950 mb-4">
                            About Agronomics
                        </h1>
                        <p className="text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto">
                            Empowering farmers through technology and innovation
                        </p>
                    </div>

                    {/* Mission Section */}
                    <Card className="mb-12 glass">
                        <CardHeader>
                            <CardTitle className="text-3xl mb-4">Our Mission</CardTitle>
                            <CardDescription className="text-lg leading-relaxed">
                                Agronomics is dedicated to transforming agriculture through advanced AI technology
                                and comprehensive resources. We aim to enhance agricultural productivity by providing
                                farmers with data-driven insights, expert guidance, and access to essential agricultural
                                services. Our platform bridges the gap between traditional farming practices and modern
                                technology, making precision agriculture accessible to all.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card hoverable className="text-center">
                            <CardHeader>
                                <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl font-bold text-indigo-600">AI</span>
                                </div>
                                <CardTitle className="text-xl mb-2">AI-Powered Analysis</CardTitle>
                                <CardDescription>
                                    Advanced machine learning algorithms for accurate crop disease detection and pest identification
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card hoverable className="text-center">
                            <CardHeader>
                                <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl font-bold text-indigo-600">24/7</span>
                                </div>
                                <CardTitle className="text-xl mb-2">Always Available</CardTitle>
                                <CardDescription>
                                    Access agricultural insights and resources anytime, anywhere, from any device
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card hoverable className="text-center">
                            <CardHeader>
                                <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl font-bold text-indigo-600">100%</span>
                                </div>
                                <CardTitle className="text-xl mb-2">Farmer-Focused</CardTitle>
                                <CardDescription>
                                    Designed with farmers in mind, providing practical solutions for real-world challenges
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Contact Section */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle className="text-3xl mb-6">Get in Touch</CardTitle>
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Contact Info */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-slate-950 mb-4">Contact Information</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <Mail className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-medium text-slate-950">Email</p>
                                                    <a href="mailto:support@agronomics.com" className="text-slate-700 hover:text-indigo-600">
                                                        support@agronomics.com
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Phone className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-medium text-slate-950">Phone</p>
                                                    <a href="tel:+15551234567" className="text-slate-700 hover:text-indigo-600">
                                                        +1 (555) 123-4567
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-medium text-slate-950">Address</p>
                                                    <p className="text-slate-700">
                                                        123 Agricultural Innovation Center<br />
                                                        Farm District, AG 12345
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div>
                                    <h3 className="font-semibold text-slate-950 mb-4">Send us a Message</h3>
                                    <form className="space-y-4">
                                        <div>
                                            <Input
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="email"
                                                placeholder="Your Email"
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                placeholder="Your Message"
                                                rows={4}
                                                className="flex w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-950 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 hover:border-slate-300"
                                            />
                                        </div>
                                        <Button type="submit" size="lg" className="w-full">
                                            <Send className="mr-2 h-5 w-5" />
                                            Send Message
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Team Section */}
                    <div className="mt-12 text-center">
                        <h2 className="text-3xl font-bold text-slate-950 mb-6">Our Team</h2>
                        <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                            Agronomics is built by a dedicated team of agricultural experts, data scientists,
                            and software engineers passionate about revolutionizing farming through technology.
                            Together, we work towards making agriculture more sustainable, efficient, and profitable
                            for farmers worldwide.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

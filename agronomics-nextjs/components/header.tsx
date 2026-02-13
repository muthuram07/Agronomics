"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sprout, Menu, X, LayoutDashboard, TrendingUp, LineChart, BookOpen } from "lucide-react"
import { throttle, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

export function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { user } = useAuth()

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            localStorage.removeItem("agronomics_guest_mode")
            window.location.reload()
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    useEffect(() => {
        const handleScroll = throttle(() => {
            setScrolled(window.scrollY > 20)
        }, 100)

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { href: "/", label: "Dashboard", icon: LayoutDashboard },
        { href: "/market", label: "Market Prices", icon: TrendingUp },
        { href: "/insights", label: "Insights", icon: LineChart },
        { href: "/upload", label: "Crop Analysis", icon: Sprout },
        { href: "/schemes", label: "Schemes", icon: BookOpen },
        { href: "/about", label: "About", icon: null },
    ]

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-white/80 backdrop-blur-xl border-slate-200 shadow-sm"
                    : "bg-white/50 backdrop-blur-sm border-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-300">
                        <Sprout className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-500">
                        Agronomics
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href
                        const Icon = link.icon
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors duration-200 flex items-center gap-1.5",
                                    isActive
                                        ? "text-emerald-600"
                                        : "text-slate-600 hover:text-emerald-600"
                                )}
                            >
                                {Icon && <Icon className="h-4 w-4" />}
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-700 hidden lg:block">
                                {user.isAnonymous ? "Guest Farmer" : user.displayName || user.email}
                            </span>
                            <Button
                                variant="outline"
                                onClick={handleSignOut}
                                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            >
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <Link href="/auth">
                            <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">
                                Get Started
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white border-t border-slate-100 shadow-xl"
                >
                    <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-base font-medium py-2 border-b border-slate-50",
                                    pathname === link.href ? "text-emerald-600" : "text-slate-600"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 flex flex-col gap-3">

                            {user ? (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        handleSignOut()
                                        setMobileMenuOpen(false)
                                    }}
                                    className="w-full border-red-200 text-red-700 hover:bg-red-50"
                                >
                                    Sign Out
                                </Button>
                            ) : (
                                <Link href="/auth" className="w-full">
                                    <Button className="w-full bg-emerald-600">Get Started</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.header>
    )
}

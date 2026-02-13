"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react"

export function AuthForm() {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // Form State
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleGoogleLogin = async () => {
        setError("")
        setLoading(true)
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            router.push("/")
        } catch (err: any) {
            console.error(err)
            if (err.code === 'auth/operation-not-allowed') {
                setError("Google Sign-In is disabled. Enable it in the Firebase Console.")
            } else {
                setError(err.message || "Failed to sign in with Google.")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            if (isLogin) {
                // Login Logic
                await signInWithEmailAndPassword(auth, email, password)
                // Router push might not be needed if wrapped in AuthProvider that redirects, 
                // but explicit push is safe.
                router.push("/")
            } else {
                // Signup Logic
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match")
                }
                await createUserWithEmailAndPassword(auth, email, password)
                router.push("/")
            }
        } catch (err: any) {
            console.error(err)
            if (err.code === 'auth/operation-not-allowed') {
                setError("Email/Password auth is disabled. Enable it in the Firebase Console.")
            } else {
                setError(err.message || "An error occurred during authentication.")
            }
        } finally {
            setLoading(false)
        }
    }

    const toggleMode = () => {
        setIsLogin(!isLogin)
        setError("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    return (
        <Card className="w-full max-w-md shadow-xl border-border/50 backdrop-blur-sm bg-white/90">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight text-center text-primary">
                    {isLogin ? "Welcome Back" : "Create Account"}
                </CardTitle>
                <CardDescription className="text-center">
                    {isLogin
                        ? "Enter your credentials to access the dashboard"
                        : "Sign up to start tracking your farm's success"
                    }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-background"
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-background"
                        />
                    </div>

                    {!isLogin && (
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="bg-background"
                            />
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                            <AlertCircle className="h-4 w-4" />
                            <span>{error}</span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full font-semibold"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            <>
                                {isLogin ? "Sign In" : "Sign Up"}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        variant="outline"
                        type="button"
                        disabled={loading}
                        onClick={handleGoogleLogin}
                        className="w-full"
                    >
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                        )}
                        Google
                    </Button>

                    <Button
                        variant="ghost"
                        type="button"
                        disabled={loading}
                        onClick={() => {
                            localStorage.setItem("agronomics_guest_mode", "true")
                            window.location.reload()
                        }}
                        className="w-full text-muted-foreground hover:text-primary"
                    >
                        Continue as Guest (Demo)
                    </Button>
                </div>

                <div className="text-center text-sm">
                    <span className="text-muted-foreground">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                        type="button"
                        onClick={toggleMode}
                        className="font-semibold text-primary hover:underline hover:text-primary-hover transition-colors"
                    >
                        {isLogin ? "Sign Up" : "Log In"}
                    </button>
                </div>

            </CardContent>
        </Card>
    )
}

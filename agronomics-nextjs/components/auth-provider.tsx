"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthContextType {
    user: User | null
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for guest/demo user
        const isGuest = localStorage.getItem("agronomics_guest_mode") === "true"
        if (isGuest) {
            setUser({
                uid: "guest-user-123",
                email: "guest@agronomics.com",
                displayName: "Guest Farmer",
                emailVerified: true,
                isAnonymous: true,
                metadata: {},
                providerData: [],
                refreshToken: "",
                tenantId: null,
                delete: async () => { },
                getIdToken: async () => "guest-token",
                getIdTokenResult: async () => ({
                    token: "guest-token",
                    signInProvider: "guest",
                    claims: {},
                    authTime: Date.now().toString(),
                    issuedAtTime: Date.now().toString(),
                    expirationTime: (Date.now() + 3600000).toString(),
                }),
                reload: async () => { },
                toJSON: () => ({}),
                phoneNumber: null,
                photoURL: null,
                providerId: "guest",
            } as unknown as User)
            setLoading(false)
            return
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

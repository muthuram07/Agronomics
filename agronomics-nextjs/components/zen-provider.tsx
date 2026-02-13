"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface ZenContextType {
    isZenMode: boolean
    toggleZenMode: () => void
}

const ZenContext = createContext<ZenContextType | undefined>(undefined)

export function ZenProvider({ children }: { children: React.ReactNode }) {
    const [isZenMode, setIsZenMode] = useState(false)

    const toggleZenMode = () => {
        setIsZenMode((prev) => !prev)
    }

    useEffect(() => {
        if (isZenMode) {
            document.body.classList.add("zen-mode")
        } else {
            document.body.classList.remove("zen-mode")
        }
    }, [isZenMode])

    return (
        <ZenContext.Provider value={{ isZenMode, toggleZenMode }}>
            {children}
        </ZenContext.Provider>
    )
}

export function useZen() {
    const context = useContext(ZenContext)
    if (context === undefined) {
        throw new Error("useZen must be used within a ZenProvider")
    }
    return context
}

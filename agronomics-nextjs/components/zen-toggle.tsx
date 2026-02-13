"use client"

import React from "react"
import { BookOpen, BookOpenCheck } from "lucide-react"
import { useZen } from "./zen-provider"
import { Button } from "./ui/button"

export function ZenToggle() {
    const { isZenMode, toggleZenMode } = useZen()

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleZenMode}
            className="gap-2"
            aria-label={isZenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
        >
            {isZenMode ? (
                <>
                    <BookOpenCheck className="h-4 w-4" />
                    <span className="hidden sm:inline">Exit Zen</span>
                </>
            ) : (
                <>
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Zen Mode</span>
                </>
            )}
        </Button>
    )
}

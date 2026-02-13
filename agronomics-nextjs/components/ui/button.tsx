"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
    {
        variants: {
            variant: {
                primary:
                    "bg-indigo-600 text-white shadow-soft-sm hover:bg-indigo-700 hover:shadow-soft-md hover:-translate-y-0.5 active:translate-y-0",
                outline:
                    "border-2 border-indigo-600 text-indigo-600 bg-transparent hover:bg-amber-50 hover:border-indigo-700 hover:text-indigo-700 shadow-soft-sm hover:shadow-soft-md hover:-translate-y-0.5 active:translate-y-0",
                ghost:
                    "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                link:
                    "text-indigo-600 underline-offset-4 hover:underline hover:text-indigo-700",
            },
            size: {
                sm: "h-9 px-3 text-xs",
                md: "h-11 px-6 text-sm",
                lg: "h-14 px-8 text-base",
                xl: "h-16 px-10 text-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {/* Filling animation background */}
                {variant === "primary" && (
                    <span className="absolute inset-0 bg-indigo-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10" />
                )}
                {props.children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

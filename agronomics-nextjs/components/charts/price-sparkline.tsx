"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts"

interface PriceSparklineProps {
    data: { date: string; price: number }[]
    trend: "up" | "down" | "stable"
    height?: number
    width?: number | string
}

export function PriceSparkline({ data, trend, height = 40, width = "100%" }: PriceSparklineProps) {
    const color = trend === "up" ? "#059669" : trend === "down" ? "#DC2626" : "#475569"

    return (
        <div style={{ height, width }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

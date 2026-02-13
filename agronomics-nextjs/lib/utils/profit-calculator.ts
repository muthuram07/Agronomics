import { CommodityStats } from "../api/agmarknet";
import { WeatherForecast, WeatherAlert } from "../api/weather";

export interface HarvestRecommendation {
    action: "SELL" | "HOLD" | "WAIT";
    confidence: number; // 0-100
    reason: string;
    profitPotential: "High" | "Medium" | "Low";
    urgent: boolean;
}

export const ProfitCalculator = {
    generateRecommendation: (
        marketStats: CommodityStats,
        weatherForecast: WeatherForecast[]
    ): HarvestRecommendation => {
        const { currentPrice, averagePrice, trend } = marketStats;
        const priceDiffPercent = ((currentPrice - averagePrice) / averagePrice) * 100;

        // Check for immediate weather threats (rain in next 2 days)
        const rainImminent = weatherForecast.slice(0, 2).some(day => day.rainProbability > 60);

        // Logic Tree

        // Scenario 1: Rain is coming -> Urgency to harvest/sell if crop is ready
        if (rainImminent) {
            if (currentPrice > averagePrice) {
                return {
                    action: "SELL",
                    confidence: 95,
                    reason: "Heavy rain forecast in 48h. Prices are good. Sell now to avoid crop damage.",
                    profitPotential: "High",
                    urgent: true
                };
            } else {
                return {
                    action: "HOLD", // Or specific action like "Protect"
                    confidence: 80,
                    reason: "Rain forecast, but prices are low. Store safely if possible, or sell to salvage.",
                    profitPotential: "Low",
                    urgent: true
                };
            }
        }

        // Scenario 2: Good prices and Uptrend
        if (priceDiffPercent > 10 && trend === "up") {
            return {
                action: "HOLD",
                confidence: 85,
                reason: "Prices are rising and well above average. Hold for peak.",
                profitPotential: "High",
                urgent: false
            };
        }

        // Scenario 3: Good prices but Downtrend starting
        if (priceDiffPercent > 5 && trend === "down") {
            return {
                action: "SELL",
                confidence: 90,
                reason: "Prices are above average but starting to fall. Secure profits now.",
                profitPotential: "Medium",
                urgent: false
            };
        }

        // Scenario 4: Low prices
        if (priceDiffPercent < -5) {
            return {
                action: "WAIT",
                confidence: 75,
                reason: "Current prices are below average. Wait for market recovery.",
                profitPotential: "Low",
                urgent: false
            };
        }

        // Default
        return {
            action: "HOLD",
            confidence: 60,
            reason: "Market is stable. Monitor for changes.",
            profitPotential: "Medium",
            urgent: false
        };
    }
};

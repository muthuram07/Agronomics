import { addDays, format } from "date-fns";

// Types
export interface WeatherForecast {
    date: string;
    temp: {
        min: number;
        max: number;
        day: number;
    };
    condition: "Clear" | "Clouds" | "Rain" | "Thunderstorm" | "Drizzle";
    description: string;
    rainProbability: number; // 0-100
    humidity: number;
    windSpeed: number; // km/h
}

export interface WeatherAlert {
    type: "warning" | "advisory" | "watch";
    title: string;
    message: string;
    severity: "low" | "medium" | "high";
}

// Mock API Client
export const WeatherAPI = {
    fetchForecast: async (lat: number, lon: number): Promise<WeatherForecast[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Generate 5 days of forecast
        return Array.from({ length: 5 }).map((_, i) => {
            const date = addDays(new Date(), i);
            const isRainySeason = Math.random() > 0.6; // Random chance of rain pattern

            let condition: WeatherForecast["condition"] = "Clear";
            let rainProb = 0;

            if (i === 2 && Math.random() > 0.3) {
                condition = "Rain";
                rainProb = 80;
            } else if (isRainySeason && Math.random() > 0.5) {
                condition = "Clouds";
                rainProb = 30;
            }

            return {
                date: format(date, "EEE, MMM d"),
                temp: {
                    min: 22 + Math.floor(Math.random() * 3),
                    max: 32 + Math.floor(Math.random() * 4),
                    day: 28 + Math.floor(Math.random() * 3),
                },
                condition,
                description: getDescription(condition),
                rainProbability: rainProb,
                humidity: 60 + Math.floor(Math.random() * 20),
                windSpeed: 10 + Math.floor(Math.random() * 15)
            };
        });
    },

    fetchAlerts: async (state: string): Promise<WeatherAlert[]> => {
        // Return mock alerts based on random chance
        if (Math.random() > 0.7) {
            return [{
                type: "warning",
                title: "Heavy Rainfall Alert",
                message: "Heavy rainfall expected in the next 48 hours. Secure harvested crops.",
                severity: "high"
            }];
        }
        return [];
    }
};

function getDescription(condition: string): string {
    switch (condition) {
        case "Clear": return "Sunny and clear skies";
        case "Clouds": return "Partly cloudy";
        case "Rain": return "Moderate rain expected";
        case "Thunderstorm": return "Thunderstorms likely";
        case "Drizzle": return "Light drizzle";
        default: return "Clear skies";
    }
}

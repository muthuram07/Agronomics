import { addDays, subDays, format } from "date-fns";

// Types
export interface MarketData {
    state: string;
    district: string;
    market: string;
    commodity: string;
    variety: string;
    grade: string;
    arrival_date: string;
    min_price: number;
    max_price: number;
    modal_price: number;
}

export interface MarketTrend {
    date: string;
    price: number;
}

export interface CommodityStats {
    currentPrice: number;
    averagePrice: number;
    priceChange: number; // Percentage
    trend: "up" | "down" | "stable";
    history: MarketTrend[];
}

// Mock Data Storage
const MOCK_COMMODITIES = [
    "Wheat", "Rice", "Cotton", "Soybean", "Onion", "Potato", "Tomato", "Maize"
];

const MOCK_MARKETS: Record<string, string[]> = {
    "Maharashtra": ["Nagpur", "Pune", "Nashik", "Mumbai"],
    "Punjab": ["Ludhiana", "Amritsar", "Patiala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli"]
};

// Helper to generate random price with some realism
const generatePrice = (basePrice: number, variance: number) => {
    return Math.floor(basePrice + (Math.random() * variance * 2 - variance));
};

// API Client
export const AgmarknetAPI = {
    // Get current prices for a specific location
    fetchMarketData: async (state: string, district: string): Promise<MarketData[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const commodities = MOCK_COMMODITIES;
        const market = MOCK_MARKETS[state]?.[0] || "General Mandi";

        return commodities.map(commodity => {
            const basePrice = getBasePrice(commodity);
            const modalPrice = generatePrice(basePrice, basePrice * 0.05);

            return {
                state,
                district,
                market,
                commodity,
                variety: "FAQ",
                grade: "FAQ",
                arrival_date: format(new Date(), "dd/MM/yyyy"),
                min_price: modalPrice - generatePrice(50, 20),
                max_price: modalPrice + generatePrice(50, 20),
                modal_price: modalPrice
            };
        });
    },

    // Get historical data and stats for a specific commodity
    fetchCommodityStats: async (commodity: string, state: string): Promise<CommodityStats> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));

        const basePrice = getBasePrice(commodity);
        const currentPrice = generatePrice(basePrice, basePrice * 0.03); // Tighter variance for current

        // Generate 30 days of history
        const history: MarketTrend[] = Array.from({ length: 30 }).map((_, i) => {
            const date = subDays(new Date(), 29 - i);
            // Create a slight trend
            const trendFactor = Math.sin(i / 5) * (basePrice * 0.05);
            const randomFactor = (Math.random() * basePrice * 0.02);
            return {
                date: format(date, "yyyy-MM-dd"),
                price: Math.floor(basePrice + trendFactor + randomFactor)
            };
        });

        const averagePrice = Math.floor(history.reduce((acc, curr) => acc + curr.price, 0) / history.length);
        const priceChange = ((currentPrice - averagePrice) / averagePrice) * 100;

        // Last 7 days for trend
        const recentHistory = history.slice(-7);
        const firstRecent = recentHistory[0].price;
        const lastRecent = recentHistory[recentHistory.length - 1].price;

        let trend: "up" | "down" | "stable" = "stable";
        if (lastRecent > firstRecent * 1.01) trend = "up";
        else if (lastRecent < firstRecent * 0.99) trend = "down";

        return {
            currentPrice,
            averagePrice,
            priceChange,
            trend,
            history
        };
    }
};

// Helper: Base prices for commodities (approximate INR/Quintal)
function getBasePrice(commodity: string): number {
    switch (commodity) {
        case "Wheat": return 2200;
        case "Rice": return 3500;
        case "Cotton": return 6800;
        case "Soybean": return 4800;
        case "Onion": return 1800;
        case "Potato": return 1200;
        case "Tomato": return 2500;
        case "Maize": return 1900;
        default: return 2000;
    }
}

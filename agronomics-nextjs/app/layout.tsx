import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ZenProvider } from "@/components/zen-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Agronomics - Agri-Intelligence Dashboard",
  description: "Real-time market insights and profit prediction for Indian farmers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <ZenProvider>
          <AuthProvider>
            <Header />
            <main className="pt-20 pb-12">
              {children}
            </main>
          </AuthProvider>
        </ZenProvider>
      </body>
    </html>
  );
}

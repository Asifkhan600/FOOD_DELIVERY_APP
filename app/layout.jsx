import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: { default: "Smart Food Delivery", template: "%s | Smart Food Delivery" },
  description: "Order from your favorite local restaurants and get food delivered to your doorstep in under 30 minutes.",
  keywords: ["food delivery", "restaurant", "order food online"],
  openGraph: { title: "Smart Food Delivery", type: "website", locale: "en_US" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

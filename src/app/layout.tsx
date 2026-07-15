import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import { LeadProvider } from "@/lead";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CTS | Creative Tax Solutions",
  description: "Simplifying complex tax strategies with creative solutions. Next-generation tax planning, compliance, and advisory for high-growth enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <LeadProvider>
          {children}
        </LeadProvider>
      </body>
    </html>
  );
}


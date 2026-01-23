import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "55 South Contractors | Roofing, Flooring & Home Improvement in St. Louis",
  description: "Interior & Exterior Specialists in St. Louis, MO. Professional roofing, flooring, gutters, decks, fences, and painting services. Call 314-717-9971 for a free estimate.",
  keywords: "roofing, flooring, gutters, decks, fences, painting, St. Louis, contractors, home improvement",
  openGraph: {
    title: "55 South Contractors | St. Louis Home Improvement Specialists",
    description: "Professional roofing, flooring, gutters, decks, fences, and painting services in St. Louis. Call 314-717-9971.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

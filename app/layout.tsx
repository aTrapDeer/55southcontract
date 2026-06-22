import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { business, siteUrl } from "./site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "St. Louis Flooring & Roofing | 55 South Contractors",
    template: "%s | 55 South Contractors",
  },
  description:
    "St. Louis flooring, roofing, and home improvement contractors for hardwood, laminate, tile, luxury vinyl, gutters, decks, fences, and painting. Free estimates.",
  keywords: [
    "St. Louis flooring",
    "flooring contractor St. Louis",
    "St. Louis contractors",
    "St. Louis roofing",
    "home improvement St. Louis",
    "hardwood flooring St. Louis",
    "luxury vinyl flooring St. Louis",
    "roofing contractor St. Louis",
    "gutters St. Louis",
    "decks St. Louis",
  ],
  applicationName: business.name,
  category: "Home Improvement",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "St. Louis Flooring & Roofing | 55 South Contractors",
    description:
      "Local flooring, roofing, and home improvement specialists serving St. Louis and surrounding communities. Request a free estimate.",
    type: "website",
    url: "/",
    siteName: business.name,
    locale: "en_US",
    images: [
      {
        url: "/img/55-sign-andBackdrop.avif",
        width: 626,
        height: 417,
        alt: "55 South Contractors serving the St. Louis area",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Louis Flooring & Roofing | 55 South Contractors",
    description:
      "Flooring, roofing, and home improvement services in St. Louis. Request a free estimate.",
    images: ["/img/55-sign-andBackdrop.avif"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${siteUrl}/#business`,
  name: business.name,
  legalName: business.legalName,
  url: siteUrl,
  logo: `${siteUrl}/img/55signlogo.png`,
  image: `${siteUrl}/img/55-sign-andBackdrop.avif`,
  description: business.description,
  telephone: business.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "St. Louis",
    addressRegion: "MO",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "St. Louis" },
    { "@type": "AdministrativeArea", name: "St. Louis County" },
    { "@type": "City", name: "Oakville" },
    { "@type": "City", name: "Arnold" },
  ],
  sameAs: [business.facebook, business.bbb],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "St. Louis Home Improvement Services",
    itemListElement: [
      "Flooring installation",
      "Roof installation and repair",
      "Gutter installation",
      "Deck construction",
      "Fence installation",
      "Interior and exterior painting",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XTJFNNB1SG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XTJFNNB1SG');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

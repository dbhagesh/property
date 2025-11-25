import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SEO_CONFIG } from "@/constants/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional", // Use optional for better performance (reduces layout shift)
  preload: false, // Disable preload to reduce render blocking
  fallback: ["system-ui", "arial"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "optional", // Use optional for better performance (reduces layout shift)
  preload: false, // Disable preload to reduce render blocking
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: SEO_CONFIG.defaultTitle,
  description: SEO_CONFIG.siteDescription,
  keywords: ["property dealer haryana", "IMT kharkhoda plots", "ddjay plots", "industrial land haryana", "bahadurgarh property", "sonipat property", "rohtak property"],
  authors: [{ name: SEO_CONFIG.siteName }],
  creator: SEO_CONFIG.siteName,
  publisher: SEO_CONFIG.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.siteDescription,
    url: SEO_CONFIG.siteUrl,
    siteName: SEO_CONFIG.siteName,
    images: [
      {
        url: SEO_CONFIG.defaultImage,
        width: 1200,
        height: 630,
        alt: SEO_CONFIG.siteName,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.siteDescription,
    creator: SEO_CONFIG.twitterHandle,
    images: [SEO_CONFIG.defaultImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Resource Hints for Performance - GA preconnect removed, fonts are self-hosted by Next.js */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Preload Critical Images - Only WebP for faster LCP */}
        <link rel="preload" as="image" href="/images/logo.svg" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/hero/property-1.webp" fetchPriority="high" imageSrcSet="/images/hero/property-1.webp" imageSizes="(max-width: 768px) 100vw, 50vw" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.webp" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased bg-white text-secondary-900">
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <WhatsAppButton />
      </body>
    </html>
  );
}

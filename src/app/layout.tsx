import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/layout/Analytics";
import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SocialFloat } from "@/components/layout/SocialFloat";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { siteConfig } from "@/content/site";
import { getHeaderData } from "@/lib/data/navigation";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Lots of Trip — Find your way to the Himalayas",
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.name} — Journeys in Uttarakhand & Himachal`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: getSiteUrl() }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "travel",
  keywords: [
    "Uttarakhand tour packages",
    "Himachal Pradesh tour packages",
    "Himalayan trips",
    "Manali tour package",
    "Shimla holiday packages",
    "Rishikesh yoga and rafting",
    "Jim Corbett safari booking",
    "Kasol Kheerganga trek",
    "Jibhi homestay tour",
    "Dharamshala McLeod Ganj itinerary",
    "Haridwar pilgrimage tour",
    "Nainital lake tour",
    "Dehradun travel company",
    "customized Himalayan road trips",
  ],
  alternates: {
    canonical: "/",
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
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Journeys in Uttarakhand & Himachal`,
    description: siteConfig.description,
    locale: "en_IN",
    url: getSiteUrl(),
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Journeys in Uttarakhand & Himachal`,
    description: siteConfig.description,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-dvh pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <ThemeProvider>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            <Header data={getHeaderData()} />
            <main id="main">{children}</main>
            <Footer />
            <SocialFloat />
            <ScrollToTop />
            <MobileActionBar />
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

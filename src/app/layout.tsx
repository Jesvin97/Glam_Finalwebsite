import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import CustomCursor from "@/components/CustomCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { siteGraph } from "@/lib/schema";
import { BUSINESS_NAME, SITE_URL } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const HOME_TITLE = `${BUSINESS_NAME} | Bridal Makeup in Thiruvalla`;
const HOME_DESCRIPTION =
  "Premium unisex salon in Thukalassery, Thiruvalla for haircuts, hair colour, bridal makeup, facials, massage and nails. Open daily, 10 AM to 8:30 PM.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: BUSINESS_NAME,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} signboard, Thukalassery, Thiruvalla`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={siteGraph} />
      </head>
      <body className="min-h-full flex flex-col relative">
        <CustomCursor />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

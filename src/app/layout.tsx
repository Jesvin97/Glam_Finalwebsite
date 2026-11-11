import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { siteGraph } from "@/lib/schema";
import { BUSINESS_NAME, GTM_ID, SEO_KEYWORDS, SITE_URL } from "@/lib/site";

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
  keywords: SEO_KEYWORDS,
  verification: {
    google: "8-wtlpUJAHNInHP5TKGr7SKsJ8Wg4DmSCTlf5UXyl-4",
    other: { "msvalidate.01": "F6238405EE45658E19187B9DC7AC23F3" },
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
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <head>
        <JsonLd data={siteGraph} />
        {/* Plain tag in the server HTML so Ahrefs' installation check can find it. */}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="Z0nH2O5arE58pIlqyT7B8w" async />
      </head>
      <body>
        {/* Standard GTM loader: queue the start event, then fetch the container. */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({"gtm.start":new Date().getTime(),event:"gtm.js"});`}
        </Script>
        <Script id="gtm" src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />
        {/* Microsoft Clarity: heatmaps and session recordings. */}
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","zby8p85wih");`}
        </Script>
        <SmoothScroll />
        <CustomCursor />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

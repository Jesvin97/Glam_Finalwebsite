import type { Metadata } from "next";
import { Josefin_Sans, Lora, Lato, Cormorant_Garamond, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Glam'more | Best Unisex Salon & Bridal Makeup in Thiruvalla",
  description: "Glam'more is the premier unisex salon and spa in Thiruvalla, Kerala. Offering bridal makeup, haircuts, acrylic nails, eyebrow threading, facials, massages, waxing, hair extensions, pedicures, and luxury wellness therapies.",
  keywords: [
    // Brand
    "Glammore salon", "Glam'more", "unisex salon Thiruvalla", "best salon Thiruvalla",
    "luxury salon Kerala", "beauty parlour Thiruvalla", "salon near me Thiruvalla",
    // Services — exact match
    "acrylic nails Thiruvalla", "body waxing Thiruvalla", "bridal services Thiruvalla",
    "bridal makeup Kerala", "eyebrow shaping Thiruvalla", "eyebrow threading Thiruvalla",
    "eyelash extensions Thiruvalla", "haircut Thiruvalla", "hair extensions Kerala",
    "hairstyling Thiruvalla", "makeup services Thiruvalla", "massage Thiruvalla",
    "pedicure Thiruvalla", "shampoo conditioning salon", "shaving salon Thiruvalla",
    "skin care Thiruvalla", "waxing salon Kerala", "wedding preparation salon",
    "facial spa Thiruvalla", "nail salon Thiruvalla",
    // GEO / local intent
    "salon Pathanamthitta", "salon Kottayam", "salon Alappuzha", "MC Road salon",
    "Club 7 Junction salon", "Thiruvalla beauty",
    // AEO / question intent
    "best bridal makeup artist Thiruvalla", "unisex salon near Thiruvalla",
    "where to get acrylic nails in Kerala",
  ],
  alternates: {
    canonical: "https://glammoresalon.in",
  },
  openGraph: {
    title: "Glam'more | Best Unisex Salon & Bridal Makeup in Thiruvalla",
    description: "Glam'more is the premier unisex salon and spa in Thiruvalla, Kerala. Offering world-class bridal makeup, haircuts, nail art, and luxury wellness therapies.",
    url: "https://glammoresalon.in",
    siteName: "Glam'more Unisex Salon",
    images: [
      {
        url: "https://glammoresalon.in/images/logo.png",
        width: 800,
        height: 800,
        alt: "Glam'more Unisex Salon Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};


import CustomCursor from "@/components/CustomCursor";
import AudioBranding from "@/components/AudioBranding";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${montserrat.variable} ${josefinSans.variable} ${lora.variable} ${lato.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "Glam'more Unisex Salon",
              "image": "https://glammoresalon.in/images/logo.png",
              "@id": "https://glammoresalon.in/#salon",
              "url": "https://glammoresalon.in",
              "telephone": "+919645915329",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "First Floor, Professional Building, SH 1, Kollam - Theni Hwy, Thukalassery",
                "addressLocality": "Thiruvalla",
                "addressRegion": "Kerala",
                "postalCode": "689115",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 9.371003,
                "longitude": 76.578111
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "09:00",
                "closes": "19:00"
              },
              "sameAs": [
                "https://www.instagram.com/glammoresalon_thiruvalla",
                "https://www.facebook.com/glammoresalonthiruvalla"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Salon & Beauty Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Acrylic Nails" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Body Waxing" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bridal Services" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Eyebrow Shaping" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Eyebrow Threading" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Eyelash Extensions" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Haircut" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hair Extensions" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hairstyling" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Make-up Services" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Massages" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pedicures" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shampoo & Conditioning" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shaving" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Skin Care" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Waxing" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wedding and Event Preparation" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Facial Spa" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Nail Salon" } }
                ]
              }
            }),
          }}
        />
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1091234567890123'); // Placeholder Meta Pixel ID, can be replaced by user
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1091234567890123&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <AudioBranding />
        {children}
      </body>
    </html>
  );
}

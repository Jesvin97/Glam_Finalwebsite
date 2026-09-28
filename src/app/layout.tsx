import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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


export const metadata: Metadata = {
  metadataBase: new URL("https://glammoresalon.in"),
  title: "Glam'more | Unisex Salon & Bridal Makeup in Thiruvalla",
  description: "Unisex salon in Thukalassery, Thiruvalla for haircuts, hair colour, keratin, bridal makeup, facials, massage, and nail art. Open daily, 8:30 AM to 8 PM.",
  keywords: [
    // Brand
    "Glammore salon", "Glam'more", "Glam'more Unisex Salon", "unisex salon Thiruvalla",
    "beauty parlour Thiruvalla", "salon near me Thiruvalla", "salon Thukalassery",
    // Hair
    "haircut Thiruvalla", "men's haircut Thiruvalla", "hair colouring Thiruvalla",
    "keratin treatment Thiruvalla", "hair smoothening Thiruvalla", "hairstyling Thiruvalla",
    "hair extensions Kerala",
    // Bridal & makeup
    "bridal makeup Thiruvalla", "bridal makeup Kerala", "HD bridal makeup Thiruvalla",
    "saree draping Thiruvalla", "party makeup Thiruvalla",
    // Skin & spa
    "facial Thiruvalla", "de-tan facial Thiruvalla", "massage Thiruvalla", "spa Thiruvalla",
    // Nails & grooming
    "nail salon Thiruvalla", "acrylic nails Thiruvalla", "nail art Thiruvalla", "pedicure Thiruvalla",
    "eyebrow threading Thiruvalla", "eyelash extensions Thiruvalla", "beard styling Thiruvalla",
    "waxing Thiruvalla",
    // Nearby areas
    "salon near Changanassery", "salon near Chengannur", "salon Pathanamthitta",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Glam'more | Unisex Salon & Bridal Makeup in Thiruvalla",
    description: "Unisex salon in Thukalassery, Thiruvalla for haircuts, hair colour, keratin, bridal makeup, facials, massage, and nail art.",
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
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
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
              "priceRange": "₹",
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
                "opens": "08:30",
                "closes": "20:00"
              },
              "sameAs": [
                "https://www.instagram.com/glammore.unisex.salon",
                "https://www.facebook.com/glammoresalon/",
                "https://www.youtube.com/@Glammoreunisexsalon"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Salon & Beauty Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Haircut" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hair Colouring" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Keratin Treatment" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hair Smoothening" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hairstyling" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hair Extensions" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bridal Makeup" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wedding and Event Preparation" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Party and Event Makeup" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Saree Draping" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Facial" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "De-tan and Clean-up" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Body Massage" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Head and Shoulder Massage" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Acrylic Nails" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Nail Art" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gel Manicure" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pedicure" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Eyebrow Threading" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Eyelash Extensions" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shaving and Beard Styling" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Body Waxing" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Facial Waxing" } }
                ]
              }
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <CustomCursor />
        {/* <AudioBranding /> */}  {/* Temporarily disabled */}
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

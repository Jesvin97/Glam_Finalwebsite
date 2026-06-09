import type { Metadata } from "next";
import { Josefin_Sans, Lora, Lato } from "next/font/google";
import "./globals.css";

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
  description: "Glam'more is the premier unisex salon and spa in Thiruvalla, Kerala. Offering world-class bridal makeup, haircuts, nail art, and luxury wellness therapies.",
  alternates: {
    canonical: "https://glammoresalon.in",
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
      lang="en"
      className={`${josefinSans.variable} ${lora.variable} ${lato.variable} h-full antialiased`}
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
              ]
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Haircuts, Bridal Makeup, Facials & Nails in Thiruvalla | Glam'more Salon",
  description: "Haircuts, colouring, keratin, bridal makeup, facials, massage, nails, and waxing for men and women at Glam'more Unisex Salon, Thukalassery, Thiruvalla.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    siteName: "Glam'more Unisex Salon",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return <ServicesClient />;
}

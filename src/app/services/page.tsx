import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { BUSINESS_NAME } from "@/lib/site";

const TITLE = `Salon Services | ${BUSINESS_NAME}, Thiruvalla`;
const DESCRIPTION =
  "Haircuts, colour, keratin, bridal and groom makeup, facials, massage, nails, brows, waxing and men's grooming at Glam'more Premium Unisex Salon, Thiruvalla.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/services",
    siteName: BUSINESS_NAME,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <ServicesClient />
    </>
  );
}

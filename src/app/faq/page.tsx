import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ, { type FAQItem } from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { fetchList } from "@/sanity/fetch";
import { breadcrumbList } from "@/lib/schema";
import { BUSINESS_NAME } from "@/lib/site";

export const revalidate = 3600;

const TITLE = `Salon FAQs & Beauty Advice | ${BUSINESS_NAME}`;
const DESCRIPTION =
  "Hair colour, keratin, bridal makeup, facials, nails, waxing and men's grooming explained, with hours and booking, at Glam'more Premium Unisex Salon, Thiruvalla.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/faq",
    siteName: BUSINESS_NAME,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
};

export default async function Page() {
  const faqs = await fetchList<FAQItem>(`*[_type == "faq"] | order(order asc)`);

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "FAQs", path: "/faq" },
        ])}
      />
      <Navbar />
      <main className="faq-page">
        <FAQ faqs={faqs} asPage />
      </main>
      <Footer />
    </>
  );
}

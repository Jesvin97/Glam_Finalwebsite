import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ, { type FAQItem } from "@/components/FAQ";
import { fetchList } from "@/sanity/fetch";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQs | Glam'more Unisex Salon, Thiruvalla",
  description: "Answers about Glam'more Unisex Salon in Thukalassery, Thiruvalla: opening hours, location, booking, bridal makeup, hair, facials, massage, and nail services.",
  alternates: { canonical: "/faq" },
  openGraph: {
    url: "/faq",
    siteName: "Glam'more Unisex Salon",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
};

export default async function Page() {
  const faqs = await fetchList<FAQItem>(`*[_type == "faq"] | order(order asc)`);

  return (
    <>
      <Navbar />
      <main className="faq-page">
        <FAQ faqs={faqs} asPage />
      </main>
      <Footer />
    </>
  );
}

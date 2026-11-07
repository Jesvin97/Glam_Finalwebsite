import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { servicePages } from "@/lib/service-pages";
import { ADDRESS, BUSINESS_NAME, HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_E164, SITE_URL } from "@/lib/site";

const TITLE = `About Us | ${BUSINESS_NAME}`;
const DESCRIPTION =
  "Glam'more Premium Unisex Salon opened in 2026 in Thukalassery, Thiruvalla. Meet the founders, Alina and Vinod, and see what we offer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
    siteName: BUSINESS_NAME,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutPage() {
  const whatsapp = `https://wa.me/${PHONE_E164.slice(1)}?text=${encodeURIComponent("Hello Glam'more, I'd like to book a visit")}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE_URL}/about`,
          name: TITLE,
          mainEntity: { "@id": `${SITE_URL}/#salon` },
        }}
      />
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "About us", path: "/about" },
        ])}
      />
      <Navbar />
      <main className="service-page">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About us" }]} />

        <header className="service-page-head" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <h1>About {BUSINESS_NAME}</h1>
            <p className="service-page-lead">
              Glam&apos;more opened in 2026 in Thukalassery, Thiruvalla. It was started by Alina and Vinod, who wanted people in
              Thiruvalla to have a premium salon experience close to home.
            </p>
          </div>
        </header>

        <section className="service-page-section">
          <h2>Our story</h2>
          <p className="service-page-lead">
            Alina and Vinod set up Glam&apos;more with one aim: to give the people of Thiruvalla a salon that feels premium, in a
            welcoming space where men and women are looked after with care. Whether you come in for a regular haircut or to get
            ready for a wedding, we want the visit to feel unhurried and well looked after.
          </p>
        </section>

        <section className="service-page-section">
          <h2>What we offer</h2>
          <p className="service-page-lead">
            Glam&apos;more is a unisex salon. Women, men, brides and grooms all come to us for the services below.
          </p>
          <ul className="service-page-links">
            {servicePages.map((p) => (
              <li key={p.slug}>
                <Link href={`/services/${p.slug}`}>{p.h1}</Link>
              </li>
            ))}
          </ul>
          <p className="service-page-more">
            See everything on our <Link href="/services">salon services page</Link>, or read the{" "}
            <Link href="/faq">salon FAQs</Link>.
          </p>
        </section>

        <section className="service-page-section service-page-visit">
          <h2>Visit us in Thukalassery, Thiruvalla</h2>
          <p>
            {ADDRESS.streetAddress}, {ADDRESS.addressLocality}, {ADDRESS.addressRegion} {ADDRESS.postalCode}
            <br />
            Open every day, {HOURS.opens} to {HOURS.closes} · <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a> ·{" "}
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              Find us on Google Maps
            </a>
          </p>
          <div className="service-page-actions" style={{ marginTop: 22 }}>
            <a className="btn-luxury" href={whatsapp} target="_blank" rel="noopener noreferrer">
              Book on WhatsApp
              <span className="btn-luxury-hover-effect"></span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { servicePages } from "@/lib/service-pages";
import { ADDRESS, BUSINESS_NAME, HOURS, LOCATION_PAGES, MAPS_URL, PHONE_DISPLAY, PHONE_E164, SITE_URL } from "@/lib/site";

// The three "salon in Thiruvalla" landing pages share this layout. Each page passes its own headline, copy and FAQs,
// so the pages are different documents and not copies of each other.

export function locationMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: BUSINESS_NAME,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
      locale: "en_IN",
      type: "website",
    },
  };
}

interface Props {
  path: string;
  title: string;
  h1: string;
  lead: string;
  whyHeading: string;
  whyIntro: string;
  whyPoints: string[];
  faqHeading: string;
  faqs: { question: string; answer: string }[];
}

export default function LocationLanding({ path, title, h1, lead, whyHeading, whyIntro, whyPoints, faqHeading, faqs }: Props) {
  const whatsapp = `https://wa.me/${PHONE_E164.slice(1)}?text=${encodeURIComponent("Hello Glam'more, I'd like to book a visit")}`;
  const groups = servicePages.filter((p) => !p.parent);
  const label = LOCATION_PAGES.find((p) => p.path === path)?.label ?? h1;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: `${SITE_URL}${path}`,
          name: title,
          about: { "@id": `${SITE_URL}/#salon` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: label, path },
        ])}
      />
      <Navbar />
      <main className="service-page">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: label }]} />

        <header className="service-page-head" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <h1>{h1}</h1>
            <p className="service-page-lead">{lead}</p>
            <div className="service-page-actions" style={{ marginTop: 22 }}>
              <a className="btn-luxury" href={whatsapp} target="_blank" rel="noopener noreferrer">
                Book on WhatsApp
                <span className="btn-luxury-hover-effect"></span>
              </a>
            </div>
          </div>
        </header>

        <section className="service-page-section">
          <h2>{whyHeading}</h2>
          <p className="service-page-lead">{whyIntro}</p>
          <ul className="service-page-links">
            {whyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="service-page-section">
          <h2>Salon services in Thiruvalla</h2>
          <ul className="service-page-links">
            {groups.map((p) => (
              <li key={p.slug}>
                <Link href={`/services/${p.slug}`}>{p.h1}</Link>
              </li>
            ))}
          </ul>
          <p className="service-page-more">
            See everything on our <Link href="/services">salon services page</Link>, or read more <Link href="/about">about us</Link>.
          </p>
        </section>

        <section className="service-page-section">
          <h2>{faqHeading}</h2>
          <div className="service-page-faqs">
            {faqs.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
          <p className="service-page-more">
            More answers on our <Link href="/faq">salon FAQ page</Link>. Also see:{" "}
            {LOCATION_PAGES.filter((p) => p.path !== path).map((p, i) => (
              <span key={p.path}>
                {i > 0 && " · "}
                <Link href={p.path}>{p.label}</Link>
              </span>
            ))}
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

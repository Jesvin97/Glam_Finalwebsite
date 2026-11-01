import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { fallbackFaqs } from "@/lib/faq-data";
import { breadcrumbList } from "@/lib/schema";
import { categoryMetaList, servicesData } from "@/lib/services-data";
import { servicePageBySlug, servicePages } from "@/lib/service-pages";
import { ADDRESS, BUSINESS_NAME, HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = servicePageBySlug((await params).slug);
  if (!page) return {};
  const path = `/services/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: path,
      siteName: BUSINESS_NAME,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const page = servicePageBySlug((await params).slug);
  if (!page) notFound();

  const category = categoryMetaList.find((c) => c.id === page.category)!;
  const services = servicesData.filter((s) => s.category === page.category);
  const faqs = fallbackFaqs.filter((f) => f.topic && page.faqTopics.includes(f.topic));
  const others = servicePages.filter((p) => p.slug !== page.slug);
  const whatsapp = `https://wa.me/${PHONE_E164.slice(1)}?text=${encodeURIComponent(`Hello Glam'more, I'd like to book: ${page.shortName}`)}`;

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: page.shortName, path: `/services/${page.slug}` },
        ])}
      />
      {faqs.length > 0 && (
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
      )}
      <Navbar />
      <main className="service-page">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: page.shortName }]} />

        <header className="service-page-head">
          <div>
            <h1>{page.h1}</h1>
            <p className="service-page-lead">{category.description}</p>
            <div className="service-page-actions">
              <a className="btn-luxury" href={whatsapp} target="_blank" rel="noopener noreferrer">
                Book on WhatsApp
                <span className="btn-luxury-hover-effect"></span>
              </a>
              <Link href="/services" className="service-page-link">
                See all salon services
              </Link>
            </div>
          </div>
          <div className="service-page-photo">
            <Image
              src={category.bannerImage}
              alt={`${page.shortName} at ${BUSINESS_NAME}, Thiruvalla`}
              fill
              preload
              sizes="(max-width: 900px) 90vw, 480px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </header>

        <section className="service-page-section">
          <h2>What&apos;s included</h2>
          <div className="service-page-grid">
            {services.map((s) => (
              <article key={s.id} className="service-page-card">
                {s.image && (
                  <div className="service-page-card-img">
                    <Image src={s.image} alt={s.title} fill sizes="(max-width: 700px) 90vw, 280px" style={{ objectFit: "cover" }} />
                  </div>
                )}
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </section>

        {faqs.length > 0 && (
          <section className="service-page-section">
            <h2>Questions about {page.shortName.toLowerCase()}</h2>
            <div className="service-page-faqs">
              {faqs.map((f) => (
                <details key={f.question}>
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
            <p className="service-page-more">
              More answers on our <Link href="/faq">salon FAQ page</Link>.
            </p>
          </section>
        )}

        <section className="service-page-section service-page-visit">
          <h2>Visit us in Thukalassery, Thiruvalla</h2>
          <p>
            {ADDRESS.streetAddress}, {ADDRESS.addressLocality}, {ADDRESS.addressRegion} {ADDRESS.postalCode}
            <br />
            Open every day, {HOURS.opens} to {HOURS.closes} · <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a> ·{" "}
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              Directions on Google Maps
            </a>
          </p>
        </section>

        <nav className="service-page-section" aria-label="More salon services">
          <h2>More services at Glam&apos;more</h2>
          <ul className="service-page-links">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/services/${p.slug}`}>{p.h1}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <Footer />
    </>
  );
}

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
  const services = servicesData.filter((s) =>
    page.serviceIds ? page.serviceIds.includes(s.id) : s.category === page.category,
  );
  const parent = page.parent ? servicePageBySlug(page.parent) : undefined;
  const children = servicePages.filter((p) => p.parent === page.slug);
  const heroImage = page.serviceIds ? (services[0]?.image ?? category.bannerImage) : category.bannerImage;
  const faqs = fallbackFaqs.filter(
    (f) =>
      f.topic &&
      page.faqTopics.includes(f.topic) &&
      (!page.faqIncludes || page.faqIncludes.some((word) => f.question.toLowerCase().includes(word))),
  );
  const others = servicePages.filter((p) => p.slug !== page.slug && !p.parent);
  const whatsapp = `https://wa.me/${PHONE_E164.slice(1)}?text=${encodeURIComponent(`Hello Glam'more, I'd like to book: ${page.shortName}`)}`;

  const parentNote = parent ? (
    <p className="service-page-more">
      Part of our <Link href={`/services/${parent.slug}`}>{parent.h1.toLowerCase()}</Link> services.
    </p>
  ) : null;

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          ...(parent ? [{ name: parent.shortName, path: `/services/${parent.slug}` }] : []),
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
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            ...(parent ? [{ name: parent.shortName, href: `/services/${parent.slug}` }] : []),
            { name: page.shortName },
          ]}
        />

        <header className="service-page-head">
          <div>
            <h1>{page.h1}</h1>
            <p className="service-page-lead">{page.lead ?? category.description}</p>
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
              src={heroImage}
              alt={`${page.shortName} at ${BUSINESS_NAME}, Thiruvalla`}
              fill
              preload
              sizes="(max-width: 900px) 90vw, 480px"
              style={{ objectFit: page.serviceIds ? "cover" : "contain" }}
            />
          </div>
        </header>

        <section className="service-page-section service-page-intro">
          {page.intro.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </section>

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

        <section className="service-page-section">
          <h2>What to expect</h2>
          <ol className="service-page-steps">
            {page.steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="service-page-section service-page-split">
          <div>
            <h2>Who it&apos;s for</h2>
            <ul className="service-page-list">
              {page.suits.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Before and after your visit</h2>
            <ul className="service-page-list">
              {page.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {page.more?.map((m) => (
          <section key={m.heading} className="service-page-section service-page-intro">
            <h2>{m.heading}</h2>
            {m.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
        ))}

        {children.length > 0 && (
          <nav className="service-page-section" aria-label={`${page.shortName} in more detail`}>
            <h2>{page.shortName} in more detail</h2>
            <ul className="service-page-links">
              {children.map((c) => (
                <li key={c.slug}>
                  <Link href={`/services/${c.slug}`}>{c.h1}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <section className="service-page-section service-page-intro">
          <h2>Booking and prices</h2>
          <p>
            We don&apos;t publish a fixed price list, because the right service and the cost depend on your hair, skin and the look you
            want. Message us on WhatsApp with what you have in mind and we&apos;ll reply with a quote before you visit. Walk-ins are
            welcome when a chair is free, but booking ahead avoids a wait, especially on weekends and before festivals.
          </p>
        </section>

        {faqs.length > 0 && (
          <section className="service-page-section">
            <h2>Questions about {page.shortName.toLowerCase()}</h2>
            {parentNote}
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

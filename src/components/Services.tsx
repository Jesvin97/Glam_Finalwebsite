"use client";
import ScrollReveal from "./ScrollReveal";

/**
 * Landing-page Services section — lightweight teaser only.
 * Full service catalogue + booking lives at /services.
 */
export default function Services() {
  const highlights = [
    { emoji: "💍", label: "Bridal & Wedding" },
    { emoji: "✂️", label: "Hair & Styling" },
    { emoji: "💅", label: "Nails & Extensions" },
    { emoji: "🧖", label: "Spa & Massage" },
    { emoji: "✨", label: "Skin & Facials" },
    { emoji: "💄", label: "Makeup & Beauty" },
  ];

  return (
    <section className="services" id="services">
      <ScrollReveal direction="up">
        <div className="section-title services-title-container">
          <h2 className="gold-section-heading">What We Offer</h2>
          <p className="services-subtitle">
            19 premium services — from bridal styling to luxury spa therapies.
            All under one roof in Thiruvalla.
          </p>
        </div>
      </ScrollReveal>

      {/* Category pill grid — decorative teaser, no fetch needed */}
      <ScrollReveal direction="up" delay={100}>
        <div className="services-highlights-grid">
          {highlights.map((h, i) => (
            <div key={i} className="services-highlight-pill">
              <span className="pill-emoji">{h.emoji}</span>
              <span className="pill-label">{h.label}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={200}>
        <div className="center-btn-container">
          <a href="/services" className="primary-btn">
            Explore All Services &amp; Book Now →
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
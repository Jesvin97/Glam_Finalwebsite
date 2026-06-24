"use client";

import ScrollReveal from "./ScrollReveal";
export default function Hero() {

  return (
    <section className="hero">
      {/* Floating Gold Sparkle Particles */}
      <div className="hero-sparkles">
        <div className="sparkle" />
        <div className="sparkle" />
        <div className="sparkle" />
        <div className="sparkle" />
        <div className="sparkle" />
        <div className="sparkle" />
        <div className="sparkle" />
        <div className="sparkle" />
      </div>

      <ScrollReveal direction="left" className="hero-content-reveal">
        <div className="hero-content">
          <h1>
            Premium Unisex Salon & Bridal Studio in Thiruvalla
          </h1>

          <p>
            Step into a world where elegance, beauty, and luxury come together. Thiruvalla&apos;s leading destination for premium grooming, professional haircuts, nail extensions, and bridal artistry.
          </p>

          <div className="hero-buttons">
            <a href="/services" className="primary-btn">
              Book Your Visit
            </a>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right" delay={200} className="hero-image-reveal">
        <div className="hero-image">
          <img
            src="/images/model.png"
            alt="Glam'more Beauty Model"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
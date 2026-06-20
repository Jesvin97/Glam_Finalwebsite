"use client";

import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

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
            {t("heroTitle")}
          </h1>

          <p>
            {t("heroSubtitle")}
          </p>

          <div className="hero-buttons">
            <a href="/services" className="primary-btn">
              {t("bookVisit")}
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
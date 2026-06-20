"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="about-section" id="about">
      <ScrollReveal direction="left" className="about-image-wrapper">
        <div className="about-image">
          <img
            src="/images/reception-area.jpeg"
            alt="Glam'more Salon Interior Reception Area"
          />
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right" className="about-content-wrapper">
        <div className="about-content">
          <p className="about-tag">
            {t("aboutTag")}
          </p>

          <h2>
            {t("aboutTitle")}
          </h2>

          <p className="about-description">
            {t("aboutDesc")}
          </p>

          <a href="/#contact" className="primary-btn">
            {t("bookVisit")}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
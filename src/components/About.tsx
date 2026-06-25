"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
export default function About() {

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
            ABOUT GLAM&apos;MORE
          </p>

          <h2>
            Luxury Salon Experience
          </h2>

          <p className="about-description">
            Step into a world where elegance, beauty and luxury come together. Our salon offers world-class beauty treatments, professional hair care, premium styling, and personalized wellness experiences designed for modern beauty standards.
          </p>

          <a href="/#contact" className="primary-btn">
            Book Your Visit
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
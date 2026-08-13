"use client";

import ScrollReveal from "./ScrollReveal";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero-editorial">
      {/* Static Background Image */}
      <div className="hero-bg-parallax">
        <Image
          src="/images/model.png"
          alt="Hero Background"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
      
      {/* Dark overlay for text readability */}
      <div className="hero-overlay" />

      <ScrollReveal direction="up" className="hero-content-wrapper">
        <div className="hero-text-content">
          <p className="hero-subtitle">Thiruvalla's Premier Destination</p>
          <h1>
            Luxury Grooming <br />
            <span className="hero-gold-text">& Bridal Artistry</span>
          </h1>
          <p className="hero-description">
            Step into a world where elegance, beauty, and luxury come together. Redefining the salon experience with bespoke treatments and masterful styling.
          </p>

          <div className="hero-cta-container flex flex-col items-center">
            {/* Scroll indicator directly above the button */}
            <div className="scroll-indicator mb-8">
              <div className="scroll-line"></div>
            </div>

            <a href="/services" className="btn-luxury">
              Book Your Visit
              <span className="btn-luxury-hover-effect"></span>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
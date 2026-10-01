"use client";

import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero-editorial">
      {/* Static Background Image */}
      <div className="hero-bg-parallax">
        <Image
          src="/images/model.png"
          alt="Bride with a low bun hairstyle and bridal makeup holding a pink bouquet"
          fill
          preload
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
      
      {/* Dark overlay for text readability */}
      <div className="hero-overlay" />

      <ScrollReveal direction="up" className="hero-content-wrapper">
        <div className="hero-text-content">
          <h1>
            Unisex Salon <br />
            <span className="hero-gold-text">& Bridal Makeup</span>
          </h1>
          <p className="hero-description">
            Haircuts, hair colour, bridal makeup, facials, massage, and nail art for men and women. Open every day, 10 AM to 8:30 PM.
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
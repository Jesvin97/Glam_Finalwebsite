"use client";

import ScrollReveal from "./ScrollReveal";
import { useEffect, useState } from "react";

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero-editorial">
      {/* Parallax Background Image */}
      <div 
        className="hero-bg-parallax" 
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      />
      
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

          <div className="hero-cta-container">
            <a href="/services" className="btn-luxury">
              Book Your Visit
              <span className="btn-luxury-hover-effect"></span>
            </a>
            
            {/* Scroll indicator directly under the button */}
            <div className="scroll-indicator">
              <div className="scroll-line"></div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
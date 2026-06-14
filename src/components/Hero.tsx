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
            Premium Unisex Salon
            <br />
            <span className="gold-text">
              in Thiruvalla
            </span>
          </h1>

          <p>
            Welcome to Glam'more, the leading unisex salon in Thiruvalla. 
            Discover luxury treatments, expert styling, flawless bridal makeup, 
            and revitalizing wellness services designed to make you feel your absolute best.
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
          {/* Ken Burns Dynamic Background Slideshow */}
          <div className="hero-slideshow">
            <div className="slide slide-1" style={{ backgroundImage: "url('/images/model.png')" }} />
            <div className="slide slide-2" style={{ backgroundImage: "url('/images/Salon seating area.jpeg')" }} />
            <div className="slide slide-3" style={{ backgroundImage: "url('/images/waiting area.jpeg')" }} />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

// Full-screen salon walkthrough video behind the headline (the previous mirror hero is still in Hero.tsx).
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // People who have turned off motion in their system see the still poster instead of a moving video.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) videoRef.current?.pause();
  }, []);

  return (
    <section className="hero-video">
      <video
        ref={videoRef}
        className="hero-video-bg"
        src="/video/hero.mp4"
        poster="/video/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero-video-overlay" aria-hidden="true" />

      <ScrollReveal direction="up" className="hero-video-content">
        <h1>
          Unisex Salon <br />
          <span className="hero-gold-text">& Bridal Makeup</span>
          <span className="hero-city"> in Thiruvalla</span>
        </h1>
        <p className="hero-description">
          Haircuts, hair colour, bridal makeup, facials, massage, and nail art. Open every day, 10 AM to 8:30 PM.
        </p>
        <Link href="/services" className="hero-video-btn">
          <span className="hero-video-btn-line" aria-hidden="true" />
          Book Your Visit
        </Link>
      </ScrollReveal>

      <div className="hero-video-scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

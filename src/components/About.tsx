"use client";

import React, { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import Link from "next/link";
export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // The 2.7 MB video only loads on wide screens with data saver and reduced motion off; phones keep the poster.
  useEffect(() => {
    const video = videoRef.current;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!video || saveData || !window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) return;
    video.src = "/video/hero.mp4";
    video.play().catch(() => {});
  }, []);

  return (
    <section className="about-section" id="about">
      <ScrollReveal direction="left" className="about-image-wrapper">
        <div className="about-image">
          <video
            ref={videoRef}
            poster="/video/hero-poster-800.jpg"
            muted
            loop
            playsInline
            preload="none"
            aria-label="A walk through Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla"
            style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16 / 9" }}
          />
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right" className="about-content-wrapper">
        <div className="about-content">
          <p className="about-tag">
            ABOUT GLAM&apos;MORE
          </p>

          <h2>
            A Unisex Salon for Everyday and Occasions
          </h2>

          <p className="about-description">
            Glam&apos;more is a premium unisex salon in Thiruvalla offering haircuts, hair colouring, keratin treatments, bridal makeup, facials, massage, and nail art for men and women. Visit us at Thukalassery for expert care in a relaxed, welcoming space.
          </p>

          <Link href="/#contact" className="btn-luxury">
            Book Your Visit
            <span className="btn-luxury-hover-effect"></span>
          </Link>
          <p style={{ marginTop: 18 }}>
            <Link href="/about" style={{ color: "#d4af37" }}>Read the Glam&apos;more story</Link>
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
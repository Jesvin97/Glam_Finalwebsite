"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import Link from "next/link";
export default function About() {

  return (
    <section className="about-section" id="about">
      <ScrollReveal direction="left" className="about-image-wrapper">
        <div className="about-image">
          <video
            src="/video/hero.mp4"
            poster="/video/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
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
        </div>
      </ScrollReveal>
    </section>
  );
}
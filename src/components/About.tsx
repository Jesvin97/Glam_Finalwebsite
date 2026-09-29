"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";
import Link from "next/link";
export default function About() {

  return (
    <section className="about-section" id="about">
      <ScrollReveal direction="left" className="about-image-wrapper">
        <div className="about-image">
          <Image
            src="/images/reception-area.jpg"
            alt="Glam'more Premium Unisex Salon signboard on the Professional Building, Thukalassery, Thiruvalla"
            width={800}
            height={600}
            style={{ width: "100%", height: "auto" }}
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
            Glam&apos;more is a unisex salon on the first floor of the Professional Building in Thukalassery, Thiruvalla. Men and women come to us for regular haircuts, beard trims, and threading, and for the bigger days: bridal makeup, saree draping, and pre-wedding facials. We also offer hair colouring, keratin smoothening, massage, and nail extensions, and we&apos;re happy to talk you through what suits your hair or skin before we start.
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
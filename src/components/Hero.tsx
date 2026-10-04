"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

// Portraits shown inside the mirror. To add more, drop a photo in /public/images/hero and add a line here.
const SLIDES = [
  {
    src: "/images/hero/hero-saree.jpg",
    alt: "Bride in a cream and gold Kerala saree with jasmine flowers and gold jewellery, smiling against a teal wall",
    caption: "Kerala bridal styling",
    position: "50% 22%",
  },
  {
    src: "/images/hero/hero-groom.jpg",
    alt: "Groom in a red kurta with a neatly trimmed beard and styled hair",
    caption: "Groom & men's grooming",
    position: "50% 20%",
  },
  {
    src: "/images/hero/hero-bridal-gold.jpg",
    alt: "Bride in a red and gold saree with layered gold necklaces and bangles, adjusting her earring",
    caption: "Bridal makeup & jewellery looks",
    position: "50% 18%",
  },
  {
    src: "/images/hero/hero-bridal.jpg",
    alt: "Smiling bride in a red silk saree with a gold forehead ornament, layered gold necklaces and jasmine flowers",
    caption: "Traditional bridal makeup",
    position: "50% 25%",
  },
  {
    src: "/images/hero/hero-pink-gown.jpg",
    alt: "Bride in a pink beaded gown with a pearl hair accessory, holding a bouquet of pink and white roses",
    caption: "Reception & party looks",
    position: "50% 20%",
  },
];

const ROTATE_MS = 5500;

// Bulbs sit on an ellipse around the mirror, like the lights around a salon mirror.
const BULBS = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2;
  // Rounded so the server and the browser print exactly the same numbers (avoids a hydration mismatch).
  const round = (n: number) => Math.round(n * 100) / 100;
  return {
    left: round(50 + 47 * Math.cos(angle)),
    top: round(50 + 47 * Math.sin(angle)),
    delay: round((i % 7) * 0.35),
  };
});

export default function Hero() {
  const [active, setActive] = useState(0);

  // Rotate on a timer that restarts whenever the slide changes (including a manual dot click).
  // People who have turned off motion in their system keep the first portrait and use the dots.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <section className="hero-mirror">
      <div className="hero-mirror-glow" aria-hidden="true" />

      <div className="hero-mirror-inner">
        <ScrollReveal direction="up" className="hero-mirror-text-wrap">
          <div className="hero-mirror-text">
            <h1>
              Unisex Salon <br />
              <span className="hero-gold-text">& Bridal Makeup</span>
              <span className="hero-city"> in Thiruvalla</span>
            </h1>
            <p className="hero-description">
              Haircuts, hair colour, bridal makeup, facials, massage, and nail art. Open every day, 10 AM to 8:30 PM.
            </p>
            <div className="hero-mirror-actions">
              <Link href="/services" className="btn-luxury">
                Book Your Visit
                <span className="btn-luxury-hover-effect"></span>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <div className="hero-mirror-stage">
          <div className="mirror-bulbs" aria-hidden="true">
            {BULBS.map((b, i) => (
              <span
                key={i}
                className="mirror-bulb"
                style={{ left: `${b.left}%`, top: `${b.top}%`, animationDelay: `${b.delay}s` }}
              />
            ))}
          </div>

          <div className="mirror-frame">
            <div className="mirror-glass">
              {SLIDES.map((s, i) => (
                <div key={s.src} className={`mirror-slide${i === active ? " active" : ""}`}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 900px) 80vw, 480px"
                    preload={i === 0}
                    style={{ objectFit: "cover", objectPosition: s.position }}
                  />
                </div>
              ))}
              <div className="mirror-sheen" aria-hidden="true" />
            </div>
          </div>
          <div className="mirror-dots" role="group" aria-label="Choose a portrait">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Show ${s.caption}`}
                aria-current={i === active}
                className={i === active ? "active" : ""}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

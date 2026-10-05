"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

// To add more customer posters, drop the image in /public/images and add a line here.
// With more than one poster the pile shuffles on its own: the top card slides to the back every few seconds.
const POSTERS = [
  {
    src: "/images/happy-customer-1.webp",
    width: 577,
    height: 733,
    alt: "Happy Customer poster: a smiling client giving two thumbs up at Glam'more Premium Unisex Salon, Thukalassery",
  },
  {
    src: "/images/happy-customer-2.webp",
    width: 1521,
    height: 845,
    alt: "Happy Customers poster: three clients smiling together after their styling at Glam'more Premium Unisex Salon",
  },
];

const SHUFFLE_MS = 4500;

export default function HappyCustomers() {
  // order[0] is the poster on top, order[1] is behind it, and so on.
  const [order, setOrder] = useState(() => POSTERS.map((_, i) => i));
  const [paused, setPaused] = useState(false);

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);

  useEffect(() => {
    if (POSTERS.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) next();
    }, SHUFFLE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="happy-section" id="happy-customers">
      <ScrollReveal direction="up">
        <div className="section-title text-center">
          <h2 className="gold-section-heading">HAPPY CUSTOMERS</h2>
          <p className="happy-sub">Smiles from the Glam&apos;more chair.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={150}>
        <div
          className="happy-pile"
          role="button"
          tabIndex={0}
          aria-label="Happy customer photos. Press to show the next one."
          onClick={next}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              next();
            }
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {POSTERS.map((p, i) => (
            <figure
              className={`happy-poster ${p.width >= p.height ? "is-wide" : "is-tall"}`}
              data-rank={Math.min(order.indexOf(i), 3)}
              key={p.src}
            >
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 640px) 90vw, 480px" />
            </figure>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

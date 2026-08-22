"use client";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const highlights = [
    { 
      label: "Bridal & Wedding", 
      image: "/images/bridal.jpg", // Ensure user uploads this
      desc: "Bespoke bridal artistry and pre-wedding therapies."
    },
    { 
      label: "Hair & Styling", 
      image: "/images/haircut.jpg", 
      desc: "Masterful cuts, advanced coloring, and extensions."
    },
    { 
      label: "Spa & Massage", 
      image: "/images/spa.jpg", 
      desc: "Rejuvenating therapies for mind, body, and soul."
    },
    { 
      label: "Nails & Beauty", 
      image: "/images/nailart.jpg", 
      desc: "Acrylics, gel art, and flawless manicures."
    }
  ];

  return (
    <section className="services-editorial" id="services">
      <ScrollReveal direction="up">
        <div className="section-title-editorial">
          <p className="subtitle-elegant">Our Expertise</p>
          <h2>Signature Services</h2>
        </div>
      </ScrollReveal>

      <div className="services-editorial-grid">
        {highlights.map((h, i) => (
          <ScrollReveal direction="up" delay={i * 100} key={i}>
            <Link href="/services" style={{ textDecoration: 'none' }}>
              <div className="service-card-editorial">
                {/* Replace with actual high-res images */}
              <div 
                className="service-card-bg"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <Image src={h.image} alt={h.label} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="service-card-overlay">
                <h3>{h.label}</h3>
                <p>{h.desc}</p>
                <span className="discover-link">Discover ⟶</span>
              </div>
            </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
 
    </section>
  );
}
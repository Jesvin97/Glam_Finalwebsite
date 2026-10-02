"use client";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const highlights = [
    { 
      label: "Bridal Makeup", 
      image: "/images/bridal.jpg",
      desc: "HD and airbrush bridal makeup, hairstyling, and saree draping."
    },
    { 
      label: "Women's Hair & Styling", 
      image: "/images/services/womens-haircut.jpg", 
      desc: "Women's haircuts, colouring, keratin smoothening, and extensions."
    },
    { 
      label: "Spa & Massage", 
      image: "/images/spa.jpg", 
      desc: "Body and head massages, plus facials and de-tan."
    },
    { 
      label: "Nail Art & Pedicure", 
      image: "/images/nailart.jpg", 
      desc: "Acrylic extensions, nail art, gel manicures, and pedicures."
    }
  ];

  return (
    <section className="services-editorial" id="services">
      <ScrollReveal direction="up">
        <div className="section-title-editorial">
          <p className="subtitle-elegant">What We Do</p>
          <h2>Our Salon Services</h2>
        </div>
      </ScrollReveal>

      <div className="services-editorial-grid">
        {highlights.map((h, i) => (
          <ScrollReveal direction="up" delay={i * 100} key={i}>
            <Link href="/services" style={{ textDecoration: 'none' }}>
              <div className="service-card-editorial">
                <div className="service-card-bg">
                  <Image 
                    src={h.image} 
                    alt={`${h.label} at Glam'more salon, Thiruvalla`} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="service-card-overlay z-10">
                <h3>{h.label}</h3>
                <p>{h.desc}</p>
                <span className="discover-link">View services ⟶</span>
              </div>
            </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
 
    </section>
  );
}
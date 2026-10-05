import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

// Full-screen salon photo behind the headline (the previous mirror hero is still in Hero.tsx).
export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <Image
        src="/images/reception-area.jpg"
        alt="Glam'more Premium Unisex Salon signboard framed with flowers, Thukalassery, Thiruvalla"
        width={1672}
        height={941}
        preload
        sizes="100vw"
        className="hero-banner-bg fill-img"
      />
      <div className="hero-banner-overlay" aria-hidden="true" />

      <ScrollReveal direction="up" className="hero-banner-content">
        <h1>
          Unisex Salon <br />
          <span className="hero-gold-text">& Bridal Makeup</span>
          <span className="hero-city"> in Thiruvalla</span>
        </h1>
        <p className="hero-description">
          Haircuts, hair colour, bridal makeup, facials, massage, and nail art. Open every day, 10 AM to 8:30 PM.
        </p>
        <Link href="/services" className="hero-banner-btn">
          <span className="hero-banner-btn-line" aria-hidden="true" />
          Book Your Visit
        </Link>
      </ScrollReveal>

      <div className="hero-banner-scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

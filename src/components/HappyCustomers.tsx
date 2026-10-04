import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const CUSTOMERS = [
  { src: "/images/hero/hero-saree.jpg", alt: "Happy bride in a cream and gold Kerala saree with jasmine flowers, styled at Glam'more" },
  { src: "/images/hero/hero-groom.jpg", alt: "Happy groom in a red kurta with a neatly trimmed beard, groomed at Glam'more" },
  { src: "/images/hero/hero-bridal-gold.jpg", alt: "Happy bride in a red and gold saree with gold jewellery, made up at Glam'more" },
  { src: "/images/hero/hero-bridal.jpg", alt: "Smiling bride in a red silk saree with a gold forehead ornament, made up at Glam'more" },
  { src: "/images/hero/hero-pink-gown.jpg", alt: "Happy bride in a pink gown holding a bouquet, styled at Glam'more" },
];

export default function HappyCustomers() {
  return (
    <section className="happy-section" id="happy-customers">
      <ScrollReveal direction="up">
        <div className="section-title text-center">
          <h2 className="gold-section-heading">HAPPY CUSTOMERS</h2>
          <p className="happy-sub">Smiles from the Glam&apos;more chair.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={150}>
        <div className="happy-grid">
          {CUSTOMERS.map((c) => (
            <div className="happy-card" key={c.src}>
              <Image src={c.src} alt={c.alt} fill sizes="(max-width: 768px) 60vw, 20vw" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

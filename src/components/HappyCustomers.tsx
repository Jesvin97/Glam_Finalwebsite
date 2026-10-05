import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

// Two "Happy Customer" posters stacked like a pile of photos; hover, focus or tap fans them out.
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

export default function HappyCustomers() {
  return (
    <section className="happy-section" id="happy-customers">
      <ScrollReveal direction="up">
        <div className="section-title text-center">
          <h2 className="gold-section-heading">HAPPY CUSTOMERS</h2>
          <p className="happy-sub">Smiles from the Glam&apos;more chair. Tap or hover to spread them out.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={150}>
        <div className="happy-pile" tabIndex={0} aria-label="Happy customer photos">
          {POSTERS.map((p, i) => (
            <figure className={`happy-poster happy-poster-${i + 1}`} key={p.src}>
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 640px) 90vw, 480px" />
            </figure>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

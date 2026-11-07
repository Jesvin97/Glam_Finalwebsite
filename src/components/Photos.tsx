"use client";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

// Each row is shown twice so the marquee loops; only the first copy is read out by screen readers.
const row1 = [
  { src: "/images/1.webp", alt: "Bridal makeup Thiruvalla, bride in white gown with rose bouquet" },
  { src: "/images/2.webp", alt: "Gel nail art Thiruvalla, red nails with flower accent" },
  { src: "/images/3.jpg", alt: "Kerala bridal makeup and saree draping, bride in silk saree" },
  { src: "/images/4.webp", alt: "Nail art Thiruvalla, burgundy nails with white flowers" },
  { src: "/images/5.webp", alt: "Gel manicure, pink and blue nails with gold glitter" },
  { src: "/images/gallery-10.webp", alt: "Bridal hairstyling and kasavu saree draping, bride with jasmine braid" },
];

const row2 = [
  { src: "/images/6.webp", alt: "Wedding makeup and groom styling, couple in gown and purple suit" },
  { src: "/images/7.webp", alt: "Groom styling Thiruvalla, groom in navy suit" },
  { src: "/images/8.webp", alt: "Bridal makeup, bride in white lace gown with long train" },
  { src: "/images/9.webp", alt: "Bridal hairstyling, bride with side braid and veil" },
  { src: "/images/10.webp", alt: "Wedding makeup Thiruvalla, bride with rose bouquet" },
  { src: "/images/gallery-11.webp", alt: "Men's beard styling and grooming, bearded man in red kurta" },
  { src: "/images/gallery-12.webp", alt: "Bridal makeup with temple jewellery, bride in red silk saree" },
];

export default function Gallery() {
  const renderCards = (row: typeof row1, prefix: string) =>
    [...row, ...row].map((img, index) => {
      const isCopy = index >= row.length;
      return (
        <div className="gallery-card" key={`${prefix}-${index}`} aria-hidden={isCopy || undefined}>
          <Image
            src={img.src}
            alt={isCopy ? "" : img.alt}
            width={280}
            height={420}
            style={{ objectFit: "contain" }}
            quality={100}
            unoptimized={true}
          />
        </div>
      );
    });

  return (
    <section className="gallery-section">
      <ScrollReveal direction="up">
        <div className="gallery-header photos-title-container">
          <h2 className="gold-section-heading">
            GALLERY
          </h2>
        </div>
      </ScrollReveal>

      {/* First Row */}
      <ScrollReveal direction="none" delay={200}>
        <div className="gallery-marquee">
          <div className="gallery-track scroll-left">{renderCards(row1, "row1")}</div>
        </div>
      </ScrollReveal>

      {/* Second Row */}
      <ScrollReveal direction="none" delay={300}>
        <div className="gallery-marquee">
          <div className="gallery-track scroll-right">{renderCards(row2, "row2")}</div>
        </div>
      </ScrollReveal>
    </section>
  );
}

"use client";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

// Each row is shown twice so the marquee loops; only the first copy is read out by screen readers.
const row1 = [
  { src: "/images/1.webp", alt: "Bridal makeup Thiruvalla, bride in white gown with rose bouquet" },
  { src: "/images/half-saree-party-makeup-thiruvalla-1.webp", alt: "Half saree party makeup and hairstyling in Thiruvalla, woman in magenta and cream half saree with gold waist belt" },
  { src: "/images/2.webp", alt: "Gel nail art Thiruvalla, red nails with flower accent" },
  { src: "/images/red-silk-saree-bridal-makeup-thiruvalla-1.webp", alt: "Kerala bridal makeup with antique gold jewellery, bride in red silk saree, Thiruvalla" },
  { src: "/images/3.jpg", alt: "Kerala bridal makeup and saree draping, bride in silk saree" },
  { src: "/images/blue-silk-saree-bridal-makeup-thiruvalla-1.webp", alt: "Bridal makeup and hairstyling with jasmine flowers, bride in royal blue silk saree, Thiruvalla" },
  { src: "/images/4.webp", alt: "Nail art Thiruvalla, burgundy nails with white flowers" },
  { src: "/images/half-saree-party-makeup-thiruvalla-3.webp", alt: "Kerala half saree makeup with gold jewellery, woman in magenta half saree beside a palm-lined window" },
  { src: "/images/5.webp", alt: "Gel manicure, pink and blue nails with gold glitter" },
  { src: "/images/bridal-jasmine-braid-hairstyle-thiruvalla.webp", alt: "Bridal hairstyle with jasmine flower bun and long braid, back view of royal blue saree blouse, Thiruvalla" },
  { src: "/images/gallery-10.webp", alt: "Bridal hairstyling and kasavu saree draping, bride with jasmine braid" },
  { src: "/images/wedding-couple-groom-bride-styling-thiruvalla.webp", alt: "Wedding couple styling in Thiruvalla, groom in white mundu and kurta with bride in mustard silk saree" },
];

const row2 = [
  { src: "/images/6.webp", alt: "Wedding makeup and groom styling, couple in gown and purple suit" },
  { src: "/images/half-saree-party-makeup-thiruvalla-2.webp", alt: "Traditional half saree look with temple jewellery and braided hairstyle, makeup at Glam'more Thiruvalla" },
  { src: "/images/7.webp", alt: "Groom styling Thiruvalla, groom in navy suit" },
  { src: "/images/blue-silk-saree-bridal-makeup-thiruvalla-2.webp", alt: "Kerala bridal makeup with layered gold jewellery, bride in blue and gold silk saree" },
  { src: "/images/8.webp", alt: "Bridal makeup, bride in white lace gown with long train" },
  { src: "/images/red-silk-saree-bridal-makeup-thiruvalla-2.webp", alt: "Bridal makeup with mehndi hands, bride in red silk saree seated in a car, Thiruvalla" },
  { src: "/images/9.webp", alt: "Bridal hairstyling, bride with side braid and veil" },
  { src: "/images/half-saree-party-makeup-thiruvalla-4.webp", alt: "Soft glam makeup with choker necklace and bangles, magenta half saree look at Glam'more Thiruvalla" },
  { src: "/images/10.webp", alt: "Wedding makeup Thiruvalla, bride with rose bouquet" },
  { src: "/images/red-saree-temple-jewellery-makeup-thiruvalla.webp", alt: "Bridal saree draping and temple jewellery makeup, bride in red silk saree outdoors, Thiruvalla" },
  { src: "/images/gallery-11.webp", alt: "Men's beard styling and grooming, bearded man in red kurta" },
  { src: "/images/blue-silk-saree-bridal-makeup-thiruvalla-3.webp", alt: "Bridal saree draping with gold waist belt and bangles, bride in royal blue silk saree, side view" },
  { src: "/images/gallery-12.webp", alt: "Bridal makeup with temple jewellery, bride in red silk saree" },
  { src: "/images/half-saree-party-makeup-thiruvalla-5.webp", alt: "Full-length magenta and cream half saree styling with gold waist belt, Thiruvalla" },
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

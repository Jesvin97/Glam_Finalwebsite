 "use client";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

export default function Gallery() {
 const row1 = [
  "/images/1.webp",
  "/images/2.webp",
  "/images/3.jpg",
  "/images/4.webp",
  "/images/5.webp",
];

const row2 = [
  "/images/6.webp",
  "/images/7.webp",
  "/images/8.webp",
  "/images/9.webp",
  "/images/10.webp",
];

  return (
    <section className="gallery-section">
      <ScrollReveal direction="up">
        <div className="gallery-header photos-title-container">
          <h2 className="gold-section-heading">
            OUR GALLERY
          </h2>
        </div>
      </ScrollReveal>

      {/* First Row */}
      <ScrollReveal direction="none" delay={200}>
        <div className="gallery-marquee">
          <div className="gallery-track scroll-left">
            {[...row1, ...row1].map((img, index) => (
              <div className="gallery-card" key={`row1-${index}`}>
                <Image
                  src={img}
                  alt={`Gallery Image ${index + 1}`}
                  width={280}
                  height={420}
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Second Row */}
      <ScrollReveal direction="none" delay={300}>
        <div className="gallery-marquee">
          <div className="gallery-track scroll-right">
            {[...row2, ...row2].map((img, index) => (
              <div className="gallery-card" key={`row2-${index}`}>
                <Image
                  src={img}
                  alt={`Gallery Image ${index + 1}`}
                  width={280}
                  height={420}
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
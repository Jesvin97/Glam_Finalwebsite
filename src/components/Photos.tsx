 "use client";

export default function Gallery() {
  const row1 = [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
  ];

  const row2 = [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486",
    "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8",
    "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1",
  ];

  return (
    <section className="gallery-section">
      <div className="gallery-header" style={{ marginBottom: "40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "52px", textTransform: "uppercase", letterSpacing: "4px", color: "#d4af37", fontFamily: "Playfair Display, serif", fontWeight: "700" }}>
          OUR GALLERY
        </h2>
      </div>

      {/* First Row */}
      <div className="gallery-marquee">
        <div className="gallery-track scroll-left">
          {[...row1, ...row1].map((img, index) => (
            <div className="gallery-card" key={`row1-${index}`}>
              <img
                src={img}
                alt={`Gallery Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second Row */}
      <div className="gallery-marquee">
        <div className="gallery-track scroll-right">
          {[...row2, ...row2].map((img, index) => (
            <div className="gallery-card" key={`row2-${index}`}>
              <img
                src={img}
                alt={`Gallery Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
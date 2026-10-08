"use client";

import { urlFor } from "@/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import BlogBookshelf from "./BlogBookshelf";

export interface BlogItem {
  title: string;
  description: string;
  category: string;
  image: SanityImageSource | string;
  _id?: string;
  publishedAt?: string;
}

// Book covers for the shelf, in the site's colours: black, cream, gold, deep brown (with a matching foil colour).
const SHELF_COVERS = [
  { color: "#1b1b1b", foil: "#f5d76e" },
  { color: "#efe8d4", foil: "#7a5a10" },
  { color: "#c9a227", foil: "#1a1408" },
  { color: "#2a1d0b", foil: "#f2ead8" },
];

function shelfDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso)
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    .toUpperCase();
}

export default function Blog({ blogs = [] }: { blogs?: BlogItem[] }) {


  return (
    <section className="blog-section" id="blog">
      <div className="section-title">
        <p>OUR BLOG</p>
        <h1 className="blog-heading">
          Beauty &
          <span className="gold-text"> Lifestyle Journal</span>
        </h1>
      </div>

      {blogs.length === 0 && (
        <p style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", color: "#999", lineHeight: 1.7 }}>
          Hair care, skin care, and bridal tips from our stylists are coming soon. In the meantime,{" "}
          <Link href="/services" style={{ color: "#d4af37" }}>browse our salon services</Link>.
        </p>
      )}

      {blogs.length > 0 && (
        <BlogBookshelf
          items={blogs.map((b, i) => ({
            id: b._id ?? `post-${i}`,
            title: b.title,
            date: shelfDate(b.publishedAt),
            ...SHELF_COVERS[i % SHELF_COVERS.length],
          }))}
        />
      )}

      <div className="blog-grid">
        {blogs.map((blog, index) => {
          // Resolve image path safely (either local string or Sanity dynamic URL)
          const imageUrl = (blog.image && typeof blog.image !== "string")
            ? urlFor(blog.image).width(800).auto('format').quality(80).url()
            : (blog.image || "/images/model.jpeg");

          return (
            <div className="blog-card" key={index}>
              <Image 
                src={imageUrl} 
                alt={blog.title} 
                width={800} 
                height={500} 
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
              />

              <div className="blog-content">
                <span className="blog-category">{blog.category}</span>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
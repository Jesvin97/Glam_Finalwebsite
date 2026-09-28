"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";

interface BlogItem {
  title: string;
  description: string;
  category: string;
  image: any;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const query = `*[_type == "blog"] | order(publishedAt desc)`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to fetch blogs from Sanity:", err);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <section className="blog-section" id="blog">
      <div className="section-title">
        <p>OUR BLOG</p>
        <h2>
          Beauty &
          <span className="gold-text"> Lifestyle Journal</span>
        </h2>
      </div>

      {blogs.length === 0 && (
        <p style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", color: "#999", lineHeight: 1.7 }}>
          Hair care, skin care, and bridal tips from our stylists are coming soon. In the meantime,{" "}
          <Link href="/services" style={{ color: "#d4af37" }}>browse our salon services</Link>.
        </p>
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
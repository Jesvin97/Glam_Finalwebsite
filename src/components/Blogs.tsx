"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

interface BlogItem {
  title: string;
  description: string;
  category: string;
  image: any;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  const fallbackBlogs = [
    {
      image: "/images/model.jpeg",
      category: "Beauty",
      title: "Top Luxury Hair Trends in 2026",
      description:
        "Discover the latest luxury hairstyles and salon transformations dominating this year.",
    },
    {
      image: "/images/model2.jpeg",
      category: "Skincare",
      title: "5 Secrets For Healthy Glowing Skin",
      description:
        "Professional skincare techniques used by skilled beauty specialists.",
    },
    {
      image: "/images/spa-area.jpeg",
      category: "Wellness",
      title: "Why Spa Therapy Improves Mental Wellness",
      description:
        "Luxury spa sessions help reduce stress and improve self-confidence naturally.",
    },
  ];

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const query = `*[_type == "blog"] | order(publishedAt desc)`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to fetch blogs from Sanity, using fallback:", err);
      }
    }
    fetchBlogs();
  }, []);

  const displayBlogs = blogs.length > 0 ? blogs : fallbackBlogs;

  return (
    <section className="blog-section" id="blog">
      <div className="section-title">
        <p>OUR BLOG</p>
        <h2>
          Beauty &
          <span className="gold-text"> Lifestyle Journal</span>
        </h2>
      </div>

      <div className="blog-grid">
        {displayBlogs.map((blog, index) => {
          // Resolve image path safely (either local string or Sanity dynamic URL)
          const imageUrl = (blog.image && typeof blog.image !== "string")
            ? urlFor(blog.image).url()
            : (blog.image || "/images/model.jpeg");

          return (
            <div className="blog-card" key={index}>
              <img src={imageUrl} alt={blog.title} />

              <div className="blog-content">
                <span className="blog-category">{blog.category}</span>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <a href="#">Read More →</a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
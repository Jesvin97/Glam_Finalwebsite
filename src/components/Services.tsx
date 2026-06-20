"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import ScrollReveal from "./ScrollReveal";

interface ServiceItem {
  title: string;
  description: string;
  image: any;
}

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  // Local fallback data
  const fallbackServices = [
    {
      title: "Professional Makeup",
      description: "Bridal, celebrity and luxury makeup styling.",
      image: "/images/model2.jpeg",
    },
    {
      title: "Nail Care",
      description: "Luxury manicure and nail art experience.",
      image: "/images/nail-polish .jpeg",
    },
    {
      title: "Spa & Massage",
      description: "Relaxing wellness and luxury spa therapy.",
      image: "/images/spa-area.jpeg",
    },
  ];

  useEffect(() => {
    async function fetchServices() {
      try {
        const query = `*[_type == "service"]`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setServices(data);
        }
      } catch (err) {
        console.error("Failed to fetch services from Sanity, using fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const displayServices = services.length > 0 ? services : fallbackServices;

  // Categorize helper based on keywords
  const getServiceCategory = (title: string, description: string): string => {
    const t = title.toLowerCase();
    const d = description.toLowerCase();
    if (t.includes("hair") || t.includes("cut") || t.includes("styling") || t.includes("smooth") || t.includes("keratin")) return "Hair";
    if (t.includes("nail") || t.includes("manicure") || t.includes("pedicure") || t.includes("art") || t.includes("polish")) return "Nails";
    if (t.includes("spa") || t.includes("massage") || t.includes("relax") || t.includes("therapy")) return "Spa";
    if (t.includes("makeup") || t.includes("bridal") || t.includes("skin") || t.includes("facial") || t.includes("glow") || t.includes("beauty")) return "Skin & Makeup";
    return "Beauty";
  };

  // Compile categories that have at least one service
  const availableCategories = ["All", ...Array.from(new Set(displayServices.map(s => getServiceCategory(s.title, s.description))))];

  const filteredServices = activeTab === "All"
    ? displayServices
    : displayServices.filter(s => getServiceCategory(s.title, s.description) === activeTab);

  return (
    <section className="services" id="services">
      <ScrollReveal direction="up">
        <div className="section-title services-title-container">
          <h2 className="gold-section-heading">
            OUR SERVICES
          </h2>
        </div>
      </ScrollReveal>

      {/* CATEGORY TABS */}
      <ScrollReveal direction="none" delay={150}>
        <div className="services-tabs-container">
          {availableCategories.map((cat, idx) => (
            <button
              key={idx}
              className={`services-tab-btn ${activeTab === cat ? "active" : ""}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* FILTERED SERVICES GRID */}
      <div className="services-grid">
        {filteredServices.map((service, index) => {
          // Resolve image path safely (either local string or Sanity dynamic URL)
          const imageUrl = (service.image && typeof service.image !== "string")
            ? urlFor(service.image).width(600).auto('format').quality(80).url()
            : (service.image || "/images/model2.jpeg");

          return (
            <ScrollReveal key={`${activeTab}-${index}`} direction="up" delay={index * 100} duration={800}>
              <div className="service-card">
                <div className="service-card-img-container">
                  <img src={imageUrl} alt={service.title} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal direction="up" delay={300}>
        <div className="center-btn-container">
          <a href="/services" className="primary-btn">
            Explore Full Menu & Book Now →
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
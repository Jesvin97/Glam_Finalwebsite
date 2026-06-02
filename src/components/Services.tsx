"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

interface ServiceItem {
  title: string;
  description: string;
  image: any;
}

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="services" id="services">
      <div className="section-title" style={{ marginBottom: "40px" }}>
        <p>OUR SERVICES</p>
      </div>

      <div className="services-grid">
        {displayServices.map((service, index) => {
          // Resolve image path safely (either local string or Sanity dynamic URL)
          const imageUrl = (service.image && typeof service.image !== "string")
            ? urlFor(service.image).url()
            : (service.image || "/images/model2.jpeg");

          return (
            <div className="service-card" key={index}>
              <img src={imageUrl} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <a href="/services" className="primary-btn">
          Explore Full Menu & Book Now →
        </a>
      </div>
    </section>
  );
}
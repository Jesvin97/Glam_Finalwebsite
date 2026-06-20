"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

interface ServiceItem {
  title: string;
  description: string;
  image: any;
}

export default function Services() {
  const { language, t } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  // Local fallback data
  const fallbackServicesEn = [
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

  const fallbackServicesMl = [
    {
      title: "മേക്കപ്പ് സേവനങ്ങൾ",
      description: "വിവാഹങ്ങൾക്കും പാർട്ടികൾക്കുമായി പ്രൊഫഷണൽ മേക്കപ്പ് ആർട്ടിസ്റ്റുകൾ ചെയ്യുന്ന ഫ്ലാവ്‌ലെസ് എച്ച്ഡി, എയർബ്രഷ് മേക്കപ്പ്.",
      image: "/images/model2.jpeg",
    },
    {
      title: "നഖ പരിചരണം",
      description: "തിരുവല്ലയിലെ ഞങ്ങളുടെ നെയിൽ സ്റ്റുഡിയോയിൽ മാനിക്യൂർ, പെഡിക്യൂർ സേവനങ്ങൾ.",
      image: "/images/nail-polish .jpeg",
    },
    {
      title: "സ്പാ & മസാജ്",
      description: "തിരുവല്ലയിലെ ഞങ്ങളുടെ വെൽനസ് സ്പായിൽ ലഭ്യമായ ഡീപ് ടിഷ്യൂ, അരോമാതെറാപ്പി റിലാക്സിംഗ് മസാജുകൾ.",
      image: "/images/spa-area.jpeg",
    },
  ];

  const fallbackServices = language === "ml" ? fallbackServicesMl : fallbackServicesEn;

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
    const tVal = title.toLowerCase();
    const dVal = description.toLowerCase();
    if (
      tVal.includes("hair") || tVal.includes("cut") || tVal.includes("styling") || tVal.includes("smooth") || tVal.includes("keratin") ||
      tVal.includes("ഹെയർ") || tVal.includes("കട്ട്")
    ) return "Hair";
    if (
      tVal.includes("nail") || tVal.includes("manicure") || tVal.includes("pedicure") || tVal.includes("art") || tVal.includes("polish") ||
      tVal.includes("നഖ") || tVal.includes("പെഡിക്യൂ")
    ) return "Nails";
    if (
      tVal.includes("spa") || tVal.includes("massage") || tVal.includes("relax") || tVal.includes("therapy") ||
      tVal.includes("സ്പാ") || tVal.includes("മസാജ്")
    ) return "Spa";
    if (
      tVal.includes("makeup") || tVal.includes("bridal") || tVal.includes("skin") || tVal.includes("facial") || tVal.includes("glow") || tVal.includes("beauty") ||
      tVal.includes("മേക്കപ്പ്") || tVal.includes("ബ്രൈഡൽ") || tVal.includes("സ്കിൻ")
    ) return "Skin & Makeup";
    return "Beauty";
  };

  const getCategoryDisplayName = (cat: string): string => {
    if (language !== "ml") return cat;
    switch (cat) {
      case "All": return "എല്ലാം";
      case "Hair": return "ഹെയർ";
      case "Nails": return "നഖങ്ങൾ";
      case "Spa": return "സ്പാ";
      case "Skin & Makeup": return "മേക്കപ്പ് & സ്കിൻ";
      default: return "സൗന്ദര്യം";
    }
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
            {t("servicesTitle")}
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
              {getCategoryDisplayName(cat)}
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
            {language === "ml" ? "എല്ലാ സേവനങ്ങളും കാണുക & ബുക്ക് ചെയ്യുക →" : "Explore Full Menu & Book Now →"}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
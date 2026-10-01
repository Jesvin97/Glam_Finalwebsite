"use client";
import "./services.css";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaTimes, FaClock, FaUser, FaPlus, FaCheck, FaCalendarAlt, FaMagic } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";

const WHATSAPP_NUMBER = "919645915329";

type CategoryId = "hair" | "events" | "skin" | "spa" | "nails" | "brows" | "mens" | "waxing";

interface ServiceItem {
  id: string;
  title: string;
  category: CategoryId;
  description: string;
  image?: string;
}

interface CategoryMeta {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  bannerImage: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

const toDateString = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function ServicesClient() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; time?: string }>({});

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    phone: "",
    date: toDateString(new Date()),
    time: "",
    message: "",
  });

  const filterCategories = [
    { id: "all", name: "All Services" },
    { id: "hair", name: "Hair" },
    { id: "events", name: "Bride & Groom" },
    { id: "skin", name: "Facials & Skin Care" },
    { id: "spa", name: "Spa & Massage" },
    { id: "nails", name: "Nails" },
    { id: "brows", name: "Brows & Lashes" },
    { id: "mens", name: "Men's Grooming" },
    { id: "waxing", name: "Waxing" },
  ];

  const categoryMetaList: CategoryMeta[] = [
    {
      id: "hair",
      name: "Haircuts, Colour & Hair Treatments",
      tagline: "Hair Salon in Thiruvalla",
      description: "Haircuts for men and women, hair colouring, keratin and hair smoothening, occasion styling, and natural human hair extensions. Tell us how you wear your hair day to day and we'll cut and style for that.",
      bannerImage: "/images/Hair Styling & Extensions.png",
    },
    {
      id: "events",
      name: "Bride & Groom",
      tagline: "Bridal & Groom Makeup in Thiruvalla",
      description: "Kerala bridal makeup in HD and airbrush, hairstyling and saree draping for the bride, groom styling and makeup, and getting the whole wedding party ready on the day.",
      bannerImage: "/images/bridal.jpg",
    },
    {
      id: "skin",
      name: "Facials & Skin Care",
      tagline: "Facials in Thiruvalla",
      description: "Facials, de-tan, and clean-up treatments matched to your skin type, plus pre-bridal skin preparation in the weeks before a wedding.",
      bannerImage: "/images/services/facials-banner.jpg",
    },
    {
      id: "spa",
      name: "Spa & Massage",
      tagline: "Massage in Thiruvalla",
      description: "Body and head massages in a private treatment room, to ease muscle tension or simply to unwind.",
      bannerImage: "/images/services/spa-banner.jpg",
    },
    {
      id: "nails",
      name: "Nail Art, Manicure & Pedicure",
      tagline: "Nail Salon in Thiruvalla",
      description: "Acrylic nail extensions, nail art, gel manicures, and spa pedicures.",
      bannerImage: "/images/nailart.jpg",
    },
    {
      id: "brows",
      name: "Brows & Lashes",
      tagline: "Threading & Lash Extensions",
      description: "Eyebrow threading for clean, defined brows, and classic or volume eyelash extensions.",
      bannerImage: "/images/services/brows-lashes-banner.jpg",
    },
    {
      id: "mens",
      name: "Men's Grooming",
      tagline: "Shaves & Beard Styling",
      description: "Hot-towel shaves, beard shaping and edging, and styling advice for a look that suits your face.",
      bannerImage: "/images/services/mens-grooming-banner.jpg",
    },
    {
      id: "waxing",
      name: "Waxing",
      tagline: "Body & Facial Waxing",
      description: "Full-body and facial waxing using wax suited to sensitive skin.",
      bannerImage: "/images/Waxing & Smooth Skin Care.png",
    },
  ];

  const servicesData: ServiceItem[] = [
    // ── Hair ──
    {
      id: "haircut",
      title: "Haircut",
      category: "hair",
      description: "Haircuts for men and women, planned around your hair texture and how much time you spend styling it.",
      image: "/images/Haircut.png"
    },
    {
      id: "hair-coloring",
      title: "Hair Colouring",
      category: "hair",
      description: "Global colour, highlights, and grey coverage, with a shade consultation first.",
      image: "/images/services/hair-colouring.jpg"
    },
    {
      id: "keratin-smoothening",
      title: "Keratin & Hair Smoothening",
      category: "hair",
      description: "Keratin and smoothening treatments to reduce frizz and make hair easier to manage.",
      image: "/images/services/keratin-smoothening.jpg"
    },
    {
      id: "hairstyling",
      title: "Hairstyling",
      category: "hair",
      description: "Blow-dries, updos, and styling for weddings, functions, and parties.",
      image: "/images/Hair_stylingjpeg.jpeg"
    },
    {
      id: "hair-extensions",
      title: "Hair Extensions",
      category: "hair",
      description: "Natural human hair extensions for added length or volume, colour-matched and fitted in the salon.",
      image: "/images/Hiar_extension.jpeg"
    },
    // ── Bridal & Makeup ──
    {
      id: "bridal-services",
      title: "Bridal Makeup",
      category: "events",
      description: "Kerala bridal makeup with hairstyling and saree draping, planned with you before the wedding day.",
      image: "/images/bridal.jpg"
    },
    {
      id: "wedding-prep",
      title: "Wedding & Event Preparation",
      category: "events",
      description: "Hair, makeup, and draping for the bride's family and bridal party, scheduled so everyone is ready on time.",
      image: "/images/model.jpeg"
    },
    {
      id: "groom-makeup",
      title: "Groom Makeup",
      category: "events",
      description: "Groom styling for the wedding day: hair, beard trim and shaping, and light, natural makeup for photos.",
      image: "/images/services/groom-makeup.jpg"
    },
    // ── Facials & Skin Care ──
    {
      id: "facials",
      title: "Facials",
      category: "skin",
      description: "Facials chosen for your skin type, whether dry, oily, or sensitive, including pre-bridal facial courses.",
      image: "/images/services/facials.jpg"
    },
    {
      id: "detan-cleanup",
      title: "De-tan & Clean-up",
      category: "skin",
      description: "De-tan packs and clean-ups to lift sun tan and clear congested skin.",
      image: "/images/services/detan-cleanup.jpg"
    },
    // ── Spa & Massage ──
    {
      id: "body-massage",
      title: "Body Massage",
      category: "spa",
      description: "Full-body relaxation massage with warm oil in a private room.",
      image: "/images/spa.jpg"
    },
    {
      id: "head-massage",
      title: "Head & Shoulder Massage",
      category: "spa",
      description: "A shorter massage focused on the scalp, neck, and shoulders.",
      image: "/images/services/head-massage.jpg"
    },
    // ── Nails ──
    {
      id: "gel-manicure",
      title: "Gel Manicure",
      category: "nails",
      description: "Cuticle care, shaping, and gel polish that lasts without chipping.",
      image: "/images/Gel Manicure.png"
    },
    {
      id: "pedicures",
      title: "Spa Pedicure",
      category: "nails",
      description: "Foot soak, scrub, callus care, nail shaping, and polish.",
      image: "/images/Spa pedicures.png"
    },
    {
      id: "acrylic-nails",
      title: "Acrylic Nails & Nail Art",
      category: "nails",
      description: "Acrylic nail extensions in your choice of length and shape, finished with custom nail art.",
      image: "/images/nailart.jpg"
    },
    // ── Brows & Lashes / Men's Grooming ──
    {
      id: "eyebrow-threading",
      title: "Eyebrow Threading",
      category: "brows",
      description: "Threading to shape and define your brows.",
      image: "/images/Eyebrow threading.png"
    },
    {
      id: "eyelashes",
      title: "Eyelash Extensions",
      category: "brows",
      description: "Classic and volume lash extensions, applied lash by lash.",
      image: "/images/Eyelash Extensions.png"
    },
    {
      id: "shaving",
      title: "Shaving & Beard Styling",
      category: "mens",
      description: "Hot-towel shave, beard shaping, and edging, with advice on a beard style that suits your face.",
      image: "/images/Shaving & Beard Styling.png"
    },
    // ── Waxing ──
    {
      id: "body-waxing",
      title: "Body Waxing",
      category: "waxing",
      description: "Arms, legs, and full-body waxing using wax suited to sensitive skin.",
      image: "/images/Body Waxing.png"
    },
    {
      id: "waxing",
      title: "Facial Waxing",
      category: "waxing",
      description: "Upper lip, chin, and full-face waxing.",
      image: "/images/Facial Waxing.png"
    },
  ];

  // ── Helpers ──
  const handleToggleService = (serviceTitle: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceTitle)
        ? prev.filter((s) => s !== serviceTitle)
        : [...prev, serviceTitle]
    );
  };

  const handleRemoveService = (serviceTitle: string) => {
    setSelectedServices((prev) => prev.filter((s) => s !== serviceTitle));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setBookingDetails((prev) => ({ ...prev, date: date ? toDateString(date) : "" }));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const formatTimeTo12Hour = (timeStr: string) => {
    if (!timeStr) return "";
    const [hoursStr, minutesStr] = timeStr.split(":");
    let hours = Number(hoursStr);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { name?: string; phone?: string; time?: string } = {};
    if (!bookingDetails.name.trim()) errors.name = "Please enter your full name.";
    if (!bookingDetails.phone.trim()) errors.phone = "Please enter your phone number.";
    else if (!/^[0-9+\s\-()]{7,15}$/.test(bookingDetails.phone.trim()))
      errors.phone = "Enter a valid phone number.";
    if (!bookingDetails.time) errors.time = "Please select a time slot.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const servicesList = selectedServices.length > 0
      ? selectedServices.map((s) => `- ${s}`).join("\n")
      : "- General Consultation";

    const text = [
      `Hello Glam'more Salon,`,
      ``,
      `I would like to book an appointment for:`,
      servicesList,
      ``,
      `Name: ${bookingDetails.name}`,
      `Phone: ${bookingDetails.phone}`,
      `Date: ${bookingDetails.date}`,
      `Time: ${formatTimeTo12Hour(bookingDetails.time)}`,
      bookingDetails.message ? `Notes: ${bookingDetails.message}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    setIsDrawerOpen(false);
  };

  const visibleCategories = categoryMetaList.filter(
    (cat) => categoryFilter === "all" || categoryFilter === cat.id
  );

  return (
    <>
      <Navbar />

      <main className="services-page-container">
        {/* ── 1. HERO SECTION ── */}
        <section className="services-hero-section">
          <div className="hero-content-wrapper">
            <span className="hero-badge-tag">GLAM&apos;MORE EXPERIENCES</span>
            <h1 className="hero-main-title">Salon Services in Thiruvalla</h1>
            <p className="hero-intro-text">
              Hair, bridal makeup, facials, massage, nails, and grooming for men and women at our salon in Thukalassery, Thiruvalla. Choose your services and send the booking straight to us on WhatsApp.
            </p>
          </div>

          <div className="hero-banner-image-container">
            <Image
              src="/images/salon-interior.jpeg"
              alt="Glammore Salon Experience"
              className="hero-banner-image"
              fill
              preload
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="hero-banner-overlay" />
          </div>
        </section>

        {/* ── CATEGORY FILTER NAVIGATION ── */}
        <nav className="category-filter-nav">
          <ul className="filter-pill-list">
            {filterCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`filter-pill-btn ${categoryFilter === cat.id ? "active" : ""}`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── 2. CATEGORY SECTIONS (ALTERNATING IMAGE LEFT / IMAGE RIGHT) ── */}
        <div className="categories-stack">
          {visibleCategories.map((category, index) => {
            const catSubServices = servicesData.filter((s) => s.category === category.id);
            const isImageLeft = index % 2 === 0;

            return (
              <section
                key={category.id}
                id={`category-${category.id}`}
                className={`category-block-section category-${category.id}`}
              >
                {/* ── CATEGORY FEATURE BANNER ── */}
                <div
                  className={`category-feature-banner ${
                    isImageLeft ? "banner-image-left" : "banner-image-right"
                  }`}
                >
                  {/* Image Side */}
                  <div className="banner-image-wrapper">
                    <Image
                      src={category.bannerImage}
                      alt={category.name}
                      className="banner-image"
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                    />
                    <div className="banner-image-gradient" />
                  </div>

                  {/* Text Side */}
                  <div className="banner-text-content">
                    <span className="banner-category-tag">
                      {category.tagline}
                    </span>
                    <h2 className="banner-category-title">{category.name}</h2>
                    <p className="banner-intro-paragraph">
                      {category.description}
                    </p>
                    {(category.ctaPrimary || category.ctaSecondary) && (
                      <div className="banner-cta-group">
                        {category.ctaPrimary && (
                          <button
                            className="banner-btn primary-btn"
                            onClick={() => setIsDrawerOpen(true)}
                          >
                            {category.ctaPrimary}
                          </button>
                        )}
                        {category.ctaSecondary && (
                          <button
                            className="banner-btn secondary-btn"
                            onClick={() => {
                              const el = document.getElementById(`sub-services-${category.id}`);
                              el?.scrollIntoView({ behavior: "smooth" });
                            }}
                          >
                            {category.ctaSecondary}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* ── SUB-SERVICES GRID BELOW BANNER ── */}
                <div id={`sub-services-${category.id}`} className="sub-services-wrapper">
                  <div className="sub-services-header-label">
                    <span className="sub-services-arrow"><FaMagic size={12} /></span> Select Treatments in {category.name}
                  </div>

                  <div className="sub-services-grid">
                    {catSubServices.map((service) => {
                      const isSelected = selectedServices.includes(service.title);
                      return (
                        <div
                          key={service.id}
                          className={`sub-service-card ${isSelected ? "selected" : ""}`}
                          onClick={() => handleToggleService(service.title)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={isSelected}
                        >
                          <div className="sub-service-image-box">
                            {service.image ? (
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                              />
                            ) : (
                              <div className="sub-service-placeholder" />
                            )}
                            <button
                              className="sub-service-add-btn"
                              aria-label={isSelected ? "Remove service" : "Add service"}
                            >
                              {isSelected ? <FaCheck size={13} /> : <FaPlus size={13} />}
                            </button>
                          </div>

                          <div className="sub-service-info">
                            <div className="sub-service-title-row">
                              <h3 className="sub-service-title">{service.title}</h3>
                            </div>
                            <p className="sub-service-desc">{service.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* ── FLOATING BOOKING PILL BAR ── */}
      <div className={`booking-pill-container ${selectedServices.length > 0 ? "visible" : ""}`}>
        <div className="booking-pill" onClick={() => setIsDrawerOpen(true)}>
          <div className="booking-pill-text">
            <span className="count">
              {selectedServices.length} service{selectedServices.length !== 1 ? "s" : ""} selected
            </span>
            <span className="label">Schedule Visit</span>
          </div>
          <div className="booking-pill-icon">⟶</div>
        </div>
      </div>

      {/* ── SLIDE-OUT BOOKING DRAWER ── */}
      <div className={`drawer-overlay ${isDrawerOpen ? "open" : ""}`} onClick={() => setIsDrawerOpen(false)} />
      <aside className={`booking-drawer ${isDrawerOpen ? "open" : ""}`}>
        <button className="drawer-close" onClick={() => setIsDrawerOpen(false)}>
          <FaTimes />
        </button>

        <h2 className="drawer-title">Schedule Visit</h2>

        {selectedServices.length > 0 && (
          <div className="drawer-services">
            <p className="drawer-label">Selected Services</p>
            <div className="drawer-tags">
              {selectedServices.map((s) => (
                <span key={s} className="drawer-tag">
                  {s} <FaTimes className="remove-tag" onClick={() => handleRemoveService(s)} />
                </span>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleBookingSubmit} className="drawer-form" noValidate>
          <div className="form-group">
            <label className="drawer-label">
              <FaCalendarAlt style={{ display: "inline", marginRight: 6, color: "#d4af37" }} />
              Preferred Date
            </label>
            <div className="calendar-container">
              {/* Rendered only when open: the page is prebuilt, so a server-rendered
                  calendar would show the build date and cause a hydration mismatch. */}
              {isDrawerOpen && (
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={{ before: new Date() }}
                  className="luxury-calendar"
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="drawer-label">Time Slot (10:00 AM – 8:30 PM)</label>
            <div className="input-with-icon">
              <FaClock className="input-icon" />
              <input
                type="time"
                name="time"
                min="10:00"
                max="20:30"
                value={bookingDetails.time}
                onChange={handleFormChange}
                className={`luxury-input${formErrors.time ? " input-error" : ""}`}
              />
            </div>
            {formErrors.time && <p className="field-error">{formErrors.time}</p>}
          </div>

          <div className="form-group">
            <label className="drawer-label">Full Name</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={bookingDetails.name}
                onChange={handleFormChange}
                className={`luxury-input${formErrors.name ? " input-error" : ""}`}
              />
            </div>
            {formErrors.name && <p className="field-error">{formErrors.name}</p>}
          </div>

          <div className="form-group">
            <label className="drawer-label">Phone Number</label>
            <div className="input-with-icon">
              <span className="input-icon" style={{ fontSize: 14 }}>📞</span>
              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={bookingDetails.phone}
                onChange={handleFormChange}
                className={`luxury-input${formErrors.phone ? " input-error" : ""}`}
              />
            </div>
            {formErrors.phone && <p className="field-error">{formErrors.phone}</p>}
          </div>

          <div className="form-group">
            <label className="drawer-label">Special Requests</label>
            <textarea
              name="message"
              placeholder="Any specific instructions for your appointment?"
              value={bookingDetails.message}
              onChange={handleFormChange}
              className="luxury-input textarea"
            />
          </div>

          <button type="submit" className="btn-luxury drawer-submit-btn">
            Confirm via WhatsApp <span className="btn-luxury-hover-effect" />
          </button>
        </form>
      </aside>

      <Footer />
    </>
  );
}

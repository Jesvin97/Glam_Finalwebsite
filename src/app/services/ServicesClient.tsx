"use client";
import "./services.css";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaTimes, FaClock, FaUser, FaPlus, FaCheck, FaCalendarAlt, FaMagic } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";

const WHATSAPP_NUMBER = "919645915329";

interface ServiceItem {
  id: string;
  title: string;
  category: "hair" | "nails" | "grooming" | "waxing" | "events";
  description: string;
  price?: string;
  duration?: string;
  image?: string;
}

interface CategoryMeta {
  id: "hair" | "events" | "nails" | "grooming" | "waxing";
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
    { id: "all", name: "All Collections" },
    { id: "hair", name: "Hair Styling & Extensions" },
    { id: "events", name: "Bridal, Makeup & Events" },
    { id: "nails", name: "Nail Care & Extensions" },
    { id: "grooming", name: "Brows, Lashes & Men's Grooming" },
    { id: "waxing", name: "Waxing & Smooth Skin Care" },
  ];

  const categoryMetaList: CategoryMeta[] = [
    {
      id: "hair",
      name: "Hair Styling & Extensions",
      tagline: "Signature Hair Artistry",
      description: "Transform your hair with precision cuts, couture blowouts, and 100% natural human hair extensions masterfully fitted for extraordinary length, volume, and silky movement.",
      bannerImage: "/images/haircut.jpg",
    },
    {
      id: "events",
      name: "Bridal, Makeup & Event Glamour",
      tagline: "Bridal Artistry & Occasions",
      description: "Comprehensive Kerala bridal makeup, HD airbrush application, and full wedding party preparations tailored to make your most memorable celebrations truly magical.",
      bannerImage: "/images/bridal.jpg",
    },
    {
      id: "nails",
      name: "Nail Care & Extensions",
      tagline: "Hand & Foot Spa Therapy",
      description: "Durable luxury acrylic extensions, custom artistic detailing, high-shine gel manicures, and organic foot spa pedicures designed for timeless elegance.",
      bannerImage: "/images/nailart.jpg",
    },
    {
      id: "grooming",
      name: "Brows, Lashes & Men's Grooming",
      tagline: "Essential Brow, Lash & Beard Care",
      description: "Expertly contoured eyebrow threading, voluminous lash extensions, and classic hot-towel beard shaping designed for effortless daily refinement.",
      bannerImage: "/images/male model.jpeg",
    },
    {
      id: "waxing",
      name: "Waxing & Smooth Skin Care",
      tagline: "Botanical Skin Care",
      description: "Silk-smooth body exfoliation and precision facial waxing treatments crafted with soothing botanical formulas for luminous, hair-free skin.",
      bannerImage: "/images/10.webp",
    },
  ];

  const servicesData: ServiceItem[] = [
    // ── Hair Styling & Extensions ──
    {
      id: "haircut",
      title: "Haircut",
      category: "hair",
      description: "Precision styling, trend-forward haircuts, and expert hair texturizing by master stylists.",
      price: "499",
      duration: "30–45 min",
      image: "/images/Haircut.png"
    },
    {
      id: "hairstyling",
      title: "Hairstyling",
      category: "hair",
      description: "Luxury blowouts, elegant updos, and custom event hairstyling for all hair types.",
      price: "799",
      duration: "45–60 min",
      image: "/images/Hair_stylingjpeg.jpeg"
    },
    {
      id: "hair-extensions",
      title: "Hair Extensions",
      category: "hair",
      description: "100% natural, premium human hair extensions for length, volume, and custom styling, professionally fitted.",
      price: "5,999",
      duration: "2–3 hrs",
      image: "/images/Hiar_extension.jpeg"
    },
    // ── Bridal, Makeup & Event Glamour ──
    {
      id: "bridal-services",
      title: "Bridal Services",
      category: "events",
      description: "Luxury comprehensive Kerala bridal makeup, hair styling, and wellness treatments tailored for your special wedding day in Thiruvalla.",
      price: "9,999",
      duration: "4–6 hrs",
      image: "/images/bridal.jpg"
    },
    {
      id: "wedding-prep",
      title: "Wedding & Event Preparation",
      category: "events",
      description: "Complete hair, skin, and styling packages for Kerala weddings and events — coordinated across the full bridal party.",
      price: "4,999",
      duration: "2–4 hrs",
      image: "/images/model.jpeg"
    },
    {
      id: "makeup-services",
      title: "Makeup Services",
      category: "events",
      description: "Flawless HD and airbrush makeup styles for celebrity shoots, family events, and parties.",
      price: "2,499",
      duration: "60–90 min",
      image: "/images/3.jpg"
    },
    // ── Nail Care & Extensions ──
    {
      id: "gel-manicure",
      title: "Gel Manicure",
      category: "nails",
      description: "Long-lasting gel polish manicure with cuticle care, nail shaping, and glossy topcoat.",
      price: "999",
      duration: "45 min",
      image: "/images/Gel Manicure.png"
    },
    {
      id: "pedicures",
      title: "Spa Pedicure",
      category: "nails",
      description: "Revitalizing foot spa therapy, organic scrub exfoliation, and precision nail care.",
      price: "799",
      duration: "45–60 min",
      image: "/images/Spa pedicures.png"
    },
    {
      id: "acrylic-nails",
      title: "Acrylic Nails & Art",
      category: "nails",
      description: "High-quality, durable acrylic extensions with custom premium nail art and luxury finish.",
      price: "1,499",
      duration: "60–90 min",
      image: "/images/nailart.jpg"
    },
    // ── Brows, Lashes & Men's Grooming ──
    {
      id: "eyebrow-threading",
      title: "Eyebrow Threading",
      category: "grooming",
      description: "Ultra-clean thread shaping for sharp, beautifully defined brow arches.",
      price: "150",
      duration: "15 min",
      image: "/images/Eyebrow threading.png"
    },
    {
      id: "eyelashes",
      title: "Eyelash Extensions",
      category: "grooming",
      description: "Premium individual eyelashes and volume extension services for a mesmerizing, natural look.",
      price: "999",
      duration: "60–90 min",
      image: "/images/Eyelash Extensions.png"
    },
    {
      id: "shaving",
      title: "Shaving & Beard Styling",
      category: "grooming",
      description: "Traditional hot towel shave, beard detailing, precision edging, and skin hydration.",
      price: "399",
      duration: "30–45 min",
      image: "/images/Shaving & Beard Styling.png"
    },
    // ── Waxing & Smooth Skin Care ──
    {
      id: "body-waxing",
      title: "Body Waxing",
      category: "waxing",
      description: "Full-body smooth waxing treatment using soothing organic wax formulated for sensitive skin.",
      price: "1,999",
      duration: "45–75 min",
      image: "/images/Body Waxing.png"
    },
    {
      id: "waxing",
      title: "Facial Waxing",
      category: "waxing",
      description: "Fast, gentle precision waxing for upper lip, chin, and full face by experienced estheticians.",
      price: "299",
      duration: "20–30 min",
      image: "/images/Facial Waxing.png"
    },
  ];

  // ── Helpers ──
  const totalPrice = selectedServices.reduce((sum, title) => {
    const service = servicesData.find((s) => s.title === title);
    if (!service?.price) return sum;
    return sum + parseInt(service.price.replace(/,/g, ""), 10);
  }, 0);

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
            <span className="hero-badge-tag">GLAM'MORE EXPERIENCES</span>
            <h1 className="hero-main-title">Luxury Beauty & Styling Collections</h1>
            <p className="hero-intro-text">
              Immerse yourself in our curated luxury treatment menu. From bespoke bridal artistry to signature hair extensions and revitalizing spa rituals, explore our complete service offerings below.
            </p>
          </div>

          <div className="hero-banner-image-container">
            <img
              src="/images/Salon seating area.jpeg"
              alt="Glammore Salon Experience"
              className="hero-banner-image"
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
                    <img
                      src={category.bannerImage}
                      alt={category.name}
                      className="banner-image"
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
                              <img src={service.image} alt={service.title} />
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
                              {service.price && (
                                <span className="sub-service-price">₹{service.price}</span>
                              )}
                            </div>
                            <p className="sub-service-desc">{service.description}</p>
                            {service.duration && (
                              <span className="sub-service-duration">
                                <FaClock size={11} /> {service.duration}
                              </span>
                            )}
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
              {selectedServices.length} service{selectedServices.length !== 1 ? "s" : ""} selected · Est. ₹{totalPrice.toLocaleString("en-IN")}
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
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={{ before: new Date() }}
                className="luxury-calendar"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="drawer-label">Time Slot (8:30 AM – 8:00 PM)</label>
            <div className="input-with-icon">
              <FaClock className="input-icon" />
              <input
                type="time"
                name="time"
                min="08:30"
                max="20:00"
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

          {totalPrice > 0 && (
            <div className="drawer-total">
              <span className="drawer-total-label">Estimated Total</span>
              <span className="drawer-total-price">₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
          )}

          <button type="submit" className="btn-luxury drawer-submit-btn">
            Confirm via WhatsApp <span className="btn-luxury-hover-effect" />
          </button>
        </form>
      </aside>

      <Footer />
    </>
  );
}

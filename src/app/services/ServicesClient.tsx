"use client";
import "./services.css";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaTimes, FaClock, FaUser, FaPlus, FaCheck, FaCalendarAlt, FaMagic, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";

import { categoryMetaList, servicesData } from "@/lib/services-data";
import { servicePageForService } from "@/lib/service-pages";

const WHATSAPP_NUMBER = "919645915329";

// The picked services live in this tab's session storage, so leaving for a service page and coming back keeps them.
const SELECTION_KEY = "glammore:selected-services";

const toDateString = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function ServicesClient() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectionRestored, setSelectionRestored] = useState(false);
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

  // Restore after the first render (not during it) so the server and browser markup match.
  // Storage can be blocked (private mode), so every access is guarded.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(SELECTION_KEY) ?? "[]");
      if (Array.isArray(saved)) {
        const known = new Set(servicesData.map((s) => s.title));
        const valid = saved.filter((t): t is string => typeof t === "string" && known.has(t));
        // Browser-only storage can't seed the initial state without a server/browser mismatch, so it is read after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (valid.length > 0) setSelectedServices(valid);
      }
    } catch {
      /* no saved selection */
    }
    setSelectionRestored(true);
  }, []);

  useEffect(() => {
    if (!selectionRestored) return;
    try {
      if (selectedServices.length > 0) sessionStorage.setItem(SELECTION_KEY, JSON.stringify(selectedServices));
      else sessionStorage.removeItem(SELECTION_KEY);
    } catch {
      /* storage unavailable: the page still works, it just won't remember */
    }
  }, [selectedServices, selectionRestored]);

  const filterCategories = [
    { id: "all", name: "All Services" },
    { id: "hair", name: "Women's Hair" },
    { id: "events", name: "Bride & Groom" },
    { id: "skin", name: "Facials & Skin Care" },
    { id: "spa", name: "Spa & Massage" },
    { id: "nails", name: "Nails" },
    { id: "brows", name: "Brows & Lashes" },
    { id: "mens", name: "Men's Grooming" },
    { id: "waxing", name: "Waxing" },
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
    setSelectedServices([]);
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
          {/* Same layout as the category banners: photo on the left, text on the right */}
          <div className="category-feature-banner banner-image-left">
            <div className="banner-image-wrapper">
              <Image
                src="/images/salon-interior.jpeg"
                alt="Bright salon interior with a teal accent wall and wooden panelling"
                className="banner-image hero-photo-fill fill-img"
                width={1080}
                height={1920}
                preload
                sizes="(max-width: 768px) 100vw, 480px"
              />
              <div className="banner-image-gradient" />
            </div>

            <div className="banner-text-content">
              <h1 className="banner-category-title">Salon Services in Thiruvalla</h1>
              <p className="banner-intro-paragraph">
                Hair, bridal makeup, facials, massage, nails and grooming for men and women, booked on WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* ── CATEGORY FILTER NAVIGATION ── */}
        <nav className="category-filter-nav">
          <ul className="filter-pill-list">
            {filterCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={(e) => {
                    setCategoryFilter(cat.id);
                    // On phones the pills sit in one swipeable row: bring the chosen one into view.
                    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                    e.currentTarget.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" });
                  }}
                  aria-pressed={categoryFilter === cat.id}
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
                      alt=""
                      aria-hidden="true"
                      className="img-backdrop fill-img"
                      width={64}
                      height={64}
                      sizes="64px"
                    />
                    <Image
                      src={category.bannerImage}
                      alt={category.name}
                      className="banner-image fill-img"
                      width={1536}
                      height={1024}
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
                      const detailPage = servicePageForService(service);
                      // A tap anywhere on the card picks the service; only the heading text leaves the page.
                      // Keyboard users pick with the add button (its click reaches this handler) and follow the link separately.
                      return (
                        <div
                          key={service.id}
                          className={`sub-service-card ${isSelected ? "selected" : ""}`}
                          onClick={() => handleToggleService(service.title)}
                        >
                          <div className="sub-service-image-box">
                            {service.image ? (
                              <Image
                                src={service.image}
                                alt={service.title}
                                className="fill-img"
                                width={1136}
                                height={1408}
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                              />
                            ) : (
                              <div className="sub-service-placeholder" />
                            )}
                            <button
                              type="button"
                              className="sub-service-add-btn"
                              aria-pressed={isSelected}
                              aria-label={isSelected ? `Remove ${service.title}` : `Add ${service.title}`}
                            >
                              {isSelected ? <FaCheck size={13} /> : <FaPlus size={13} />}
                            </button>
                          </div>

                          <div className="sub-service-info">
                            <div className="sub-service-title-row">
                              <h3 className="sub-service-title">
                                {detailPage ? (
                                  <Link
                                    href={`/services/${detailPage.slug}`}
                                    className="sub-service-title-link"
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label={`${service.title}: read more`}
                                  >
                                    {service.title}
                                    <FaArrowRight className="sub-service-title-arrow" aria-hidden="true" />
                                  </Link>
                                ) : (
                                  service.title
                                )}
                              </h3>
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
      <aside data-lenis-prevent className={`booking-drawer ${isDrawerOpen ? "open" : ""}`}>
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
              <FaCalendarAlt style={{ display: "inline", marginRight: 6, color: "var(--gold)" }} />
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
              <span className="input-icon" style={{ fontSize: 14 }}>
                <FaPhoneAlt aria-hidden="true" />
              </span>
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

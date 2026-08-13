"use client";
import "./services.css";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaTimes, FaClock, FaUser, FaPlus, FaCheck } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";

const WHATSAPP_NUMBER = "919645915329";

interface ServiceItem {
  id: string;
  title: string;
  category: "hair" | "nails" | "grooming" | "skin" | "events";
  description: string;
  price?: string;
  duration?: string;
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

  const categories = [
    { id: "all", name: "All Collections" },
    { id: "hair", name: "Hair Styling" },
    { id: "nails", name: "Nail Care" },
    { id: "grooming", name: "Grooming & Waxing" },
    { id: "skin", name: "Skin & Wellness" },
    { id: "events", name: "Weddings & Events" },
  ];

  const servicesData: ServiceItem[] = [
    // ── Weddings & Events ──────────────────────────────────────────────────
    {
      id: "bridal-services",
      title: "Bridal services",
      category: "events",
      description: "Luxury comprehensive Kerala bridal makeup, hair styling, and wellness treatments tailored for your special wedding day in Thiruvalla.",
      price: "9,999",
      duration: "4–6 hrs",
    },
    {
      id: "wedding-prep",
      title: "Wedding & event preparation",
      category: "events",
      description: "Complete hair, skin, and styling packages for Kerala weddings and events — coordinated across the full bridal party.",
      price: "4,999",
      duration: "2–4 hrs",
    },
    {
      id: "makeup-services",
      title: "Make-up services",
      category: "events",
      description: "Flawless HD and airbrush makeup styles for celebrity shoots, family events, and parties.",
      price: "2,499",
      duration: "60–90 min",
    },
    // ── Hair Styling ───────────────────────────────────────────────────────
    {
      id: "hair-extensions",
      title: "Hair extensions",
      category: "hair",
      description: "100% natural, premium human hair extensions for length, volume, and custom styling, professionally fitted.",
      price: "5,999",
      duration: "2–3 hrs",
    },
    {
      id: "hairstyling",
      title: "Hairstyling",
      category: "hair",
      description: "Luxury blowouts, elegant updos, and custom event hairstyling for all hair types.",
      price: "799",
      duration: "45–60 min",
    },
    {
      id: "haircut",
      title: "Haircut",
      category: "hair",
      description: "Precision styling, trend-forward haircuts, and expert hair texturizing by master stylists.",
      price: "499",
      duration: "30–45 min",
    },
    // ── Nail Care ──────────────────────────────────────────────────────────
    {
      id: "acrylic-nails",
      title: "Acrylic nails",
      category: "nails",
      description: "High-quality, durable acrylic extensions with custom premium nail art and luxury finish.",
      price: "1,499",
      duration: "60–90 min",
    },
    {
      id: "pedicures",
      title: "Pedicures",
      category: "nails",
      description: "Revitalizing foot spa therapy, organic scrub exfoliation, and precision nail care.",
      price: "799",
      duration: "45–60 min",
    },
    // ── Skin & Wellness ────────────────────────────────────────────────────
    {
      id: "spa-services",
      title: "Spa services",
      category: "skin",
      description: "Premium wellness packages, full-body body scrub therapies, and stress relief.",
      price: "2,499",
      duration: "90 min",
    },
    {
      id: "massages",
      title: "Massages",
      category: "skin",
      description: "Deep tissue, aromatherapy, and muscle relief massages in our quiet wellness spa.",
      price: "1,799",
      duration: "60 min",
    },
    // ── Grooming & Waxing ──────────────────────────────────────────────────
    {
      id: "eyebrow-threading",
      title: "Eyebrow threading",
      category: "grooming",
      description: "Precision eyebrow threading for ultra-clean, beautifully defined brow contours by expert beauticians.",
      price: "150",
      duration: "15 min",
    },
    {
      id: "eyelashes",
      title: "Eyelash extensions",
      category: "grooming",
      description: "Premium individual eyelashes and volume extension services for a mesmerizing, natural look.",
      price: "999",
      duration: "60–90 min",
    },
    {
      id: "body-waxing",
      title: "Body waxing",
      category: "grooming",
      description: "Full body smooth waxing treatment using premium, gentle organic wax for delicate skin.",
      price: "1,999",
      duration: "45–75 min",
    },
    {
      id: "waxing",
      title: "Facial waxing",
      category: "grooming",
      description: "Fast, gentle precision waxing for facial grooming — upper lip, chin, and full face — by experienced professionals.",
      price: "299",
      duration: "20–30 min",
    },
    {
      id: "shaving",
      title: "Shaving & beard styling",
      category: "grooming",
      description: "Traditional hot towel classic shave, beard detailing, shaping, and skin hydration for men.",
      price: "399",
      duration: "30–45 min",
    },
  ];

  // ── Helpers ──────────────────────────────────────────────────────────────

  const totalPrice = selectedServices.reduce((sum, title) => {
    const service = servicesData.find((s) => s.title === title);
    if (!service?.price) return sum;
    return sum + parseInt(service.price.replace(/,/g, ""), 10);
  }, 0);

  const handleToggleService = (serviceTitle: string) => {
    // functional update avoids stale-closure over selectedServices
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
    // functional update avoids stale-closure over bookingDetails
    setBookingDetails((prev) => ({ ...prev, date: date ? toDateString(date) : "" }));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
    // clear error on change
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

    // Inline validation — no alert()
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

  return (
    <>
      <Navbar />

      <main className="menu-page">
        {/* EDITORIAL HEADER */}
        <header className="menu-header">
          <p className="subtitle-elegant">Curated Treatments</p>
          <h1 className="menu-title">The Collection</h1>
        </header>

        {/* LAYOUT GRID */}
        <div className="menu-layout">
          
          {/* CATEGORY SIDEBAR */}
          <aside className="menu-sidebar">
            <ul className="category-list">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`category-link ${categoryFilter === cat.id ? "active" : ""}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* SERVICES LIST */}
          <section className="menu-items-container">
            {categories
              .filter(cat => cat.id !== "all" && (categoryFilter === "all" || categoryFilter === cat.id))
              .map(category => {
                const catServices = servicesData.filter(s => s.category === category.id);
                if (catServices.length === 0) return null;

                return (
                  <div key={category.id} className="menu-category-section">
                    <h2 className="category-section-title">{category.name}</h2>
                    <div className="menu-list">
                      {catServices.map((service) => {
                        const isSelected = selectedServices.includes(service.title);
                        return (
                          <div
                            key={service.id}
                            className={`menu-row ${isSelected ? "selected" : ""}`}
                            onClick={() => handleToggleService(service.title)}
                            role="button"
                            aria-pressed={isSelected}
                          >
                            <div className="menu-row-content">
                              <div className="menu-row-header">
                                <h3>{service.title}</h3>
                                {service.price && (
                                  <span className="menu-row-price">from ₹{service.price}</span>
                                )}
                              </div>
                              <p className="menu-row-desc">{service.description}</p>
                              {service.duration && (
                                <span className="menu-row-duration">
                                  <FaClock size={11} /> {service.duration}
                                </span>
                              )}
                            </div>

                            <div className="menu-row-action">
                              {isSelected ? <FaCheck size={14} /> : <FaPlus size={14} />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
            })}
          </section>
        </div>
      </main>

      {/* FLOATING BOOKING PILL */}
      <div className={`booking-pill-container ${selectedServices.length > 0 ? "visible" : ""}`}>
        <div className="booking-pill" onClick={() => setIsDrawerOpen(true)}>
          <div className="booking-pill-text">
            <span className="count">
              {selectedServices.length} service{selectedServices.length !== 1 ? "s" : ""} · est. ₹{totalPrice.toLocaleString("en-IN")}
            </span>
            <span className="label">Book Appointment</span>
          </div>
          <div className="booking-pill-icon">⟶</div>
        </div>
      </div>

      {/* SLIDE-OUT BOOKING DRAWER */}
      <div className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={() => setIsDrawerOpen(false)}></div>
      <aside className={`booking-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <button className="drawer-close" onClick={() => setIsDrawerOpen(false)}>
          <FaTimes />
        </button>

        <h2 className="drawer-title">Schedule Visit</h2>
        
        {selectedServices.length > 0 && (
          <div className="drawer-services">
            <p className="drawer-label">Selected Services</p>
            <div className="drawer-tags">
              {selectedServices.map(s => (
                <span key={s} className="drawer-tag">
                  {s} <FaTimes className="remove-tag" onClick={() => handleRemoveService(s)} />
                </span>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleBookingSubmit} className="drawer-form" noValidate>
          <div className="form-group">
            <label className="drawer-label">Date</label>
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
            <label className="drawer-label">Time (8:30 AM – 8:00 PM)</label>
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
              placeholder="Any notes for your stylist?"
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
            Confirm via WhatsApp <span className="btn-luxury-hover-effect"></span>
          </button>
        </form>
      </aside>

      <Footer />
    </>
  );
}

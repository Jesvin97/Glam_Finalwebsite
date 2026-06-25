"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaCheckCircle, FaTimes, FaClock, FaUser, FaChevronRight, FaChevronLeft, FaWhatsapp } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";



interface ServiceItem {
  id: string;
  title: string;
  category: "hair" | "nails" | "grooming" | "skin" | "events";
  description: string;
  image: string;
  price?: string;
}

export default function ServicesClient() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wizardStep, setWizardStep] = useState<number>(1);
  // Date Helpers
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    date: getTodayDateString(),
    time: "",
    message: "",
  });

  const categories = [
    { id: "all", name: "All Services" },
    { id: "hair", name: "Hair Styling" },
    { id: "nails", name: "Nail Care" },
    { id: "grooming", name: "Grooming & Waxing" },
    { id: "skin", name: "Skin & Wellness" },
    { id: "events", name: "Weddings & Events" },
  ];

  const servicesData: ServiceItem[] = [
    {
      id: "acrylic-nails",
      title: "Acrylic nails",
      category: "nails",
      description: "High-quality, durable acrylic extensions with custom premium nail art and luxury finish at Thiruvalla's top beauty and nail salon.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=80",
      price: "1,499",
    },
    {
      id: "body-waxing",
      title: "Body waxing",
      category: "grooming",
      description: "Full body smooth waxing treatment using premium, gentle organic wax for delicate skin, available in Thiruvalla, Kerala.",
      image: "https://images.unsplash.com/photo-1590439471364-192aa707f685?auto=format&fit=crop&w=500&q=80",
      price: "1,999",
    },
    {
      id: "bridal-services",
      title: "Bridal services",
      category: "events",
      description: "Luxury comprehensive Kerala bridal makeup, hair styling, and wellness treatments tailored for your special wedding day in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1591555200999-7c531495e921?auto=format&fit=crop&w=500&q=80",
      price: "9,999",
    },
    {
      id: "eyebrow-threading",
      title: "Eyebrow shaping & threading",
      category: "grooming",
      description: "Precision eyebrow threading for ultra-clean, beautifully defined brow contours by expert beauticians in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80",
      price: "149",
    },
    {
      id: "eyelashes",
      title: "Eyelashes",
      category: "grooming",
      description: "Premium individual eyelashes and volume extension services for a mesmerizing, natural look in Thiruvalla, Kerala.",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=500&q=80",
      price: "999",
    },
    {
      id: "hair-extensions",
      title: "Hair extensions",
      category: "hair",
      description: "100% natural, premium human hair extensions for length, volume, and custom styling, professionally fitted in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=500&q=80",
      price: "5,999",
    },
    {
      id: "haircut",
      title: "Haircut",
      category: "hair",
      description: "Precision styling, trend-forward haircuts, and expert hair texturizing for men, women, and kids by master stylists in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=500&q=80",
      price: "499",
    },
    {
      id: "hairstyling",
      title: "Hairstyling",
      category: "hair",
      description: "Luxury blowouts, elegant updos, and custom event hairstyling for all hair types at Thiruvalla's leading unisex salon.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80",
      price: "799",
    },
    {
      id: "makeup-services",
      title: "Make-up services",
      category: "events",
      description: "Flawless HD and airbrush makeup styles for celebrity shoots, family events, and parties by professional makeup artists in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=500&q=80",
      price: "2,499",
    },
    {
      id: "massages",
      title: "Massages",
      category: "skin",
      description: "Deep tissue, aromatherapy, and muscle relief massages in our quiet wellness spa in Thukalassery, Thiruvalla.",
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=500&q=80",
      price: "1,799",
    },
    {
      id: "pedicures",
      title: "Pedicures",
      category: "nails",
      description: "Revitalizing foot spa therapy, organic scrub exfoliation, and precision nail care at our premium Thiruvalla nail studio.",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=500&q=80",
      price: "799",
    },
    {
      id: "shaving",
      title: "Shaving",
      category: "grooming",
      description: "Traditional hot towel classic shave, beard detailing, styling, and skin hydration for men in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80",
      price: "299",
    },
    {
      id: "spa-services",
      title: "Spa services",
      category: "skin",
      description: "Premium wellness packages, full-body body scrub therapies, and premium stress relief at the best unisex spa in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80",
      price: "2,499",
    },
    {
      id: "waxing",
      title: "Waxing",
      category: "grooming",
      description: "Fast, gentle precision waxing for facial and body grooming by experienced professionals in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1590439471364-192aa707f685?auto=format&fit=crop&w=500&q=80",
      price: "399",
    },
    {
      id: "wedding-prep",
      title: "Wedding and event preparation",
      category: "events",
      description: "Complete hair, skin, and styling packages for Kerala weddings and events in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80",
      price: "4,999",
    },
  ];

  const handleToggleService = (serviceTitle: string) => {
    if (selectedServices.includes(serviceTitle)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceTitle));
    } else {
      setSelectedServices([...selectedServices, serviceTitle]);
    }
  };

  const handleRemoveService = (serviceTitle: string) => {
    setSelectedServices(selectedServices.filter((s) => s !== serviceTitle));
  };

  const handleClearSelection = () => {
    setSelectedServices([]);
    setWizardStep(1);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      setBookingDetails((prev) => ({ ...prev, date: dateStr }));
    } else {
      setBookingDetails((prev) => ({ ...prev, date: "" }));
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
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
    if (selectedServices.length === 0) {
      alert("Please select at least one service before proceeding.");
      return;
    }

    if (!bookingDetails.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!bookingDetails.time) {
      alert("Please select a time slot.");
      return;
    }

    // Date validation
    if (bookingDetails.date) {
      const todayStr = getTodayDateString();
      if (bookingDetails.date < todayStr) {
        alert("Appointment date cannot be in the past.");
        return;
      }
    }

    // Time validation (8:30 AM to 8 PM)
    if (bookingDetails.time) {
      const [hours, minutes] = bookingDetails.time.split(":").map(Number);
      if (hours < 8 || (hours === 8 && minutes < 30) || hours > 20 || (hours === 20 && minutes > 0)) {
        alert("Appointments can only be booked between 8:30 AM and 8:00 PM.");
        return;
      }
    }

    const phoneNumber = "919645915329";
    const servicesList = selectedServices.map((s) => `- ${s}`).join("\n");

    const text = `Hello Glam'more Salon,

I would like to book a luxury session for the following services:
${servicesList}

Name: ${bookingDetails.name}
Preferred Date: ${bookingDetails.date}
Preferred Time: ${formatTimeTo12Hour(bookingDetails.time)}
Message/Special Requests: ${bookingDetails.message || "None"}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, "_blank");
  };

  const getTranslatedService = (id: string, defaultTitle: string, defaultDesc: string) => {
    return { title: defaultTitle, description: defaultDesc };
  };

  const filteredServices = servicesData.filter((service) => {
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <main className="services-page">
        <header className="services-page-header">
          <h1 style={{ fontSize: "54px", textTransform: "uppercase", letterSpacing: "4px", margin: "0 0 20px", fontFamily: "var(--font-cormorant-family), serif", fontWeight: "700" }}>
            Services
          </h1>
          <p className="services-subtitle">
            Explore our curated list of beauty and wellness services.
          </p>
        </header>

        {/* STEP INDICATOR FOR WIZARD */}
        {selectedServices.length > 0 && (
          <div className="wizard-step-progress" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', fontWeight: wizardStep === 1 ? '700' : '400', color: wizardStep === 1 ? '#dfba49' : '#888', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: wizardStep === 1 ? '2px solid #dfba49' : 'none', paddingBottom: '4px' }}>
              1. "Select Services"
            </span>
            <FaChevronRight size={10} style={{ color: '#555' }} />
            <span style={{ fontSize: '13px', fontWeight: wizardStep === 2 ? '700' : '400', color: wizardStep === 2 ? '#dfba49' : '#888', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: wizardStep === 2 ? '2px solid #dfba49' : 'none', paddingBottom: '4px' }}>
              2. "Schedule & Stylists"
            </span>
            <FaChevronRight size={10} style={{ color: '#555' }} />
            <span style={{ fontSize: '13px', fontWeight: wizardStep === 3 ? '700' : '400', color: wizardStep === 3 ? '#dfba49' : '#888', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: wizardStep === 3 ? '2px solid #dfba49' : 'none', paddingBottom: '4px' }}>
              3. "Confirm Package"
            </span>
          </div>
        )}

        {/* STEP 1: SERVICES SELECTOR */}
        {wizardStep === 1 && (
          <>
            <section className="services-controls">
              <div className="search-bar-wrapper">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="category-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`category-tab-btn ${categoryFilter === cat.id ? "active" : ""}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </section>

            <section className="services-layout">
              <div className="services-page-grid">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => {
                    const isSelected = selectedServices.includes(service.title);
                    const localInfo = getTranslatedService(service.id, service.title, service.description);
                    return (
                      <div
                        key={service.id}
                        className={`service-showcase-card ${isSelected ? "selected" : ""}`}
                        onClick={() => handleToggleService(service.title)}
                        style={{ position: 'relative' }}
                      >
                        <div className="service-card-image-wrapper">
                          <img src={service.image} alt={localInfo.title} />
                          {isSelected && (
                            <div className="card-selected-badge">
                              <FaCheckCircle /> "Selected"
                            </div>
                          )}
                        </div>
                        
                        <div className="service-card-info">
                          <h3>{localInfo.title}</h3>
                          <p>{localInfo.description}</p>
                          
                          <div className="card-action-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                            {service.price && (
                              <span className="service-price-badge" style={{ color: '#dfba49', fontWeight: 'bold', fontSize: '15px', fontFamily: 'var(--font-cormorant-family), serif' }}>
                                `Starting from `${service.price}
                              </span>
                            )}
                            <button
                              type="button"
                              className={`card-select-btn ${isSelected ? "selected-btn" : ""}`}
                              style={{ margin: 0 }}
                            >
                              {isSelected 
                                ? "Remove" 
                                : "Add"
                              }
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-services-found">
                    <p>No services matched your search criteria.</p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* STEP 2: SCHEDULING */}
        {wizardStep === 2 && (
          <section className="wizard-step-section" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
            <div className="wizard-card-layout" style={{ background: '#121212', borderRadius: '24px', border: '1px solid rgba(223, 186, 73, 0.15)', padding: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-cormorant-family), serif', color: '#dfba49', fontSize: '32px', marginBottom: '30px', textAlign: 'center' }}>
                "Schedule Appointment"
              </h2>

              <div className="wizard-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }}>
                {/* Left Side: Interactive Calendar & Time Slots */}
                <div className="wizard-left-pane">
                  <div className="calendar-wrapper" style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', alignSelf: 'flex-start', marginBottom: '10px' }}>
                      1. "Select Appointment Date"
                    </label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={{ before: new Date() }}
                      className="rounded-lg border border-neutral-800 bg-[#0e0e0e] text-white p-4"
                      captionLayout="dropdown"
                      startMonth={new Date()}
                      endMonth={new Date(new Date().getFullYear() + 2, 11)}
                    />
                  </div>

                  <div className="time-selector-wrapper">
                    <label style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', display: 'block', marginBottom: '10px' }}>
                      2. "Preferred Timing (8:30 AM - 8 PM)"
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: '16px', color: '#dfba49' }}><FaClock /></span>
                      <input
                        type="time"
                        name="time"
                        min="08:30"
                        max="20:00"
                        value={bookingDetails.time}
                        onChange={handleFormChange}
                        required
                        style={{
                          width: '100%',
                          padding: '16px 16px 16px 46px',
                          background: '#0a0a0a',
                          border: '1px solid rgba(223, 186, 73, 0.2)',
                          color: '#fff',
                          borderRadius: '12px',
                          fontSize: '15px'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Form Fields */}
                <div className="wizard-right-pane">
                  <div className="form-fields-wrapper">
                    <label style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', display: 'block', marginBottom: '10px' }}>
                      3. "Guest Details"
                    </label>
                    
                    <div className="input-group" style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ position: 'absolute', left: '16px', color: '#dfba49' }}><FaUser /></span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={bookingDetails.name}
                        onChange={handleFormChange}
                        required
                        style={{
                          width: '100%',
                          padding: '16px 16px 16px 46px',
                          background: '#0a0a0a',
                          border: '1px solid rgba(223, 186, 73, 0.2)',
                          color: '#fff',
                          borderRadius: '12px',
                          fontSize: '15px'
                        }}
                      />
                    </div>

                    <textarea
                      name="message"
                      placeholder="Any special requests or notes (optional)"
                      value={bookingDetails.message}
                      onChange={handleFormChange}
                      style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '16px',
                        background: '#0a0a0a',
                        border: '1px solid rgba(223, 186, 73, 0.2)',
                        color: '#fff',
                        borderRadius: '12px',
                        fontSize: '15px',
                        resize: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="wizard-navigation-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <button
                  type="button"
                  onClick={() => setWizardStep(1)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  <FaChevronLeft size={10} /> "Back to Services"
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!bookingDetails.name.trim()) {
                      alert("Please enter your name.");
                      return;
                    }
                    if (!bookingDetails.time) {
                      alert("Please select an appointment time slot.");
                      return;
                    }
                    setWizardStep(3);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #dfba49, #bca154)',
                    border: 'none',
                    color: '#000',
                    padding: '14px 34px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '700'
                  }}
                >
                  "Confirm Package Details" <FaChevronRight size={10} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* STEP 3: FINAL REVIEW & WHATSAPP REDIRECT */}
        {wizardStep === 3 && (
          <section className="wizard-step-section" style={{ maxWidth: '650px', margin: '0 auto', padding: '0 20px' }}>
            <div className="wizard-card-layout" style={{ background: '#121212', borderRadius: '24px', border: '1px solid rgba(223, 186, 73, 0.15)', padding: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-cormorant-family), serif', color: '#dfba49', fontSize: '32px', marginBottom: '10px', textAlign: 'center' }}>
                "Confirm Your Package"
              </h2>
              <p style={{ color: '#888', fontSize: '13px', textAlign: 'center', marginBottom: '30px' }}>
                "Please review your appointment summary below before compiling it to WhatsApp."
              </p>

              <div className="review-summary-details" style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#0a0a0a', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '16px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>
                    "Selected Services"
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                    {selectedServices.map((s) => (
                      <span key={s} style={{ background: 'rgba(223, 186, 73, 0.1)', border: '1px solid rgba(223, 186, 73, 0.2)', color: '#dfba49', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '500' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>
                      "Appointment Date"
                    </span>
                    <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>
                      {bookingDetails.date}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>
                      "Appointment Time"
                    </span>
                    <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>
                      {formatTimeTo12Hour(bookingDetails.time)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>
                      "Guest Name"
                    </span>
                    <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>
                      {bookingDetails.name}
                    </span>
                  </div>
                </div>

                {bookingDetails.message && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>
                      "Special Requests"
                    </span>
                    <span style={{ color: '#ccc', fontSize: '13px', fontStyle: 'italic' }}>
                      &quot;{bookingDetails.message}&quot;
                    </span>
                  </div>
                )}
              </div>

              {/* WHATSAPP ADVISORY ALERT BOX */}
              <div className="whatsapp-advisory-alert" style={{
                background: 'rgba(223, 186, 73, 0.04)',
                border: '1px solid rgba(223, 186, 73, 0.15)',
                borderRadius: '16px',
                padding: '18px 20px',
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <span style={{ color: '#dfba49', fontSize: '18px', lineHeight: 1 }}>💬</span>
                <div style={{ fontSize: '13px', color: '#bbb', lineHeight: '1.5' }}>
                  <strong>Booking via WhatsApp</strong>
                  <p style={{ margin: '4px 0 0', color: '#999' }}>
                    {"Your booking request will open directly in WhatsApp. Our representative will verify real-time salon availability and confirm your booking shortly."}
                  </p>
                </div>
              </div>

              {/* Navigation Action Rows */}
              <div className="wizard-navigation-actions" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    padding: '14px 24px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  <FaChevronLeft size={10} /> "Edit Details"
                </button>

                <button
                  type="button"
                  onClick={handleBookingSubmit}
                  style={{
                    background: '#25D366',
                    border: 'none',
                    color: '#fff',
                    padding: '14px 34px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '14px',
                    fontWeight: '700',
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)'
                  }}
                >
                  <FaWhatsapp size={16} /> "Book Via WhatsApp"
                </button>
              </div>
            </div>
          </section>
        )}

        {/* PERSISTENT FLOATING BOTTOM PANEL (STEP 1 ONLY) */}
        {selectedServices.length > 0 && wizardStep === 1 && (
          <aside className="booking-bottom-panel">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                "Selected Package"
              </span>
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#dfba49', marginTop: '2px' }}>
                {selectedServices.length} {selectedServices.length === 1 ? "Service" : "Services"}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleClearSelection}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#aaa',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                "Reset"
              </button>
              
              <button
                onClick={() => setWizardStep(2)}
                style={{
                  background: 'linear-gradient(135deg, #dfba49, #bca154)',
                  border: 'none',
                  color: '#000',
                  padding: '10px 24px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                "Next Step" <FaChevronRight size={10} />
              </button>
            </div>
          </aside>
        )}
      </main>

      <Footer />
    </>
  );
}

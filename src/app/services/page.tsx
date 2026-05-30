"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaCheckCircle, FaTimes, FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";

interface ServiceItem {
  id: string;
  title: string;
  category: "hair" | "nails" | "grooming" | "skin" | "events";
  description: string;
  image: string;
  price?: string;
}

export default function ServicesPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Booking Form State
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    date: "",
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
      description: "High-quality, durable acrylic extensions with custom premium nail art and luxury finish.",
      image: "/images/nail-polish .jpeg",
    },
    {
      id: "body-waxing",
      title: "Body waxing",
      category: "grooming",
      description: "Full body smooth waxing treatment using premium, gentle organic wax for delicate skin.",
      image: "/images/spa-area.jpeg",
    },
    {
      id: "bridal-services",
      title: "Bridal services",
      category: "events",
      description: "Luxury comprehensive hair, makeup and wellness treatments tailored for your special day.",
      image: "/images/model.jpeg",
    },
    {
      id: "eyebrow-shaping",
      title: "Eyebrow shaping",
      category: "grooming",
      description: "Professional eyebrow mapping and precision shaping to perfectly frame your face.",
      image: "/images/model2.jpeg",
    },
    {
      id: "eyebrow-threading",
      title: "Eyebrow threading",
      category: "grooming",
      description: "Precision threading for ultra-clean, beautifully defined brow contours.",
      image: "/images/model2.jpeg",
    },
    {
      id: "eyelashes",
      title: "Eyelashes",
      category: "grooming",
      description: "Premium individual lashes or volume extensions for a mesmerizing, natural look.",
      image: "/images/model.jpeg",
    },
    {
      id: "hair-extensions",
      title: "Hair extensions",
      category: "hair",
      description: "100% natural, premium human hair extensions for length, volume, and style.",
      image: "/images/model.jpeg",
    },
    {
      id: "haircut",
      title: "Haircut",
      category: "hair",
      description: "Precision styling, trend-forward cuts and expert hair texturizing by master stylists.",
      image: "/images/male model.jpeg",
    },
    {
      id: "hairstyling",
      title: "Hairstyling",
      category: "hair",
      description: "Luxury blowouts, elegant updos, and custom event hairstyling for all hair types.",
      image: "/images/model.jpeg",
    },
    {
      id: "makeup-services",
      title: "Make-up services",
      category: "events",
      description: "Flawless HD and airbrush makeup styles for celebrity shoots, events and parties.",
      image: "/images/model2.jpeg",
    },
    {
      id: "massages",
      title: "Massages",
      category: "skin",
      description: "Deep tissue, aromatherapy, and muscle relief massages in our quiet wellness spa.",
      image: "/images/spa-area.jpeg",
    },
    {
      id: "mobile-salon",
      title: "Mobile salon service",
      category: "events",
      description: "Experience luxury pampering, styling, and groom treatments at your doorstep.",
      image: "/images/Salon seating area.jpeg",
    },
    {
      id: "pedicures",
      title: "Pedicures",
      category: "nails",
      description: "Revitalizing foot spa therapy, organic scrub, and precision nail care.",
      image: "/images/nail-polish .jpeg",
    },
    {
      id: "shampoo-conditioning",
      title: "Shampoo & conditioning",
      category: "hair",
      description: "Deep cleansing hair wash paired with organic hydration conditioning treatment.",
      image: "/images/reception-area.jpeg",
    },
    {
      id: "shaving",
      title: "Shaving",
      category: "grooming",
      description: "Traditional hot towel classic shave, beard styling, and skin hydration.",
      image: "/images/male model.jpeg",
    },
    {
      id: "skincare",
      title: "Skin care",
      category: "skin",
      description: "Advanced facials, organic peels, and custom hydration therapies for glowing skin.",
      image: "/images/model2.jpeg",
    },
    {
      id: "spa-services",
      title: "Spa services",
      category: "skin",
      description: "Premium wellness packages, full-body therapies, and premium stress relief.",
      image: "/images/spa-area.jpeg",
    },
    {
      id: "waxing",
      title: "Waxing",
      category: "grooming",
      description: "Fast, gentle precision waxing for facial and body grooming.",
      image: "/images/spa-area.jpeg",
    },
    {
      id: "wedding-prep",
      title: "Wedding and event preparation",
      category: "events",
      description: "Complete hair, skin, and styling packages for events and special guests.",
      image: "/images/model.jpeg",
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
  };

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      alert("Please select at least one service before proceeding.");
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

    // Time validation (9 AM to 7 PM)
    if (bookingDetails.time) {
      const [hours, minutes] = bookingDetails.time.split(":").map(Number);
      if (hours < 9 || hours > 19 || (hours === 19 && minutes > 0)) {
        alert("Appointments can only be booked between 9:00 AM and 7:00 PM.");
        return;
      }
    }

    const formatTimeTo12Hour = (timeStr: string) => {
      if (!timeStr) return "";
      const [hoursStr, minutesStr] = timeStr.split(":");
      let hours = Number(hoursStr);
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutesStr} ${ampm}`;
    };

    const phoneNumber = "919645915329";
    const servicesList = selectedServices.map((s) => `- ${s}`).join("\n");

    const text = `Hello Glammore Salon,

I would like to book a premium comfort session for the following services:
${servicesList}

Name: ${bookingDetails.name}
Preferred Date: ${bookingDetails.date}
Preferred Time: ${formatTimeTo12Hour(bookingDetails.time)}
Message: ${bookingDetails.message || "None"}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, "_blank");
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
          <p className="services-tag">OUR SERVICES</p>
          <h1>
            Luxury Beauty &
            <span className="gold-text"> Services Showcase</span>
          </h1>
          <p className="services-subtitle">
            Select multiple services below to build your customized pampering package.
          </p>
        </header>

        {/* CONTROLS */}
        <section className="services-controls">
          <div className="search-bar-wrapper">
            <input
              type="text"
              placeholder="Search services (e.g. Nails, Haircut...)"
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

        {/* SERVICES LAYOUT */}
        <section className="services-layout">
          <div className="services-page-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => {
                const isSelected = selectedServices.includes(service.title);
                return (
                  <div
                    key={service.id}
                    className={`service-showcase-card ${isSelected ? "selected" : ""}`}
                    onClick={() => handleToggleService(service.title)}
                  >
                    <div className="service-card-image-wrapper">
                      <img src={service.image} alt={service.title} />
                      {isSelected && (
                        <div className="card-selected-badge">
                          <FaCheckCircle /> Selected
                        </div>
                      )}
                    </div>
                    
                    <div className="service-card-info">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      
                      <div className="card-action-row">
                        <button
                          type="button"
                          className={`card-select-btn ${isSelected ? "selected-btn" : ""}`}
                        >
                          {isSelected ? "Remove Service" : "Add to Booking"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-services-found">
                <p>No services matched your search criteria. Please try another query.</p>
              </div>
            )}
          </div>

          {/* DYNAMIC FLOATING BOOKING BOTTOM PANEL */}
          {selectedServices.length > 0 && (
            <aside className="booking-bottom-panel">
              {/* LEFT COLUMN: SELECTIONS */}
              <div className="booking-panel-left">
                <div className="booking-sidebar-header">
                  <h2>Your Selections</h2>
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="clear-all-btn"
                  >
                    Clear All ({selectedServices.length})
                  </button>
                </div>

                {/* SELECTED TAGS */}
                <div className="selected-tags-container">
                  {selectedServices.map((s) => (
                    <span className="selected-tag" key={s}>
                      {s}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveService(s);
                        }}
                        className="remove-tag-btn"
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: BOOKING FORM */}
              <div className="booking-panel-right">
                <form onSubmit={handleBookingSubmit} className="booking-sidebar-form">
                  <h3>Confirm Appointment</h3>
                  
                  <div className="booking-form-row">
                    <div className="input-group">
                      <span className="input-icon"><FaUser /></span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={bookingDetails.name}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="input-group">
                      <span className="input-icon"><FaCalendarAlt /></span>
                      <input
                        type="date"
                        name="date"
                        min={getTodayDateString()}
                        value={bookingDetails.date}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="input-group">
                      <span className="input-icon"><FaClock /></span>
                      <input
                        type="time"
                        name="time"
                        min="09:00"
                        max="19:00"
                        value={bookingDetails.time}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group textarea-group">
                    <textarea
                      name="message"
                      placeholder="Preferred Stylist or Special Instructions..."
                      value={bookingDetails.message}
                      onChange={handleFormChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="booking-submit-btn">
                    Book now
                  </button>
                </form>
              </div>
            </aside>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

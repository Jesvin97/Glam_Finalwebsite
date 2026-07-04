"use client";
import "./services.css";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaTimes, FaClock, FaUser, FaPlus, FaCheck } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";

interface ServiceItem {
  id: string;
  title: string;
  category: "hair" | "nails" | "grooming" | "skin" | "events";
  description: string;
  price?: string;
}

export default function ServicesClient() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  
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
    { id: "all", name: "All Collections" },
    { id: "hair", name: "Hair Styling" },
    { id: "nails", name: "Nail Care" },
    { id: "grooming", name: "Grooming & Waxing" },
    { id: "skin", name: "Skin & Wellness" },
    { id: "events", name: "Weddings & Events" },
  ];

  const servicesData: ServiceItem[] = [
    {
      id: "bridal-services",
      title: "Bridal services",
      category: "events",
      description: "Luxury comprehensive Kerala bridal makeup, hair styling, and wellness treatments tailored for your special wedding day in Thiruvalla.",
      price: "9,999",
    },
    {
      id: "makeup-services",
      title: "Make-up services",
      category: "events",
      description: "Flawless HD and airbrush makeup styles for celebrity shoots, family events, and parties.",
      price: "2,499",
    },
    {
      id: "hair-extensions",
      title: "Hair extensions",
      category: "hair",
      description: "100% natural, premium human hair extensions for length, volume, and custom styling, professionally fitted.",
      price: "5,999",
    },
    {
      id: "hairstyling",
      title: "Hairstyling",
      category: "hair",
      description: "Luxury blowouts, elegant updos, and custom event hairstyling for all hair types.",
      price: "799",
    },
    {
      id: "haircut",
      title: "Haircut",
      category: "hair",
      description: "Precision styling, trend-forward haircuts, and expert hair texturizing by master stylists.",
      price: "499",
    },
    {
      id: "acrylic-nails",
      title: "Acrylic nails",
      category: "nails",
      description: "High-quality, durable acrylic extensions with custom premium nail art and luxury finish.",
      price: "1,499",
    },
    {
      id: "pedicures",
      title: "Pedicures",
      category: "nails",
      description: "Revitalizing foot spa therapy, organic scrub exfoliation, and precision nail care.",
      price: "799",
    },
    {
      id: "spa-services",
      title: "Spa services",
      category: "skin",
      description: "Premium wellness packages, full-body body scrub therapies, and stress relief.",
      price: "2,499",
    },
    {
      id: "massages",
      title: "Massages",
      category: "skin",
      description: "Deep tissue, aromatherapy, and muscle relief massages in our quiet wellness spa.",
      price: "1,799",
    },
    {
      id: "body-waxing",
      title: "Body waxing",
      category: "grooming",
      description: "Full body smooth waxing treatment using premium, gentle organic wax for delicate skin.",
      price: "1,999",
    },
    {
      id: "eyelashes",
      title: "Eyelashes",
      category: "grooming",
      description: "Premium individual eyelashes and volume extension services for a mesmerizing, natural look.",
      price: "999",
    }
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

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      setBookingDetails({ ...bookingDetails, date: `${year}-${month}-${day}` });
    } else {
      setBookingDetails({ ...bookingDetails, date: "" });
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
    if (!bookingDetails.name.trim() || !bookingDetails.time) {
      alert("Please enter your name and select a time slot.");
      return;
    }

    const phoneNumber = "919645915329";
    const servicesList = selectedServices.length > 0 
      ? selectedServices.map((s) => `- ${s}`).join("\n")
      : "- General Consultation";

    const text = `Hello Glam'more Salon,\n\nI would like to book an appointment for:\n${servicesList}\n\nName: ${bookingDetails.name}\nDate: ${bookingDetails.date}\nTime: ${formatTimeTo12Hour(bookingDetails.time)}\nMessage: ${bookingDetails.message || "None"}`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
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
                            className={`menu-row ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleToggleService(service.title)}
                          >
                            <div className="menu-row-content">
                              <div className="menu-row-header">
                                <h3>{service.title}</h3>
                                {service.price && <span className="menu-row-price">from ₹{service.price}</span>}
                              </div>
                              <p className="menu-row-desc">{service.description}</p>
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
      <div className={`booking-pill-container ${selectedServices.length > 0 ? 'visible' : ''}`}>
        <div className="booking-pill" onClick={() => setIsDrawerOpen(true)}>
          <div className="booking-pill-text">
            <span className="count">{selectedServices.length} Selected</span>
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

        <form onSubmit={handleBookingSubmit} className="drawer-form">
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
            <label className="drawer-label">Time (8:30 AM - 8:00 PM)</label>
            <div className="input-with-icon">
              <FaClock className="input-icon" />
              <input type="time" name="time" min="08:30" max="20:00" value={bookingDetails.time} onChange={handleFormChange} required className="luxury-input" />
            </div>
          </div>

          <div className="form-group">
            <label className="drawer-label">Full Name</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input type="text" name="name" placeholder="Enter your name" value={bookingDetails.name} onChange={handleFormChange} required className="luxury-input" />
            </div>
          </div>

          <div className="form-group">
            <label className="drawer-label">Special Requests</label>
            <textarea name="message" placeholder="Any notes for your stylist?" value={bookingDetails.message} onChange={handleFormChange} className="luxury-input textarea"></textarea>
          </div>

          <button type="submit" className="btn-luxury w-full mt-4" style={{ textAlign: 'center', width: '100%' }}>
            Confirm via WhatsApp <span className="btn-luxury-hover-effect"></span>
          </button>
        </form>
      </aside>

      <Footer />
    </>
  );
}

"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaCheckCircle, FaTimes, FaClock, FaUser, FaChevronRight, FaChevronLeft, FaWhatsapp } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from "@/components/LanguageContext";

interface ServiceItem {
  id: string;
  title: string;
  category: "hair" | "nails" | "grooming" | "skin" | "events";
  description: string;
  image: string;
  price?: string;
}

export default function ServicesClient() {
  const { t, language } = useLanguage();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [selectedStylist, setSelectedStylist] = useState<string>("any");

  // Date Helpers
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Booking Form State
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    date: getTodayDateString(),
    time: "",
    message: "",
  });

  const categories = [
    { id: "all", name: language === "en" ? "All Services" : "എല്ലാ സേവനങ്ങളും" },
    { id: "hair", name: language === "en" ? "Hair Styling" : "ഹെയർ സ്റ്റൈലിംഗ്" },
    { id: "nails", name: language === "en" ? "Nail Care" : "നഖ പരിചരണം" },
    { id: "grooming", name: language === "en" ? "Grooming & Waxing" : "ഗ്രൂമിംഗ് & വാക്സിംഗ്" },
    { id: "skin", name: language === "en" ? "Skin & Wellness" : "സ്കിൻ & വെൽനസ്" },
    { id: "events", name: language === "en" ? "Weddings & Events" : "വിവാഹങ്ങൾ & ഇവന്റുകൾ" },
  ];

  const stylists = [
    { id: "any", name: language === "en" ? "Any Available Specialist" : "ലഭ്യമായ ഏതെങ്കിലും സ്റ്റൈലിസ്റ്റ്", role: language === "en" ? "Optimal scheduling flexibility" : "പെട്ടെന്ന് ബുക്കിംഗ് ലഭിക്കാൻ" },
    { id: "anju", name: "Anju S.", role: language === "en" ? "Master Bridal Makeup & Skin Aesthetics" : "മാസ്റ്റർ ബ്രൈഡൽ മേക്കപ്പ് സ്പെഷ്യലിസ്റ്റ്" },
    { id: "remya", name: "Remya K.", role: language === "en" ? "Senior Nail Art & Extensions Specialist" : "സീനിയർ നെയിൽ ആർട്ട് വിദഗ്ദ്ധ" },
    { id: "rahul", name: "Rahul V.", role: language === "en" ? "Master Hair Sculptor & Styling Director" : "മാസ്റ്റർ ഹെയർ സ്റ്റൈലിസ്റ്റ്" },
  ];

  const getSpecialistNameForCategory = (category: string) => {
    switch (category) {
      case "nails": return "Remya K.";
      case "hair": return "Rahul V.";
      case "events": return "Anju S.";
      default: return "Anju / Rahul";
    }
  };

  const servicesData: ServiceItem[] = [
    {
      id: "acrylic-nails",
      title: "Acrylic nails",
      category: "nails",
      description: "High-quality, durable acrylic extensions with custom premium nail art and luxury finish at Thiruvalla's top beauty and nail salon.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "body-waxing",
      title: "Body waxing",
      category: "grooming",
      description: "Full body smooth waxing treatment using premium, gentle organic wax for delicate skin, available in Thiruvalla, Kerala.",
      image: "https://images.unsplash.com/photo-1590439471364-192aa707f685?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "bridal-services",
      title: "Bridal services",
      category: "events",
      description: "Luxury comprehensive Kerala bridal makeup, hair styling, and wellness treatments tailored for your special wedding day in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1591555200999-7c531495e921?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "eyebrow-threading",
      title: "Eyebrow threading",
      category: "grooming",
      description: "Precision eyebrow threading for ultra-clean, beautifully defined brow contours by expert beauticians in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "eyelashes",
      title: "Eyelashes",
      category: "grooming",
      description: "Premium individual eyelashes and volume extension services for a mesmerizing, natural look in Thiruvalla, Kerala.",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "hair-extensions",
      title: "Hair extensions",
      category: "hair",
      description: "100% natural, premium human hair extensions for length, volume, and custom styling, professionally fitted in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "haircut",
      title: "Haircut",
      category: "hair",
      description: "Precision styling, trend-forward haircuts, and expert hair texturizing for men, women, and kids by master stylists in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "hairstyling",
      title: "Hairstyling",
      category: "hair",
      description: "Luxury blowouts, elegant updos, and custom event hairstyling for all hair types at Thiruvalla's leading unisex salon.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "makeup-services",
      title: "Make-up services",
      category: "events",
      description: "Flawless HD and airbrush makeup styles for celebrity shoots, family events, and parties by professional makeup artists in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "massages",
      title: "Massages",
      category: "skin",
      description: "Deep tissue, aromatherapy, and muscle relief massages in our quiet wellness spa in Thukalassery, Thiruvalla.",
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "pedicures",
      title: "Pedicures",
      category: "nails",
      description: "Revitalizing foot spa therapy, organic scrub exfoliation, and precision nail care at our premium Thiruvalla nail studio.",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "shaving",
      title: "Shaving",
      category: "grooming",
      description: "Traditional hot towel classic shave, beard detailing, styling, and skin hydration for men in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "spa-services",
      title: "Spa services",
      category: "skin",
      description: "Premium wellness packages, full-body body scrub therapies, and premium stress relief at the best unisex spa in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "waxing",
      title: "Waxing",
      category: "grooming",
      description: "Fast, gentle precision waxing for facial and body grooming by experienced professionals in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1590439471364-192aa707f685?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "wedding-prep",
      title: "Wedding and event preparation",
      category: "events",
      description: "Complete hair, skin, and styling packages for Kerala weddings and events in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
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
      alert(language === "en" ? "Please select at least one service before proceeding." : "ദയവായി കുറഞ്ഞത് ഒരു സേവനമെങ്കിലും തിരഞ്ഞെടുക്കുക.");
      return;
    }

    if (!bookingDetails.name.trim()) {
      alert(language === "en" ? "Please enter your name." : "ദയവായി നിങ്ങളുടെ പേര് നൽകുക.");
      return;
    }

    if (!bookingDetails.time) {
      alert(language === "en" ? "Please select a time slot." : "ദയവായി സമയം തിരഞ്ഞെടുക്കുക.");
      return;
    }

    // Date validation
    if (bookingDetails.date) {
      const todayStr = getTodayDateString();
      if (bookingDetails.date < todayStr) {
        alert(language === "en" ? "Appointment date cannot be in the past." : "ബുക്കിംഗ് തീയതി കഴിഞ്ഞുപോയതാകരുത്.");
        return;
      }
    }

    // Time validation (9 AM to 7 PM)
    if (bookingDetails.time) {
      const [hours, minutes] = bookingDetails.time.split(":").map(Number);
      if (hours < 9 || hours > 19 || (hours === 19 && minutes > 0)) {
        alert(language === "en" ? "Appointments can only be booked between 9:00 AM and 7:00 PM." : "സേവനങ്ങൾ രാവിലെ 9:00 നും വൈകുന്നേരം 7:00 നും ഇടയിൽ മാത്രമേ ലഭ്യമാകൂ.");
        return;
      }
    }

    const selectedStylistObj = stylists.find(s => s.id === selectedStylist);
    const stylistInfo = selectedStylistObj ? `${selectedStylistObj.name} (${selectedStylistObj.role})` : "Any Available Specialist";

    const phoneNumber = "919645915329";
    const servicesList = selectedServices.map((s) => `- ${s}`).join("\n");

    const text = `Hello Glam'more Salon,

I would like to book a luxury session for the following services:
${servicesList}

Name: ${bookingDetails.name}
Preferred Date: ${bookingDetails.date}
Preferred Time: ${formatTimeTo12Hour(bookingDetails.time)}
Stylist/Specialist: ${stylistInfo}
Message/Special Requests: ${bookingDetails.message || "None"}`;

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
          <h1 style={{ fontSize: "54px", textTransform: "uppercase", letterSpacing: "4px", margin: "0 0 20px", fontFamily: "var(--font-cormorant-family), serif", fontWeight: "700" }}>
            {t("servicesTitle")}
          </h1>
          <p className="services-subtitle">
            {t("servicesSubtitle")}
          </p>
        </header>

        {/* STEP INDICATOR FOR WIZARD */}
        {selectedServices.length > 0 && (
          <div className="wizard-step-progress" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', fontWeight: wizardStep === 1 ? '700' : '400', color: wizardStep === 1 ? '#dfba49' : '#888', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: wizardStep === 1 ? '2px solid #dfba49' : 'none', paddingBottom: '4px' }}>
              1. {language === "en" ? "Select Services" : "സേവനങ്ങൾ"}
            </span>
            <FaChevronRight size={10} style={{ color: '#555' }} />
            <span style={{ fontSize: '13px', fontWeight: wizardStep === 2 ? '700' : '400', color: wizardStep === 2 ? '#dfba49' : '#888', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: wizardStep === 2 ? '2px solid #dfba49' : 'none', paddingBottom: '4px' }}>
              2. {language === "en" ? "Schedule & Stylists" : "തീയതി & സ്റ്റൈലിസ്റ്റ്"}
            </span>
            <FaChevronRight size={10} style={{ color: '#555' }} />
            <span style={{ fontSize: '13px', fontWeight: wizardStep === 3 ? '700' : '400', color: wizardStep === 3 ? '#dfba49' : '#888', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: wizardStep === 3 ? '2px solid #dfba49' : 'none', paddingBottom: '4px' }}>
              3. {language === "en" ? "Confirm Package" : "കൺഫേം ചെയ്യുക"}
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
                  placeholder={t("searchPlaceholder")}
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
                    return (
                      <div
                        key={service.id}
                        className={`service-showcase-card ${isSelected ? "selected" : ""}`}
                        onClick={() => handleToggleService(service.title)}
                        style={{ position: 'relative' }}
                      >
                        <div className="service-card-image-wrapper">
                          <img src={service.image} alt={service.title} />
                          {isSelected && (
                            <div className="card-selected-badge">
                              <FaCheckCircle /> {language === "en" ? "Selected" : "തിരഞ്ഞെടുത്തു"}
                            </div>
                          )}
                          
                          {/* Premium Stylist Hover Preview Overlay */}
                          <div className="stylist-badge-overlay" style={{
                            position: 'absolute',
                            bottom: '12px',
                            left: '12px',
                            background: 'rgba(10, 10, 10, 0.85)',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            color: '#dfba49',
                            border: '1px solid rgba(223, 186, 73, 0.3)',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                          }}>
                            {language === "en" ? `Specialist: ${getSpecialistNameForCategory(service.category)}` : `വിദഗ്ദ്ധൻ: ${getSpecialistNameForCategory(service.category)}`}
                          </div>
                        </div>
                        
                        <div className="service-card-info">
                          <h3>{service.title}</h3>
                          <p>{service.description}</p>
                          
                          <div className="card-action-row">
                            <button
                              type="button"
                              className={`card-select-btn ${isSelected ? "selected-btn" : ""}`}
                            >
                              {isSelected 
                                ? (language === "en" ? "Remove Service" : "ഒഴിവാക്കുക") 
                                : (language === "en" ? "Add to Package" : "പാക്കേജിലേക്ക് ചേർക്കുക")
                              }
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-services-found">
                    <p>{language === "en" ? "No services matched your search criteria." : "സേവനങ്ങൾ ഒന്നും കണ്ടെത്താനായില്ല."}</p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* STEP 2: SCHEDULING & STYLIST SELECTOR */}
        {wizardStep === 2 && (
          <section className="wizard-step-section" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
            <div className="wizard-card-layout" style={{ background: '#121212', borderRadius: '24px', border: '1px solid rgba(223, 186, 73, 0.15)', padding: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-cormorant-family), serif', color: '#dfba49', fontSize: '32px', marginBottom: '30px', textAlign: 'center' }}>
                {language === "en" ? "Schedule & Select Stylists" : "തീയതിയും സ്റ്റൈലിസ്റ്റും തിരഞ്ഞെടുക്കുക"}
              </h2>

              <div className="wizard-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }}>
                {/* Left Side: Interactive Calendar & Time Slots */}
                <div className="wizard-left-pane">
                  <div className="calendar-wrapper" style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', alignSelf: 'flex-start', marginBottom: '10px' }}>
                      1. {language === "en" ? "Select Appointment Date" : "തീയതി തിരഞ്ഞെടുക്കുക"}
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
                      2. {language === "en" ? "Preferred Timing (9 AM - 7 PM)" : "സമയം തിരഞ്ഞെടുക്കുക (രാവിലെ 9 മുതൽ വൈകിട്ട് 7 വരെ)"}
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: '16px', color: '#dfba49' }}><FaClock /></span>
                      <input
                        type="time"
                        name="time"
                        min="09:00"
                        max="19:00"
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

                {/* Right Side: Stylist Grid List & Form Fields */}
                <div className="wizard-right-pane">
                  <div className="stylists-selector-wrapper" style={{ marginBottom: '30px' }}>
                    <label style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', display: 'block', marginBottom: '12px' }}>
                      3. {language === "en" ? "Assign Stylist Specialist" : "സ്റ്റൈലിസ്റ്റിനെ തിരഞ്ഞെടുക്കുക"}
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {stylists.map((st) => (
                        <div
                          key={st.id}
                          onClick={() => setSelectedStylist(st.id)}
                          style={{
                            padding: '12px 18px',
                            borderRadius: '12px',
                            border: `1.5px solid ${selectedStylist === st.id ? '#dfba49' : 'rgba(255, 255, 255, 0.05)'}`,
                            background: selectedStylist === st.id ? 'rgba(223, 186, 73, 0.06)' : '#0e0e0e',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px'
                          }}
                        >
                          <span style={{ color: selectedStylist === st.id ? '#dfba49' : '#fff', fontWeight: '600', fontSize: '14px' }}>
                            {st.name}
                          </span>
                          <span style={{ color: '#888', fontSize: '11px' }}>{st.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-fields-wrapper">
                    <label style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', display: 'block', marginBottom: '10px' }}>
                      4. {language === "en" ? "Guest Details" : "വിവരങ്ങൾ നൽകുക"}
                    </label>
                    
                    <div className="input-group" style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ position: 'absolute', left: '16px', color: '#dfba49' }}><FaUser /></span>
                      <input
                        type="text"
                        name="name"
                        placeholder={t("namePlace")}
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
                      placeholder={t("msgPlace")}
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
                  <FaChevronLeft size={10} /> {language === "en" ? "Back to Services" : "തിരികെ പോകുക"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!bookingDetails.name.trim()) {
                      alert(language === "en" ? "Please enter your name." : "ദയവായി നിങ്ങളുടെ പേര് നൽകുക.");
                      return;
                    }
                    if (!bookingDetails.time) {
                      alert(language === "en" ? "Please select an appointment time slot." : "ദയവായി സമയം തിരഞ്ഞെടുക്കുക.");
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
                  {language === "en" ? "Confirm Package Details" : "അടുത്ത പടി"} <FaChevronRight size={10} />
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
                {language === "en" ? "Confirm Your Package" : "പാക്കേജ് ഉറപ്പുവരുത്തുക"}
              </h2>
              <p style={{ color: '#888', fontSize: '13px', textAlign: 'center', marginBottom: '30px' }}>
                {language === "en" ? "Please review your appointment summary below before compiling it to WhatsApp." : "താഴെ നൽകിയിരിക്കുന്ന വിവരങ്ങൾ ശരിയാണോ എന്ന് പരിശോധിക്കുക."}
              </p>

              <div className="review-summary-details" style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#0a0a0a', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '16px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>
                    {language === "en" ? "Selected Services" : "തിരഞ്ഞെടുത്ത സേവനങ്ങൾ"}
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
                      {language === "en" ? "Appointment Date" : "ബുക്കിംഗ് തീയതി"}
                    </span>
                    <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>
                      {bookingDetails.date}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>
                      {language === "en" ? "Appointment Time" : "ബുക്കിംഗ് സമയം"}
                    </span>
                    <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>
                      {formatTimeTo12Hour(bookingDetails.time)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>
                      {language === "en" ? "Preferred Stylist" : "സ്റ്റൈലിസ്റ്റ്"}
                    </span>
                    <span style={{ color: '#dfba49', fontSize: '15px', fontWeight: '600' }}>
                      {stylists.find(s => s.id === selectedStylist)?.name || "Any Available Specialist"}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>
                      {language === "en" ? "Guest Name" : "കസ്റ്റമറുടെ പേര്"}
                    </span>
                    <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>
                      {bookingDetails.name}
                    </span>
                  </div>
                </div>

                {bookingDetails.message && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>
                      {language === "en" ? "Special Requests" : "പ്രത്യേക നിർദ്ദേശങ്ങൾ"}
                    </span>
                    <span style={{ color: '#ccc', fontSize: '13px', fontStyle: 'italic' }}>
                      &quot;{bookingDetails.message}&quot;
                    </span>
                  </div>
                )}
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
                  <FaChevronLeft size={10} /> {language === "en" ? "Edit Details" : "മാറ്റം വരുത്തുക"}
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
                  <FaWhatsapp size={16} /> {language === "en" ? "Book Via WhatsApp" : "വാട്സാപ്പ് വഴി ബുക്ക് ചെയ്യുക"}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* PERSISTENT FLOATING BOTTOM PANEL (STEP 1 ONLY) */}
        {selectedServices.length > 0 && wizardStep === 1 && (
          <aside className="booking-bottom-panel" style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'rgba(18, 18, 18, 0.85)',
            border: '1px solid rgba(223, 186, 73, 0.3)',
            borderRadius: '20px',
            backdropFilter: 'blur(16px)',
            padding: '20px 24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {language === "en" ? "Selected Package" : "തിരഞ്ഞെടുത്ത പാക്കേജ്"}
              </span>
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#dfba49', marginTop: '2px' }}>
                {selectedServices.length} {selectedServices.length === 1 ? (language === "en" ? "Service" : "സേവനം") : (language === "en" ? "Services" : "സേവനങ്ങൾ")}
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
                {language === "en" ? "Reset" : "റീസെറ്റ്"}
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
                {language === "en" ? "Next Step" : "അടുത്ത പടി"} <FaChevronRight size={10} />
              </button>
            </div>
          </aside>
        )}
      </main>

      <Footer />
    </>
  );
}

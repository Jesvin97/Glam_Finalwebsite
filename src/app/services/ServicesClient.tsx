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
    { id: "all", name: language === "en" ? "All Services" : "എല്ലാ സേവനങ്ങളും" },
    { id: "hair", name: language === "en" ? "Hair Styling" : "ഹെയർ സ്റ്റൈലിംഗ്" },
    { id: "nails", name: language === "en" ? "Nail Care" : "നഖ പരിചരണം" },
    { id: "grooming", name: language === "en" ? "Grooming & Waxing" : "ഗ്രൂമിംഗ് & വാക്സിംഗ്" },
    { id: "skin", name: language === "en" ? "Skin & Wellness" : "സ്കിൻ & വെൽനസ്" },
    { id: "events", name: language === "en" ? "Weddings & Events" : "വിവാഹങ്ങൾ & ഇവന്റുകൾ" },
  ];

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
    if (language !== "ml") return { title: defaultTitle, description: defaultDesc };

    const servicesTranslations: Record<string, { title: string; description: string }> = {
      "acrylic-nails": {
        title: "അക്രിലിക് നഖങ്ങൾ",
        description: "തിരുവല്ലയിലെ മുൻനിര ബ്യൂട്ടി ആൻഡ് നെയിൽ സലൂണിൽ പ്രീമിയം നെയിൽ ആർട്ടോടും അത്യാധുനിക ഫിനിഷിംഗോടും കൂടിയ അക്രിലിക് എക്സ്റ്റൻഷനുകൾ."
      },
      "body-waxing": {
        title: "ബോഡി വാക്സിംഗ്",
        description: "തിരുവല്ലയിൽ ലഭ്യമായ പ്രീമിയം ഓർഗാനിക് വാക്സ് ഉപയോഗിച്ചുള്ള പൂർണ്ണ ബോഡി സുഗമമായ വാക്സിംഗ് ട്രീറ്റ്മെന്റ്."
      },
      "bridal-services": {
        title: "ബ്രൈഡൽ സേവനങ്ങൾ",
        description: "നിങ്ങളുടെ പ്രത്യേക വിവാഹദിനത്തിനായി തിരുവല്ലയിൽ പ്രത്യേകമായി തയ്യാറാക്കിയ സമഗ്രമായ കേരള ബ്രൈഡൽ മേക്കപ്പ്, ഹെയർ സ്റ്റൈലിംഗ് സേവനങ്ങൾ."
      },
      "eyebrow-threading": {
        title: "ഐബ്രോ ത്രെഡിംഗ്",
        description: "തിരുവല്ലയിലെ വിദഗ്ദ്ധരായ ബ്യൂട്ടീഷ്യൻമാർ ചെയ്യുന്ന കൃത്യതയാർന്ന ഐബ്രോ ത്രെഡിംഗ് സേവനം."
      },
      "eyelashes": {
        title: "ഐലാഷ് എക്സ്റ്റൻഷനുകൾ",
        description: "മനോഹരവും സ്വാഭാവികവുമായ രൂപത്തിനായി പ്രീമിയം വ്യക്തിഗത ഐലാഷ് എക്സ്റ്റൻഷൻ സേവനങ്ങൾ."
      },
      "hair-extensions": {
        title: "ഹെയർ എക്സ്റ്റൻഷനുകൾ",
        description: "നീളത്തിനും വോളിയത്തിനുമായി പ്രൊഫഷണലായി ഘടിപ്പിച്ച 100% സ്വാഭാവിക ഹെയർ എക്സ്റ്റൻഷനുകൾ."
      },
      "haircut": {
        title: "ഹെയർകട്ട്",
        description: "തിരുവല്ലയിലെ മാസ്റ്റർ സ്റ്റൈലിസ്റ്റുകൾ ചെയ്യുന്ന പുരുഷന്മാർക്കും സ്ത്രീകൾക്കും കുട്ടികൾക്കുമുള്ള ട്രെൻഡിംഗ് ഹെയർകട്ടുകൾ."
      },
      "hairstyling": {
        title: "ഹെയർ സ്റ്റൈലിംഗ്",
        description: "തിരുവല്ലയിലെ പ്രമുഖ യൂണിസെക്സ് സലൂണിൽ എല്ലാത്തരം മുടികൾക്കുമായി ലേറ്റസ്റ്റ് ഹെയർ സ്റ്റൈലുകൾ."
      },
      "makeup-services": {
        title: "മേക്കപ്പ് സേവനങ്ങൾ",
        description: "വിവാഹങ്ങൾക്കും പാർട്ടികൾക്കുമായി പ്രൊഫഷണൽ മേക്കപ്പ് ആർട്ടിസ്റ്റുകൾ ചെയ്യുന്ന ഫ്ലാവ്‌ലെസ് എച്ച്ഡി, എയർബ്രഷ് മേക്കപ്പ്."
      },
      "massages": {
        title: "മസാജ് തെറാപ്പികൾ",
        description: "തിരുവല്ലയിലെ ഞങ്ങളുടെ വെൽനസ് സ്പായിൽ ലഭ്യമായ ഡീപ് ടിഷ്യൂ, അരോമാതെറാപ്പി റിലാക്സിംഗ് മസാജുകൾ."
      },
      "pedicures": {
        title: "പെഡിക്യൂറുകൾ",
        description: "ഞങ്ങളുടെ തിരുവല്ലയിലെ നെയിൽ സ്റ്റുഡിയോയിൽ ഫൂട്ട് സ്പാ തെറാപ്പിയും ഓർഗാനിക് സ്ക്രബ് എക്സ്ഫോളിയേഷനും."
      },
      "shaving": {
        title: "ഷേവിംഗ്",
        description: "പരമ്പരാഗത ഹോട്ട് ടവൽ ഷേവിംഗ്, ബിയർഡ് ഡിറ്റെയിലിംഗ്, ഹൈഡ്രേഷൻ ട്രീറ്റ്മെന്റ്."
      },
      "spa-services": {
        title: "സ്പാ സേവനങ്ങൾ",
        description: "തിരുവല്ലയിലെ ഏറ്റവും മികച്ച സ്പായിൽ ബോഡി സ്ക്രബ് തെറാപ്പികളും പ്രീമിയം സ്ട്രെസ് റിലീഫ് പാക്കേജുകളും."
      },
      "waxing": {
        title: "വാക്സിംഗ്",
        description: "വിദഗ്ദ്ധരായ പ്രൊഫഷണലുകൾ ചെയ്യുന്ന ഫേഷ്യൽ & ബോഡി ഹെയർ റിമൂവൽ വാക്സിംഗ് സേവനം."
      },
      "wedding-prep": {
        title: "വെഡ്ഡിംഗ് & ഇവന്റ് പ്രിപ്പറേഷൻ",
        description: "കേരള വിവാഹങ്ങൾക്കും ഇവന്റുകൾക്കുമായി ഹെയർ, സ്കിൻ, സ്റ്റൈലിംഗ് പാക്കേജുകൾ."
      }
    };

    return servicesTranslations[id] || { title: defaultTitle, description: defaultDesc };
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
                              <FaCheckCircle /> {language === "en" ? "Selected" : "തിരഞ്ഞെടുത്തു"}
                            </div>
                          )}
                        </div>
                        
                        <div className="service-card-info">
                          <h3>{localInfo.title}</h3>
                          <p>{localInfo.description}</p>
                          
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

        {/* STEP 2: SCHEDULING */}
        {wizardStep === 2 && (
          <section className="wizard-step-section" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
            <div className="wizard-card-layout" style={{ background: '#121212', borderRadius: '24px', border: '1px solid rgba(223, 186, 73, 0.15)', padding: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-cormorant-family), serif', color: '#dfba49', fontSize: '32px', marginBottom: '30px', textAlign: 'center' }}>
                {language === "en" ? "Schedule Appointment" : "തീയതിയും സമയവും തിരഞ്ഞെടുക്കുക"}
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

                {/* Right Side: Form Fields */}
                <div className="wizard-right-pane">
                  <div className="form-fields-wrapper">
                    <label style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', display: 'block', marginBottom: '10px' }}>
                      3. {language === "en" ? "Guest Details" : "വിവരങ്ങൾ നൽകുക"}
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
          <aside className="booking-bottom-panel">
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

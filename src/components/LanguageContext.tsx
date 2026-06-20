"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ml";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    home: "Home",
    about: "About Us",
    services: "Services",
    blogs: "Blogs",
    contact: "Contact Us",
    bookNow: "Book Now",
    // Hero
    heroTitle: "Luxury Salon Experience",
    heroSubtitle: "Step into a world where elegance, beauty, and luxury come together. Thiruvalla's leading destination for premium grooming, nail extensions, and bridal artistry.",
    exploreServices: "Explore Services",
    // About
    aboutTag: "ABOUT GLAM'MORE",
    aboutTitle: "Luxury Salon Experience",
    aboutDesc: "Step into a world where elegance, beauty and luxury come together. Our salon offers world-class beauty treatments, professional care, premium styling and personalized wellness experiences designed for modern beauty standards.",
    bookVisit: "Book Your Visit",
    // Contact
    contactTitle: "Contact Us",
    namePlace: "Your Name",
    msgPlace: "Your Message",
    sendMsg: "Send Message",
    // FAQ
    faqTitle: "Frequently Asked Questions",
    // Services general
    servicesTitle: "Our Services",
    servicesSubtitle: "Select multiple services below to build your customized pampering package.",
    searchPlaceholder: "Search services (e.g. Nails, Haircut...)",
  },
  ml: {
    // Nav
    home: "ഹോം",
    about: "ഞങ്ങളെക്കുറിച്ച്",
    services: "സേവനങ്ങൾ",
    blogs: "ബ്ലോഗുകൾ",
    contact: "കോൺടാക്ട്",
    bookNow: "ബുക്ക് ചെയ്യുക",
    // Hero
    heroTitle: "ലക്ഷ്വറി സലൂൺ അനുഭവം",
    heroSubtitle: "എലഗൻസും സൗന്ദര്യവും ലക്ഷ്വറിയും ഒത്തുചേരുന്ന ഒരു ലോകത്തിലേക്ക് സ്വാഗതം. പ്രീമിയം ഗ്രൂമിംഗ്, നെയിൽ ആർട്ട്, ബ്രൈഡൽ മേക്കപ്പ് എന്നിവയ്ക്കായി തിരുവല്ലയിലെ മികച്ച സലൂൺ.",
    exploreServices: "സേവനങ്ങൾ കാണുക",
    // About
    aboutTag: "ഗ്ലാംമോറിനെക്കുറിച്ച്",
    aboutTitle: "ലക്ഷ്വറി സലൂൺ അനുഭവം",
    aboutDesc: "സൗന്ദര്യവും ആഡംബരവും ഒത്തുചേരുന്ന ഗ്ലാംമോറിലേക്ക് സ്വാഗതം. ഞങ്ങൾ തിരുവല്ലയിൽ ലോകോത്തര ബ്യൂട്ടി ട്രീറ്റ്‌മെന്റുകൾ, പ്രൊഫഷണൽ ഹെയർ സ്റ്റൈലിംഗ്, ഉയർന്ന നിലവാരമുള്ള സ്കിൻ കെയർ സേവനങ്ങൾ എന്നിവ നൽകുന്നു.",
    bookVisit: "സന്ദർശനം ബുക്ക് ചെയ്യുക",
    // Contact
    contactTitle: "ഞങ്ങളുമായി ബന്ധപ്പെടുക",
    namePlace: "നിങ്ങളുടെ പേര്",
    msgPlace: "നിങ്ങളുടെ സന്ദേശം",
    sendMsg: "മെസ്സേജ് അയക്കുക",
    // FAQ
    faqTitle: "പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ",
    // Services general
    servicesTitle: "ഞങ്ങളുടെ സേവനങ്ങൾ",
    servicesSubtitle: "നിങ്ങൾക്ക് ആവശ്യമായ സേവനങ്ങൾ തിരഞ്ഞെടുത്ത് നിങ്ങളുടെ പാക്കേജ് സ്വയം തയ്യാറാക്കൂ.",
    searchPlaceholder: "സേവനങ്ങൾ തെരയുക (ഉദാ: നഖങ്ങൾ, കട്ടിംഗ്...)",
  },
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("glammore_lang") as Language;
    if (savedLang === "en" || savedLang === "ml") {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("glammore_lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

"use client";

import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import menuAnimation from "../../animation/navbar.json";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lottieRef = useRef<any>(null);
  const hasInitialized = useRef(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (!lottieRef.current) return;

    // On first render, go to frame 0 (hamburger state)
    if (!hasInitialized.current) {
      lottieRef.current.goToAndStop(0, true);
      hasInitialized.current = true;
      return;
    }

    if (isMenuOpen) {
      // Play forward: hamburger → X (frames 0 to 60)
      lottieRef.current.setDirection(1);
      lottieRef.current.setSpeed(2.5);
      lottieRef.current.play();
    } else {
      // Play reverse: X → hamburger (frames 60 to 0)
      lottieRef.current.setDirection(-1);
      lottieRef.current.setSpeed(2.5);
      lottieRef.current.play();
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">

        {/* LOGO */}
        <a href="/" className="logo-link navbar-logo-link">
          <img
            src="/images/logo.png"
            alt="Glam'more Logo"
            className="logo-image navbar-logo-img"
          />
          <span className="navbar-brand-text">
            Glam&apos;more Unisex Salon
          </span>
        </a>

        {/* HAMBURGER MENU - Lottie Animation */}
        <div className="hamburger" onClick={toggleMenu}>
          <Lottie
            lottieRef={lottieRef}
            animationData={menuAnimation}
            loop={false}
            autoplay={false}
            className="navbar-menu-icon"
          />
        </div>

        {/* NAVIGATION */}
        <ul className="nav-links">

          <li>
            <a href="/">{t("home")}</a>
          </li>

          <li>
            <a href="/#about">{t("about")}</a>
          </li>

          <li>
            <a href="/services">{t("services")}</a>
          </li>

          <li>
            <a href="/blogs">{t("blogs")}</a>
          </li>

          <li>
            <a href="/#contact">{t("contact")}</a>
          </li>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '20px' }}>
            <li className="lang-switcher-li" style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => setLanguage(language === "en" ? "ml" : "en")}
                style={{
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  color: '#dfba49',
                  padding: '5px 12px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px'
                }}
              >
                {language === "en" ? "ML" : "EN"}
              </button>
            </li>

            <li>
              <a href="/services" className="book-btn">
                {t("bookNow")}
              </a>
            </li>
          </div>

        </ul>

      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <a href="/" onClick={closeMenu}>{t("home")}</a>
        <a href="/#about" onClick={closeMenu}>{t("about")}</a>
        <a href="/services" onClick={closeMenu}>{t("services")}</a>
        <a href="/blogs" onClick={closeMenu}>{t("blogs")}</a>
        <a href="/#contact" onClick={closeMenu}>{t("contact")}</a>
        
        <button
          onClick={() => {
            setLanguage(language === "en" ? "ml" : "en");
            closeMenu();
          }}
          style={{
            background: 'none',
            border: '1px solid rgba(223, 186, 73, 0.3)',
            color: '#dfba49',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            cursor: 'pointer',
            margin: '10px 0',
            fontWeight: '600',
            width: 'fit-content'
          }}
        >
          🌐 {language === "en" ? "മലയാളം (ML)" : "English (EN)"}
        </button>

        <a href="/services" onClick={closeMenu} className="book-btn">{t("bookNow")}</a>
      </div>
    </>
  );
}
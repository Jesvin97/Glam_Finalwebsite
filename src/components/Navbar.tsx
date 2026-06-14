"use client";

import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import menuAnimation from "../../animation/navbar.json";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lottieRef = useRef<any>(null);
  const hasInitialized = useRef(false);

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
            <a href="/">Home</a>
          </li>

          <li>
            <a href="#about">About Us</a>
          </li>

          <li>
            <a href="/services">Services</a>
          </li>

          <li>
            <a href="/blogs">Blogs</a>
          </li>

          <li>
            <a href="#contact">Contact Us</a>
          </li>

          <li>
            <a href="/services" className="book-btn">
              Book Now
            </a>
          </li>

        </ul>

      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <a href="/" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About Us</a>
        <a href="/services" onClick={closeMenu}>Services</a>
        <a href="/blogs" onClick={closeMenu}>Blogs</a>
        <a href="#contact" onClick={closeMenu}>Contact Us</a>
        <a href="/services" onClick={closeMenu} className="book-btn">Book Now</a>
      </div>
    </>
  );
}
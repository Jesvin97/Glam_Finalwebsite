"use client";

import { useState, useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import menuAnimation from "../../animation/navbar.json";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
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
        <Link href="/" className="logo-link navbar-logo-link">
          <img
            src="/images/logo.png"
            alt="Glam'more Logo"
            className="logo-image navbar-logo-img"
          />
          <span className="navbar-brand-text">
            Glam&apos;more Unisex Salon
          </span>
        </Link>

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
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/#about">About Us</Link>
          </li>

          <li>
            <Link href="/services">Services</Link>
          </li>

          <li>
            <Link href="/blogs">Blogs</Link>
          </li>

          <li>
            <Link href="/#contact">Contact Us</Link>
          </li>

        </ul>

      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/#about" onClick={closeMenu}>About Us</Link>
        <Link href="/services" onClick={closeMenu}>Services</Link>
        <Link href="/blogs" onClick={closeMenu}>Blogs</Link>
        <Link href="/#contact" onClick={closeMenu}>Contact Us</Link>
        
      </div>
    </>
  );
}
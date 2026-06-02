"use client";

import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <a href="/" className="logo-link" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <img
            src="/images/logo.png"
            alt="Glam'more Logo"
            className="logo-image"
            style={{ width: "50px", height: "auto" }}
          />
          <span className="navbar-brand-text">
            Glam'more Unisex Salon
          </span>
        </a>

        {/* HAMBURGER MENU */}
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
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
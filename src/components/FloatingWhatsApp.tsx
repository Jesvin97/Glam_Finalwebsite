"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const whatsappNumber = "919645915329";
  const defaultMessage = encodeURIComponent("Hello Glam'more Salon! I would like to inquire about services.");

  return (
    <div className="floating_btn">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
        aria-label="Talk to us on WhatsApp"
      >
        <div className="contact_icon">
          <FaWhatsapp className="my-float" />
        </div>
      </a>
      <p className="text_icon">Talk to us?</p>
    </div>
  );
}

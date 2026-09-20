"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const whatsappNumber = "919645915329";
  const defaultMessage = encodeURIComponent("Hello Glam'more Salon! I would like to inquire about services.");

  const [bottomOffset, setBottomOffset] = useState(30);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // If footer is visible in viewport
      if (footerRect.top < viewportHeight) {
        const visibleFooterHeight = viewportHeight - footerRect.top;
        setBottomOffset(visibleFooterHeight + 20);
      } else {
        setBottomOffset(30);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className="floating_btn"
      style={{ bottom: `${bottomOffset}px` }}
    >
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


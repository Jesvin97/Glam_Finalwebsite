"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const whatsappNumber = "919645915329";
  const defaultMessage = encodeURIComponent("Hello Glam'more Salon! I would like to inquire about services.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-[99999] flex items-center justify-center w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:bg-[#22c35e] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer group"
    >
      {/* Clean solid white icon directly matching screenshot */}
      <FaWhatsapp className="w-8 h-8 sm:w-9 sm:h-9 text-white" />

      {/* Tooltip on hover */}
      <span className="absolute right-16 sm:right-20 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
        Chat with us
      </span>
    </a>
  );
}

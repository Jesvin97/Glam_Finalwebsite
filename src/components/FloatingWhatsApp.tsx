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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-[58px] h-[58px] bg-[#25D366] text-white rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] transition-all transform hover:scale-105 active:scale-95 animate-bounce cursor-pointer group"
    >
      {/* Outer subtle glow ring matching the screenshot */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-ping pointer-events-none" />
      
      {/* White WhatsApp Icon */}
      <FaWhatsapp className="w-8 h-8 text-white relative z-10" />

      {/* Tooltip on hover */}
      <span className="absolute right-16 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
        Chat with us
      </span>
    </a>
  );
}

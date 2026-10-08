"use client";

import { ScrollSplitCard } from "@/components/ui/scroll-split-card";

const CARDS = [
  {
    title: "Hair & Styling",
    description: "Cuts, colour, keratin and styling for women and men.",
    image: "/images/services/womens-haircut.jpg",
    imageAlt: "Stylist cutting a client's hair at Glam'more",
    bgColor: "#f3ead7",
    textColor: "#1a1408",
  },
  {
    title: "Bride & Groom",
    description: "Bridal and groom makeup, saree draping and wedding prep.",
    image: "/images/hero/hero-saree.jpg",
    imageAlt: "Bride in a cream and gold Kerala saree with jasmine flowers",
    bgColor: "#d4af37",
    textColor: "#1a1408",
  },
  {
    title: "Skin, Nails & Spa",
    description: "Facials, massage, gel and acrylic nails, threading and waxing.",
    image: "/images/services/facials.jpg",
    imageAlt: "Client enjoying a facial at Glam'more",
    bgColor: "#161616",
    textColor: "#f5d76e",
  },
];

// Scroll-driven: the salon photo splits into three panels and flips to show what we offer.
export default function SalonSplit() {
  return (
    <ScrollSplitCard
      className="h-[320vh]"
      imageSrc="/images/salon-split.webp"
      cards={CARDS}
      startText="Scroll to explore"
      endText="Everything for your best look, under one roof."
    />
  );
}

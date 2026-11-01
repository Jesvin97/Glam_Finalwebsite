import type { CategoryId } from "./services-data";

// One landing page per main service group, built from services-data.ts and faq-data.ts (no copy to keep in sync).
export interface ServicePage {
  slug: string;
  category: CategoryId;
  h1: string;
  shortName: string;
  title: string;
  description: string;
  /** FAQ topics (see faq-data.ts) shown on the page. */
  faqTopics: string[];
  /** Last time the page's content really changed; used in the sitemap. */
  updated: string;
}

export const servicePages: ServicePage[] = [
  {
    slug: "womens-hair",
    category: "hair",
    h1: "Women's Hair Salon in Thiruvalla",
    shortName: "Women's hair",
    title: "Women's Hair Salon in Thiruvalla | Glam'more Unisex Salon",
    description:
      "Women's haircuts, hair colour, keratin and smoothening, styling and hair extensions at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    faqTopics: ["Hair Cuts & Care", "Hair Colour", "Keratin & Hair Smoothening", "Hair Extensions"],
    updated: "2026-10-31",
  },
  {
    slug: "bridal-and-groom-makeup",
    category: "events",
    h1: "Bridal & Groom Makeup in Thiruvalla",
    shortName: "Bridal & groom makeup",
    title: "Bridal & Groom Makeup in Thiruvalla | Glam'more Unisex Salon",
    description:
      "Kerala bridal makeup in HD and airbrush, hairstyling, saree draping and groom styling at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    faqTopics: ["Bridal & Groom"],
    updated: "2026-10-31",
  },
  {
    slug: "facials-and-skin-care",
    category: "skin",
    h1: "Facials & Skin Care in Thiruvalla",
    shortName: "Facials & skin care",
    title: "Facials & De-tan in Thiruvalla | Glam'more Unisex Salon",
    description:
      "Facials, de-tan, clean-up and pre-bridal skin care matched to your skin type at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    faqTopics: ["Facials & De-tan"],
    updated: "2026-10-31",
  },
  {
    slug: "nails",
    category: "nails",
    h1: "Nail Salon in Thiruvalla",
    shortName: "Nails",
    title: "Nail Art, Gel & Acrylic Nails in Thiruvalla | Glam'more",
    description:
      "Acrylic nail extensions, nail art, gel manicures and spa pedicures at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    faqTopics: ["Nails"],
    updated: "2026-10-31",
  },
  {
    slug: "mens-grooming",
    category: "mens",
    h1: "Men's Grooming in Thiruvalla",
    shortName: "Men's grooming",
    title: "Men's Haircut & Beard Styling in Thiruvalla | Glam'more",
    description:
      "Men's haircuts, hot-towel shaves and beard shaping at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla. Open every day, 10 AM to 8:30 PM.",
    faqTopics: ["Men's Grooming"],
    updated: "2026-10-31",
  },
  {
    slug: "massage-and-spa",
    category: "spa",
    h1: "Massage & Spa in Thiruvalla",
    shortName: "Massage & spa",
    title: "Body & Head Massage in Thiruvalla | Glam'more Unisex Salon",
    description:
      "Body massage and head and shoulder massage in a private treatment room at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    faqTopics: ["Spa & Massage"],
    updated: "2026-10-31",
  },
];

export const servicePageBySlug = (slug: string) => servicePages.find((p) => p.slug === slug);
export const servicePageByCategory = (category: CategoryId) => servicePages.find((p) => p.category === category);

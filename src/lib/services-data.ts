// Single source of truth for the services page AND the structured data (JSON-LD) in the page head,
// so what visitors see and what search engines read can never drift apart.

export type CategoryId = "hair" | "events" | "skin" | "spa" | "nails" | "brows" | "mens" | "waxing";

export interface ServiceItem {
  id: string;
  title: string;
  category: CategoryId;
  description: string;
  image?: string;
}

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  bannerImage: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export const categoryMetaList: CategoryMeta[] = [
  {
    id: "hair",
    name: "Women's Haircuts, Colour & Hair Treatments",
    tagline: "Women's Hair Salon in Thiruvalla",
    description: "Women's haircuts, hair colouring, keratin and hair smoothening, occasion styling, and natural human hair extensions. Tell us how you wear your hair day to day and we'll cut and style for that.",
    bannerImage: "/images/Hair Styling & Extensions.png",
  },
  {
    id: "events",
    name: "Bride & Groom",
    tagline: "Bridal & Groom Makeup in Thiruvalla",
    description: "Kerala bridal makeup in HD and airbrush, hairstyling and saree draping for the bride, groom styling and makeup, and getting the whole wedding party ready on the day.",
    bannerImage: "/images/bridal.jpg",
  },
  {
    id: "skin",
    name: "Facials & Skin Care",
    tagline: "Facials in Thiruvalla",
    description: "Facials, de-tan, and clean-up treatments matched to your skin type, plus pre-bridal skin preparation in the weeks before a wedding.",
    bannerImage: "/images/services/facials-banner.jpg",
  },
  {
    id: "spa",
    name: "Spa & Massage",
    tagline: "Massage in Thiruvalla",
    description: "Body and head massages in a private treatment room, to ease muscle tension or simply to unwind.",
    bannerImage: "/images/services/spa-banner.jpg",
  },
  {
    id: "nails",
    name: "Nail Art, Manicure & Pedicure",
    tagline: "Nail Salon in Thiruvalla",
    description: "Acrylic nail extensions, nail art, gel manicures, and spa pedicures.",
    bannerImage: "/images/nailart.jpg",
  },
  {
    id: "brows",
    name: "Brows & Lashes",
    tagline: "Threading & Lash Extensions",
    description: "Eyebrow threading for clean, defined brows, and classic or volume eyelash extensions.",
    bannerImage: "/images/services/brows-lashes-banner.jpg",
  },
  {
    id: "mens",
    name: "Men's Grooming",
    tagline: "Haircuts, Shaves & Beard Styling",
    description: "Men's haircuts, hot-towel shaves, beard shaping and edging, and styling advice for a look that suits your face.",
    bannerImage: "/images/services/mens-grooming-banner.jpg",
  },
  {
    id: "waxing",
    name: "Waxing",
    tagline: "Body & Facial Waxing",
    description: "Full-body and facial waxing using wax suited to sensitive skin.",
    bannerImage: "/images/Waxing & Smooth Skin Care.png",
  },
];

export const servicesData: ServiceItem[] = [
  // ── Hair ──
  {
    id: "haircut",
    title: "Women's Haircut",
    category: "hair",
    description: "Women's haircuts planned around your hair texture and how much time you spend styling it.",
    image: "/images/services/womens-haircut.jpg"
  },
  {
    id: "hair-coloring",
    title: "Hair Colouring",
    category: "hair",
    description: "Global colour, highlights, and grey coverage, with a shade consultation first.",
    image: "/images/services/hair-colouring.jpg"
  },
  {
    id: "keratin-smoothening",
    title: "Keratin & Hair Smoothening",
    category: "hair",
    description: "Keratin and smoothening treatments to reduce frizz and make hair easier to manage.",
    image: "/images/services/keratin-smoothening.jpg"
  },
  {
    id: "hairstyling",
    title: "Hairstyling",
    category: "hair",
    description: "Blow-dries, updos, and styling for weddings, functions, and parties.",
    image: "/images/Hair_stylingjpeg.jpeg"
  },
  {
    id: "hair-extensions",
    title: "Hair Extensions",
    category: "hair",
    description: "Natural human hair extensions for added length or volume, colour-matched and fitted in the salon.",
    image: "/images/Hiar_extension.jpeg"
  },
  // ── Bridal & Makeup ──
  {
    id: "bridal-services",
    title: "Bridal Makeup",
    category: "events",
    description: "Kerala bridal makeup with hairstyling and saree draping, planned with you before the wedding day.",
    image: "/images/bridal.jpg"
  },
  {
    id: "wedding-prep",
    title: "Wedding & Event Preparation",
    category: "events",
    description: "Hair, makeup, and draping for the bride's family and bridal party, scheduled so everyone is ready on time.",
    image: "/images/model.jpeg"
  },
  {
    id: "groom-makeup",
    title: "Groom Makeup",
    category: "events",
    description: "Groom styling for the wedding day: hair, beard trim and shaping, and light, natural makeup for photos.",
    image: "/images/services/groom-makeup.jpg"
  },
  // ── Facials & Skin Care ──
  {
    id: "facials",
    title: "Facials",
    category: "skin",
    description: "Facials chosen for your skin type, whether dry, oily, or sensitive, including pre-bridal facial courses.",
    image: "/images/services/facials.jpg"
  },
  {
    id: "detan-cleanup",
    title: "De-tan & Clean-up",
    category: "skin",
    description: "De-tan packs and clean-ups to lift sun tan and clear congested skin.",
    image: "/images/services/detan-cleanup.jpg"
  },
  // ── Spa & Massage ──
  {
    id: "body-massage",
    title: "Body Massage",
    category: "spa",
    description: "Full-body relaxation massage with warm oil in a private room.",
    image: "/images/spa.jpg"
  },
  {
    id: "head-massage",
    title: "Head & Shoulder Massage",
    category: "spa",
    description: "A shorter massage focused on the scalp, neck, and shoulders.",
    image: "/images/services/head-massage-scalp.jpg"
  },
  // ── Nails ──
  {
    id: "gel-manicure",
    title: "Gel Manicure",
    category: "nails",
    description: "Cuticle care, shaping, and gel polish that lasts without chipping.",
    image: "/images/Gel Manicure.png"
  },
  {
    id: "pedicures",
    title: "Spa Pedicure",
    category: "nails",
    description: "Foot soak, scrub, callus care, nail shaping, and polish.",
    image: "/images/Spa pedicures.png"
  },
  {
    id: "acrylic-nails",
    title: "Acrylic Nails & Nail Art",
    category: "nails",
    description: "Acrylic nail extensions in your choice of length and shape, finished with custom nail art.",
    image: "/images/nailart.jpg"
  },
  // ── Brows & Lashes / Men's Grooming ──
  {
    id: "eyebrow-threading",
    title: "Eyebrow Threading",
    category: "brows",
    description: "Threading to shape and define your brows.",
    image: "/images/Eyebrow threading.png"
  },
  {
    id: "eyelashes",
    title: "Eyelash Extensions",
    category: "brows",
    description: "Classic and volume lash extensions, applied lash by lash.",
    image: "/images/Eyelash Extensions.png"
  },
  {
    id: "mens-haircut",
    title: "Men's Haircut",
    category: "mens",
    description: "Men's haircuts in your choice of style, finished with a clean neckline and styling advice.",
    image: "/images/services/mens-haircut.jpg"
  },
  {
    id: "shaving",
    title: "Shaving & Beard Styling",
    category: "mens",
    description: "Hot-towel shave, beard shaping, and edging, with advice on a beard style that suits your face.",
    image: "/images/Shaving & Beard Styling.png"
  },
  // ── Waxing ──
  {
    id: "body-waxing",
    title: "Body Waxing",
    category: "waxing",
    description: "Arms, legs, and full-body waxing using wax suited to sensitive skin.",
    image: "/images/Body Waxing.png"
  },
  {
    id: "waxing",
    title: "Facial Waxing",
    category: "waxing",
    description: "Upper lip, chin, and full-face waxing.",
    image: "/images/Facial Waxing.png"
  },
];

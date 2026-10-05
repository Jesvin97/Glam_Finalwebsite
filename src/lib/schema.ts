import {
  ADDRESS,
  ALTERNATE_NAMES,
  AREAS_SERVED,
  BUSINESS_NAME,
  GEO,
  HOURS,
  MAPS_URL,
  PHONE_E164,
  SITE_URL,
  SOCIAL_LINKS,
} from "./site";
import { categoryMetaList, servicesData } from "./services-data";

const SALON_ID = `${SITE_URL}/#salon`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Service catalogue built from the same data as the services page, grouped by category.
function offerCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Salon & Beauty Services",
    url: `${SITE_URL}/services`,
    itemListElement: categoryMetaList.map((cat) => ({
      "@type": "OfferCatalog",
      name: cat.name,
      url: `${SITE_URL}/services#category-${cat.id}`,
      itemListElement: servicesData
        .filter((s) => s.category === cat.id)
        .map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            category: cat.name,
            areaServed: "Thiruvalla, Kerala",
          },
        })),
    })),
  };
}

const salon = {
  "@type": "BeautySalon",
  "@id": SALON_ID,
  name: BUSINESS_NAME,
  alternateName: ALTERNATE_NAMES,
  description:
    "Premium unisex salon in Thukalassery, Thiruvalla, Kerala for women's and men's haircuts, hair colour, keratin and smoothening, bridal and groom makeup, facials, massage, nails, brows and lashes, and waxing.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: [
    `${SITE_URL}/images/og-image.jpg`,
    `${SITE_URL}/images/reception-area.jpg`,
    `${SITE_URL}/images/salon-interior.jpeg`,
  ],
  telephone: PHONE_E164,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_E164,
    contactType: "customer service",
    areaServed: "IN",
  },
  priceRange: "₹",
  address: { "@type": "PostalAddress", ...ADDRESS },
  geo: { "@type": "GeoCoordinates", ...GEO },
  hasMap: MAPS_URL,
  areaServed: AREAS_SERVED.map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: HOURS.opens,
    closes: HOURS.closes,
  },
  sameAs: SOCIAL_LINKS,
  hasOfferCatalog: offerCatalog(),
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: BUSINESS_NAME,
  inLanguage: "en-IN",
  publisher: { "@id": SALON_ID },
};

// Sitewide: the business and the website, linked by @id.
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [salon, website],
};

export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

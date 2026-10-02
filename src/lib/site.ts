// Business facts used by page metadata and structured data. Keep these in sync with the Google
// Business Profile: the exact same name, address and phone should appear everywhere.

export const SITE_URL = "https://glammoresalon.in";

// Matches the signboard. Alternate spellings people use are listed in `alternateName` in the schema.
export const BUSINESS_NAME = "Glam'more Premium Unisex Salon";
export const ALTERNATE_NAMES = ["Glam'more Unisex Salon", "Glammore Salon", "Glammore Unisex Salon"];

export const PHONE_E164 = "+919645915329";
export const PHONE_DISPLAY = "+91 96459 15329";

export const ADDRESS = {
  streetAddress: "First Floor, Professional Building, SH 1, Kollam - Theni Hwy, Thukalassery",
  addressLocality: "Thiruvalla",
  addressRegion: "Kerala",
  postalCode: "689115",
  addressCountry: "IN",
} as const;

export const GEO = { latitude: 9.371003, longitude: 76.578111 } as const;

export const MAPS_URL = "https://maps.app.goo.gl/XUFVqGPK9REuB6yf8";

export const SOCIAL_LINKS = [
  "https://www.instagram.com/glammore.unisex.salon",
  "https://www.facebook.com/glammoresalon/",
  "https://www.youtube.com/@Glammoreunisexsalon",
  MAPS_URL,
];

export const AREAS_SERVED = ["Thiruvalla", "Changanassery", "Chengannur", "Pathanamthitta"];

export const HOURS = { opens: "10:00", closes: "20:30" } as const;

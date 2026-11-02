// Business facts used by page metadata and structured data. Keep these in sync with the Google
// Business Profile: the exact same name, address and phone should appear everywhere.

export const SITE_URL = "https://www.glammoreunisexsalon.in";

// Matches the signboard. Alternate spellings people use are listed in `alternateName` in the schema.
export const BUSINESS_NAME = "Glam'more Premium Unisex Salon";
export const ALTERNATE_NAMES = ["Glam'more Unisex Salon", "Glammore Salon", "Glammore Unisex Salon"];

// Search phrases the site covers. Only services the salon really offers; used in the meta keywords and the schema's knowsAbout.
export const SEO_KEYWORDS = [
  "unisex salon in Thiruvalla",
  "premium unisex salon Thiruvalla",
  "best unisex salon in Thiruvalla",
  "beauty parlour in Thiruvalla",
  "ladies beauty parlour Thiruvalla",
  "gents salon Thiruvalla",
  "men's salon Thiruvalla",
  "hair salon Thiruvalla",
  "salon near Thukalassery",
  "salon on SH 1 Kollam–Theni Highway",
  "salon in Changanassery area",
  "salon near Chengannur",
  "salon near Pathanamthitta",
  "Glam'more salon",
  "Glam'more Premium Unisex Salon",
  "Glammore salon Thiruvalla",
  "Glammore unisex salon",
  "salon open on Sunday Thiruvalla",
  "walk-in salon Thiruvalla",
  "bridal makeup in Thiruvalla",
  "bridal makeup artist Thiruvalla",
  "Kerala bridal makeup",
  "HD bridal makeup",
  "airbrush bridal makeup",
  "bridal makeup trial",
  "bridal hairstyling",
  "saree draping Thiruvalla",
  "wedding makeup Thiruvalla",
  "engagement makeup",
  "reception makeup",
  "party makeup Thiruvalla",
  "pre-bridal facial",
  "pre-bridal skin care",
  "pre-bridal package",
  "bridal party makeup",
  "groom makeup Thiruvalla",
  "groom styling",
  "groom beard shaping",
  "wedding day grooming for men",
  "women's haircut Thiruvalla",
  "haircut for women",
  "hair cutting Thiruvalla",
  "hair colouring Thiruvalla",
  "hair colour Thiruvalla",
  "global hair colour",
  "hair highlights Thiruvalla",
  "grey coverage hair colour",
  "hair dye salon",
  "keratin treatment Thiruvalla",
  "hair smoothening Thiruvalla",
  "hair straightening Thiruvalla",
  "frizz control hair treatment",
  "hair extensions Thiruvalla",
  "human hair extensions",
  "hairstyling for weddings",
  "party hairstyle",
  "facial in Thiruvalla",
  "facial for glowing skin",
  "facial for sensitive skin",
  "facial for acne-prone skin",
  "de-tan treatment",
  "de-tan and clean-up",
  "face clean-up",
  "body massage Thiruvalla",
  "head massage Thiruvalla",
  "head and shoulder massage",
  "relaxing massage",
  "spa and massage Thiruvalla",
  "gel manicure Thiruvalla",
  "spa pedicure Thiruvalla",
  "manicure and pedicure",
  "acrylic nails Thiruvalla",
  "acrylic nail extensions",
  "nail art Thiruvalla",
  "nail extensions",
  "eyebrow threading Thiruvalla",
  "threading Thiruvalla",
  "eyelash extensions Thiruvalla",
  "classic eyelash extensions",
  "volume eyelash extensions",
  "brows and lashes",
  "body waxing Thiruvalla",
  "facial waxing",
  "waxing Thiruvalla",
  "full body wax",
  "men's haircut Thiruvalla",
  "men's hair salon",
  "beard trim Thiruvalla",
  "beard styling",
  "beard shaping and edging",
  "hot-towel shave",
  "shaving and beard styling",
  "men's grooming Thiruvalla",
  "unisex salon services",
  "salon services Thiruvalla",
  "salon WhatsApp booking",
  "book salon appointment Thiruvalla",
  "salon FAQs",
  "beauty tips Kerala",
  "salon near me Thiruvalla",
];

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

// Opens the "write a review" box on the salon's Google Business Profile.
export const GOOGLE_REVIEW_URL = "https://g.page/r/CQggnazf6vUdEAE/review";

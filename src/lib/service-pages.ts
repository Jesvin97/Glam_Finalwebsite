import type { CategoryId } from "./services-data";

// One landing page per main service group. The service cards come from services-data.ts and the FAQs from
// faq-data.ts (no copy to keep in sync); the guidance text below is written for each page.
export interface ServicePage {
  slug: string;
  category: CategoryId;
  h1: string;
  shortName: string;
  title: string;
  description: string;
  /** FAQ topics (see faq-data.ts) shown on the page. */
  faqTopics: string[];
  /** When a topic is shared by two pages, keep only FAQs whose question contains one of these words. */
  faqIncludes?: string[];
  /** Opening paragraphs, shown under the page heading. */
  intro: string[];
  /** "What to expect" steps, in order. */
  steps: { title: string; text: string }[];
  /** Who the service suits. */
  suits: string[];
  /** Preparation and aftercare tips. */
  tips: string[];
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
    intro: [
      "A good haircut or colour starts with a conversation. At Glam'more in Thukalassery, Thiruvalla, your stylist first looks at your hair texture, its density and how much time you really spend styling it each morning, and only then plans the cut, colour or treatment.",
      "We cover the full range for women: haircuts, global colour, highlights and grey coverage, keratin and hair smoothening, blow-dries, updos for weddings and functions, and natural human hair extensions that are colour-matched and fitted in the salon.",
    ],
    steps: [
      {
        title: "Consultation",
        text: "Tell us what you want, bring two or three reference photos, and mention any earlier colour, smoothening or heat damage. That history decides which services can safely be done on the same day.",
      },
      {
        title: "An honest plan",
        text: "Your stylist says plainly whether the look suits your hair and face shape, and spaces out chemical work when your hair needs a rest between treatments.",
      },
      {
        title: "The service",
        text: "The cut, colour or treatment is done in the salon. For colour we agree the shade with you first, so there are no surprises when the foil comes off.",
      },
      {
        title: "Styling and follow-up",
        text: "You leave knowing how to style the result at home, which products to avoid, and when to come back for a trim, a root touch-up or a treatment top-up.",
      },
    ],
    suits: [
      "Anyone who wants a cut that grows out well and still looks good after a week of ordinary styling.",
      "People covering grey or changing colour who want the shade discussed before it is applied.",
      "Anyone with frizzy, rough or hard-to-manage hair who is deciding between keratin and smoothening.",
      "Brides, bridesmaids and guests who need hair done for a wedding, engagement or party.",
    ],
    tips: [
      "Do a patch test about 48 hours before colour if you have never used that product, and tell us about any past reaction.",
      "Colour first and keratin afterwards, or wait about two weeks after keratin before colouring.",
      "After keratin or smoothening, follow the washing and tying instructions you are given on the day, and use a sulfate-free shampoo.",
      "Use a heat protectant before blow-drying or ironing, and wash coloured hair in lukewarm or cool water.",
    ],
    updated: "2026-11-02",
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
    intro: [
      "A wedding day is long, hot and photographed from every angle, so the makeup and hair have to be planned, tested and then reliable. At Glam'more we do Kerala bridal makeup in HD and airbrush, bridal hairstyling and saree draping, and we plan the whole look with you before the day.",
      "We also look after the people around the bride: the family, the bridal party and the groom, scheduled so that everyone is ready on time. Groom styling covers the haircut, beard trim and shaping, and light, natural makeup for photos.",
    ],
    steps: [
      {
        title: "Book early",
        text: "Once the date is fixed, message us on WhatsApp. One to three months ahead is ideal, and earlier in the wedding season, because the busiest dates fill first.",
      },
      {
        title: "Trial session",
        text: "A few weeks before the wedding, come for a trial with reference photos and, if you can, a similar neckline and a jewellery or dupatta reference. We try the makeup and hair on you so you can change anything before the day.",
      },
      {
        title: "Pre-bridal care",
        text: "Facials, de-tan, keratin or smoothening, waxing, threading, manicure and pedicure can be planned across the weeks before the wedding. Ask us for a plan that fits your date.",
      },
      {
        title: "Wedding day",
        text: "On the day the bride, her family and the bridal party are done in an agreed order, finishing with hair, saree draping and a final check before photographs.",
      },
    ],
    suits: [
      "Brides who want HD for fuller, camera-friendly coverage, or airbrush for a thin, lightweight finish, and want to try both at the trial.",
      "Families who need several people ready at the same time on a tight wedding-day schedule.",
      "Grooms who want clean hair and beard lines and even skin in photos without looking made up.",
      "Anyone preparing for an engagement, reception or other function, not only the wedding itself.",
    ],
    tips: [
      "Do not try new skincare or treatments in the week before the wedding, and keep facials to three to seven days before.",
      "Prepare skin with cleanser, moisturiser and a primer that suits your skin type, and ask for long-wear or waterproof products for a hot, humid day.",
      "Keep blotting papers and a few touch-up items with someone close by.",
      "For grooms: get the haircut three to five days ahead so it settles, and trim the beard the day before or that morning.",
    ],
    updated: "2026-11-02",
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
    intro: [
      "Skin in Kerala deals with sun, humidity and dust, and what helps one person can irritate another. Our facials, de-tan and clean-up treatments are chosen for your skin type, whether it is dry, oily, combination or sensitive, rather than applied the same way to everyone.",
      "If a wedding or event is coming up, we can also build a pre-bridal skin plan across the weeks before it, so your skin looks even and calm on the day instead of freshly treated.",
    ],
    steps: [
      {
        title: "Skin check",
        text: "The therapist looks at your skin type and concerns and asks about allergies, skin conditions and the products you use now.",
      },
      {
        title: "Cleanse and exfoliate",
        text: "The skin is cleansed and exfoliated, and blocked pores are cleared if needed. Inflamed spots are not extracted heavily.",
      },
      {
        title: "Massage and mask",
        text: "A face massage and a mask suited to your skin follow, chosen to calm, brighten or hydrate depending on what you came for.",
      },
      {
        title: "Finish and advice",
        text: "The facial ends with moisturiser and sun protection, and you get a simple routine and a suggested time to return.",
      },
    ],
    suits: [
      "Anyone with a dull or uneven complexion who wants a regular monthly facial.",
      "People who have been in strong sun or travelled and want de-tan to lift surface tan from the face and neck.",
      "Those with sensitive or acne-prone skin, as long as the therapist is told first so gentle products are chosen.",
      "Brides and grooms preparing for a wedding who want a planned course rather than one rushed visit.",
    ],
    tips: [
      "Come without heavy makeup if you can, and mention allergies or skin conditions before the facial starts.",
      "A facial about once every four weeks suits most skin, and sensitive skin or strong active products call for longer gaps.",
      "Have a facial three to seven days before an event so any redness settles, and do not try new products the day before.",
      "Use daily sunscreen afterwards, especially after de-tan, or the tan comes straight back.",
    ],
    updated: "2026-11-02",
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
    intro: [
      "Nail work is mostly preparation: tidy cuticles, a good shape and a clean surface are what make polish look neat and last. At Glam'more we do gel manicures, spa pedicures, acrylic extensions and custom nail art, and we start every set by shaping to suit your hands and how you use them.",
      "Choose gel for a glossy finish at your own nail length, or acrylic if you want added length and a sculpted shape. If you are unsure which is right, tell us what your week looks like and we will suggest one.",
    ],
    steps: [
      {
        title: "Prep",
        text: "Old polish is removed, nails are shaped and cuticles are cared for. For a pedicure this starts with a foot soak, scrub and callus care.",
      },
      {
        title: "Choose length and shape",
        text: "For acrylics you pick the length and shape. For gel you pick the colour, and we advise on what holds up to your daily routine.",
      },
      {
        title: "Colour or build",
        text: "Gel polish is cured under a lamp, and acrylic extensions are sculpted on the nail, then finished with your chosen colour.",
      },
      {
        title: "Nail art and aftercare",
        text: "Custom nail art is added if you want it, and you get simple care advice to keep the edges from lifting.",
      },
    ],
    suits: [
      "Anyone who wants a long-wear manicure that stays glossy for two to three weeks.",
      "People who want extra length or a specific shape and are happy to return for a fill.",
      "Brides and wedding guests who want matching nail art with an outfit or jewellery.",
      "Anyone who wants a proper spa pedicure instead of a quick polish change.",
    ],
    tips: [
      "Come with old polish removed if you can, and do not cut your own cuticles beforehand, which raises the risk of infection.",
      "For a pedicure, avoid shaving your legs just before, and tell us about cuts, fungal infection or skin conditions on your hands or feet.",
      "Wear gloves for washing and cleaning, and never use your nails as tools.",
      "Acrylics usually need a fill every two to three weeks. Always have them soaked off professionally instead of peeling them.",
    ],
    updated: "2026-11-02",
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
    intro: [
      "A good men's cut is about the neckline, the sides and how the hair sits on a normal Monday, not only on the day you leave the chair. At Glam'more we cut for your hair type and face shape, finish with a clean neckline, and give you styling advice you can use at home.",
      "Beard work is the same: shaping and edging to suit your face and how densely your beard grows, and a hot-towel shave for a close, comfortable finish. We are open every day, including Sundays, from 10 AM to 8:30 PM, and walk-ins are welcome when a chair is free.",
    ],
    steps: [
      {
        title: "Say what you want",
        text: "Show a photo or describe the length and style, and mention what you do not like. We tell you honestly if it will work with your hair and face.",
      },
      {
        title: "Cut and shape",
        text: "The haircut is done to the style you chose, with the sides and neckline cleaned up so the shape lasts as it grows.",
      },
      {
        title: "Shave or beard work",
        text: "A warm towel softens the hair and skin before the razor for a closer shave with less irritation, followed by beard shaping and edging if you want it.",
      },
      {
        title: "Finish",
        text: "A cooling towel and moisturiser finish the shave, and we show you how to style the cut and when to book your next visit.",
      },
    ],
    suits: [
      "Men who want a tidy cut every three to six weeks without having to explain it twice.",
      "Anyone growing or reshaping a beard who wants defined lines and a style that suits their face.",
      "Men who get razor bumps from ordinary shaving and want to try a hot-towel shave.",
      "Grooms and guests who want to look sharp in photographs.",
    ],
    tips: [
      "Short, tapered or faded cuts look best with a visit every three to four weeks, and longer styles can wait four to six.",
      "Tidy the neckline and cheek lines every one to two weeks, and have the beard shape set by a barber about once a month.",
      "Before a wedding or event, get the haircut three to five days ahead so it settles, and keep skin moisturised.",
      "A clean-up or facial a few days before an event helps skin look even in photos.",
    ],
    updated: "2026-11-02",
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
    intro: [
      "Most people carry their tension in the same few places: the neck, the shoulders and the scalp. We offer two kinds of massage in a private treatment room, so you can pick between a full session to unwind and a shorter one that targets those areas.",
      "A full-body massage with warm oil works across the whole body for deep relaxation. A head and shoulder massage is shorter and focuses on the scalp, neck and shoulders, which makes it a good choice when you are short on time.",
      "Massage is not a treatment for any medical condition, and it is not right for everyone at every moment. If you are unsure whether it suits you, for example during pregnancy, with a recent injury or with a health condition, ask your doctor first and then tell the therapist before the session begins. A short conversation up front lets us adjust the pressure and avoid the areas that need rest.",
    ],
    steps: [
      {
        title: "Tell us what is bothering you",
        text: "Mention any pain, injury, skin problem or health condition before you start, so the therapist can adapt the session or advise against it.",
      },
      {
        title: "Choose your session",
        text: "Pick a full-body massage or a head and shoulder massage depending on how much time you have and where you feel the tension.",
      },
      {
        title: "Relax",
        text: "The massage is done in a private room. Say at any point if the pressure is too light or too firm, and the therapist will adjust.",
      },
      {
        title: "Take your time afterwards",
        text: "Drink some water and give yourself a few minutes before you leave instead of going straight back to a busy schedule.",
      },
    ],
    suits: [
      "People who sit at a desk or screen all day and feel it in the neck and shoulders.",
      "Anyone who wants an unhurried hour to switch off, on a weekday or a Sunday.",
      "Those who want a short scalp, neck and shoulder massage between other appointments.",
      "Visitors combining a massage with a facial or other services in one trip.",
    ],
    tips: [
      "Avoid a heavy meal just before, drink some water, and arrive a few minutes early to settle.",
      "If you are pregnant, have heart or circulation problems, a recent injury or surgery, or a skin or joint condition, check with your doctor first and tell the therapist.",
      "Say if the pressure is wrong at any time. You can always ask for it to be changed.",
      "Book ahead on WhatsApp for weekends and before festivals, when the treatment room fills quickly.",
    ],
    updated: "2026-11-02",
  },
  {
    slug: "brows-and-lashes",
    category: "brows",
    h1: "Eyebrow Threading & Eyelash Extensions in Thiruvalla",
    shortName: "Brows & lashes",
    title: "Eyebrow Threading & Lash Extensions in Thiruvalla | Glam'more",
    description:
      "Eyebrow threading and classic or volume eyelash extensions at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla. Open every day, 10 AM to 8:30 PM.",
    faqTopics: ["Brows, Lashes & Waxing"],
    faqIncludes: ["threading", "eyelash"],
    intro: [
      "Brows frame the face, and lashes change how awake and defined the eyes look. At Glam'more we shape brows by threading, which is precise on small areas and fine hairs and uses no wax or chemicals, and we apply classic or volume eyelash extensions lash by lash.",
      "Both are quick to maintain once you have a routine. Threading keeps the brow line neat for roughly three to four weeks, and lash extensions are topped up with a fill every two to three weeks as your own lashes renew.",
      "Brows and lashes work well together, and many people book them in the same visit before a wedding, a function or a photo shoot. Tell us what you wear every day and how much upkeep you want, and we will suggest a shape and a lash style that fit your routine instead of one that needs constant attention. Walk-ins are welcome when a chair is free.",
    ],
    steps: [
      {
        title: "Brow shape",
        text: "We look at your face and your natural brow line and agree on a shape before any hair is removed, so the result suits you instead of following a trend.",
      },
      {
        title: "Threading",
        text: "Threading removes unwanted hair quickly, with a short, sharp sting that is usually most noticeable the first time and easier with regular visits.",
      },
      {
        title: "Lash style",
        text: "For extensions you choose classic, which is one extension on each natural lash, or volume, which gives a fuller, denser look.",
      },
      {
        title: "Application and care",
        text: "Extensions are applied lash by lash. We then show you how to keep them clean and what to avoid so they last.",
      },
    ],
    suits: [
      "Anyone who wants clean, defined brows for everyday wear or before an event.",
      "People with fine hairs or small areas where precision matters more than speed.",
      "Brides who want brows and lashes done as part of their pre-bridal plan.",
      "Those who want a low-effort, no-mascara look and are happy to return for fills.",
    ],
    tips: [
      "Avoid threading if your skin is sunburnt, irritated or recently treated with strong skincare actives, and tell us beforehand if your skin is sensitive.",
      "Keep lash extensions dry for the first 24 hours, and avoid oil-based cleansers and waterproof mascara.",
      "Never pull or pick at extensions, and brush them gently with a clean spoolie.",
      "Have threading done a few days before an event rather than on the day, so any redness settles.",
    ],
    updated: "2026-11-02",
  },
  {
    slug: "waxing",
    category: "waxing",
    h1: "Waxing in Thiruvalla",
    shortName: "Waxing",
    title: "Body & Facial Waxing in Thiruvalla | Glam'more Unisex Salon",
    description:
      "Arms, legs, full-body and facial waxing using wax suited to sensitive skin at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    faqTopics: ["Brows, Lashes & Waxing"],
    faqIncludes: ["waxing"],
    intro: [
      "Waxing removes hair from the root, so skin stays smooth for around three to six weeks. We offer arms, legs and full-body waxing as well as upper lip, chin and full-face waxing, using wax that is suited to sensitive skin.",
      "It is a common part of a pre-bridal plan, and it works just as well as a regular routine. Hair does not grow back thicker or darker after waxing. With regular sessions, regrowth often looks finer and sparser over time.",
      "Waxing is not for every skin on every day. Skip it, or ask us first, if the area is sunburnt, cut or irritated, if you recently used strong skincare actives, or if you have a skin condition in that area. Tell us about any allergies before we start, and we will choose the right approach and the right amount of pressure for each area.",
      "For the best result, plan waxing a few days before an event rather than on the day itself, so any redness settles before photographs. If you are waxing before a wedding, ask us about fitting it into your pre-bridal plan alongside threading, facials and de-tan, so each treatment has time to settle.",
    ],
    steps: [
      {
        title: "Check the area",
        text: "We look at the skin first. If it is sunburnt, broken or irritated, we advise waiting rather than waxing over it.",
      },
      {
        title: "Wax and remove",
        text: "Wax is applied in small sections and removed against the direction of growth, with attention to sensitive areas such as the face and underarms.",
      },
      {
        title: "Soothe",
        text: "The skin is soothed afterwards, and we tell you what to avoid over the next day.",
      },
      {
        title: "Plan the next visit",
        text: "Most people return once hair has grown to about half a centimetre again, which is usually after three to six weeks.",
      },
    ],
    suits: [
      "Anyone who wants smooth skin for longer than shaving gives.",
      "People with sensitive skin who want a wax chosen for it.",
      "Brides who want waxing planned into the weeks before the wedding.",
      "Anyone who wants quick facial waxing for the upper lip, chin or full face.",
    ],
    tips: [
      "Let hair grow to about 0.5 cm, roughly two to three weeks, and arrive with clean, dry skin.",
      "Exfoliate gently the day before, and tell us about any skin conditions or recent treatments.",
      "For 24 hours afterwards, avoid sun, hot showers, saunas, heavy workouts and tight clothes.",
      "Do not scrub or apply perfumed products to the waxed area straight away.",
    ],
    updated: "2026-11-02",
  },
];

export const servicePageBySlug = (slug: string) => servicePages.find((p) => p.slug === slug);
export const servicePageByCategory = (category: CategoryId) => servicePages.find((p) => p.category === category);

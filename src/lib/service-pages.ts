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
  /** Detail page for one service: the slug of the group page it belongs to. Group pages list their detail pages. */
  parent?: string;
  /** Detail pages show only these services from services-data.ts (and use the first one's photo). */
  serviceIds?: string[];
  /** Replaces the category description under the heading. */
  lead?: string;
  /** Opening paragraphs, shown under the page heading. */
  intro: string[];
  /** Extra sections for deeper guidance, shown after the tips. */
  more?: { heading: string; paragraphs: string[] }[];
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
      "We cover the full range for ladies and women, whether you think of us as a salon or a beauty parlour: haircuts, global colour, highlights and grey coverage, keratin and hair smoothening for straighter, smoother hair, hairstyles and updos for weddings and functions, and natural human hair extensions that are colour-matched and fitted in the salon.",
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
      "A good men's or gents' haircut is about the neckline, the sides and how the hair sits on a normal Monday, not only on the day you leave the chair. At Glam'more we cut for your hair type and face shape, finish with a clean neckline, and give you styling advice you can use at home.",
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
  {
    slug: "bridal-makeup",
    parent: "bridal-and-groom-makeup",
    category: "events",
    serviceIds: ["bridal-services"],
    h1: "Bridal Makeup in Thiruvalla",
    shortName: "Bridal makeup",
    title: "Bridal Makeup in Thiruvalla: HD & Airbrush | Glam'more",
    description:
      "Kerala bridal makeup in HD or airbrush, with bridal hairstyling and saree draping, planned with a trial at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    lead: "Kerala bridal makeup in HD or airbrush, with hairstyling and saree draping, planned with you well before the wedding day.",
    faqTopics: ["Bridal & Groom"],
    faqIncludes: ["bridal"],
    intro: [
      "Bridal makeup has to look right in person, in photographs and on video, and it has to last through a long, hot day of rituals, travel and greetings. That is why we plan it in stages: a conversation about the look you want, a trial, and then the wedding-day application, instead of one rushed session.",
      "At Glam'more in Thukalassery, Thiruvalla, bridal makeup is done in HD or airbrush, together with bridal hairstyling and saree draping. You choose the finish at the trial, once you have seen both on your own skin, rather than having to decide in advance from a photograph.",
      "We also get the bride's family and bridal party ready on the day, scheduled so that everyone finishes on time, and we can plan a pre-bridal care routine in the weeks beforehand.",
    ],
    steps: [
      {
        title: "Fix the date and message us",
        text: "As soon as the wedding date is fixed, message us on WhatsApp. Booking one to three months ahead is ideal, and earlier in the wedding season, when the busiest dates fill first.",
      },
      {
        title: "Share the look",
        text: "Send reference photos and tell us about your outfit, jewellery and the time of the ceremony. A look planned around the saree colour and the lighting at the venue works better than one chosen in isolation.",
      },
      {
        title: "Trial",
        text: "A few weeks before the wedding we try makeup and hair on you, so you can change the colours, the finish or the hairstyle while there is still time.",
      },
      {
        title: "Wedding day",
        text: "On the day the makeup, hairstyle and saree draping are done in the agreed order, with a final check before you leave for photographs.",
      },
    ],
    suits: [
      "Brides who want a Kerala bridal look, traditional or modern, planned around their saree and jewellery.",
      "Brides who are unsure whether to choose HD or airbrush and want to see both before deciding.",
      "Families who need the bride and several relatives ready within the same morning.",
      "Brides who also want pre-bridal skin and hair care planned across the weeks before the wedding.",
    ],
    tips: [
      "Wear a neckline similar to your wedding outfit at the trial, and bring jewellery or a dupatta reference so the colours work together.",
      "Prepare your skin with a cleanser, a moisturiser and a primer that suits your skin type, and ask for long-wear or waterproof products.",
      "Do not try new skincare or treatments in the week before the wedding.",
      "Keep blotting papers and a few touch-up items with someone close by for a hot, humid day.",
    ],
    more: [
      {
        heading: "HD or airbrush bridal makeup",
        paragraphs: [
          "HD makeup uses camera-friendly formulas applied with brushes and sponges, and it gives fuller, more defined coverage. Airbrush sprays a very fine mist of makeup onto the skin, which gives a thin, even, lightweight finish.",
          "Neither is better for everyone. The right choice depends on your skin, the look you want and how long the day is, which is why we suggest trying both at the trial. Tell us about your skin, any sensitivity and the climate on the day, and we will give you an honest recommendation.",
        ],
      },
      {
        heading: "Hairstyling and saree draping",
        paragraphs: [
          "The hairstyle is planned together with the makeup, the jewellery and the veil or flowers you plan to wear, so the whole look balances. We can try the hairstyle at the trial as well, since a style that looks fine in a photo can behave differently with your hair type and the weight of the accessories.",
          "Saree draping is part of the bridal service. A well-draped saree sits securely and photographs neatly, and it is easier to move in through a long day. Bring the saree and the blouse, and any pins or jewellery you plan to wear, to the trial if you can.",
        ],
      },
      {
        heading: "Pre-bridal care before the wedding",
        paragraphs: [
          "Skin and hair look their best when they have been looked after for several weeks, not only on the day. Pre-bridal care can include facials, de-tan, keratin or smoothening, waxing, threading, a manicure and a pedicure, spread across the weeks before the wedding so that each treatment has time to settle.",
          "Message us on WhatsApp with your wedding date and we will suggest a plan that fits it. If you already have a trial booked, we can plan the care around that date as well.",
        ],
      },
    ],
    updated: "2026-11-02",
  },
  {
    slug: "hair-colouring",
    parent: "womens-hair",
    category: "hair",
    serviceIds: ["hair-coloring"],
    h1: "Hair Colouring in Thiruvalla",
    shortName: "Hair colouring",
    title: "Hair Colouring in Thiruvalla: Global, Highlights | Glam'more",
    description:
      "Global hair colour, highlights and grey coverage with a shade consultation first, at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    lead: "Global colour, highlights and grey coverage, with a shade consultation before any colour is applied.",
    faqTopics: ["Hair Colour"],
    intro: [
      "Good hair colour begins before the colour is mixed. The shade has to suit your skin tone, your natural base colour and how much upkeep you are happy with, and the hair itself has to be healthy enough for the treatment. At Glam'more in Thukalassery, Thiruvalla, we start every colour service with a shade consultation.",
      "We offer global colour, highlights and grey coverage. Global colour changes the whole head to one shade, highlights add lighter strands for dimension, and grey coverage blends or covers white hair so that it looks even.",
      "Tell us about any earlier colouring, smoothening or other chemical treatment at the consultation, because that history decides what is safe to do and how many visits a big change will need.",
    ],
    steps: [
      {
        title: "Shade consultation",
        text: "We talk through the colour you want, look at your current hair and skin tone, and agree on a shade before anything is applied. Reference photos help.",
      },
      {
        title: "Check your hair",
        text: "We ask about earlier colour, bleaching, smoothening and heat styling, and we tell you if your hair needs a rest or a conditioning treatment first.",
      },
      {
        title: "Colour service",
        text: "The colour is applied in the salon. Global colour, highlights and grey coverage are each done differently, so the time they take varies.",
      },
      {
        title: "Aftercare plan",
        text: "You leave with advice on washing, products and sun protection, and a suggestion for when to come back for a root touch-up or a refresh.",
      },
    ],
    suits: [
      "Anyone covering grey who wants an even result and a clear plan for root touch-ups.",
      "People who want a new all-over shade and would like it checked against their skin tone first.",
      "Those who want highlights for dimension and are happy to refresh them every couple of months.",
      "Brides and guests who want fresh colour timed before a wedding or function.",
    ],
    tips: [
      "If you have never used that colour product, do a small skin patch test about 48 hours beforehand, and tell us about any past reaction.",
      "Tell us about earlier colouring, bleaching or smoothening before we start.",
      "Colour first and keratin afterwards, or wait about two weeks after keratin before colouring.",
      "Wash less often, use lukewarm or cool water, and choose a shampoo made for coloured hair.",
    ],
    more: [
      {
        heading: "Choosing between global colour, highlights and grey coverage",
        paragraphs: [
          "Global colour is the simplest option when you want a new overall shade or a rich, even tone. It does need root touch-ups as your hair grows, usually every four to six weeks for permanent colour.",
          "Highlights and balayage grow out more softly, so they are lower maintenance, and they are usually refreshed every two to three months. Lightening is what makes highlights possible, and it is also the part that can dry the hair, so it should be done carefully and followed with conditioning.",
          "Grey coverage can be done with global colour or a blended approach. If you are not sure whether to cover grey fully or soften it, tell us how you want your hair to look in between visits and we will suggest what fits.",
        ],
      },
      {
        heading: "Colour and the health of your hair",
        paragraphs: [
          "Adding colour without lightening is gentle on most hair. Lightening is what causes dryness and breakage. Healthy hair handles it well when it is done carefully, spaced out, and followed with conditioning treatments.",
          "If your hair has been smoothened, bleached or coloured recently, tell us. Sometimes the kindest plan is to colour in stages, and sometimes it is to wait. We will say so honestly rather than promise a result your hair cannot take.",
        ],
      },
      {
        heading: "Making your colour last",
        paragraphs: [
          "Fading is mostly caused by hot water, frequent washing and sun exposure. Wash less often with lukewarm or cool water, use a shampoo made for coloured hair, condition regularly, use a heat protectant before blow-drying or ironing, and cover your hair in strong sun.",
          "Semi-permanent colour fades gradually over several weeks of washing, so it needs more frequent refreshing than permanent colour.",
        ],
      },
    ],
    updated: "2026-11-02",
  },
  {
    slug: "keratin-and-hair-smoothening",
    parent: "womens-hair",
    category: "hair",
    serviceIds: ["keratin-smoothening"],
    h1: "Keratin & Hair Smoothening in Thiruvalla",
    shortName: "Keratin & smoothening",
    title: "Keratin & Hair Smoothening in Thiruvalla | Glam'more",
    description:
      "Keratin and hair smoothening to reduce frizz and make hair easier to manage, with advice on which suits your hair, at Glam'more Salon, Thukalassery, Thiruvalla.",
    lead: "Keratin and smoothening treatments to reduce frizz and make hair easier to manage.",
    faqTopics: ["Keratin & Hair Smoothening"],
    intro: [
      "If your hair is frizzy, rough or takes a long time to style in Kerala's humidity, a keratin or smoothening treatment can make daily care much easier. At Glam'more in Thukalassery, Thiruvalla, our stylists check your hair type first and then recommend the treatment that suits it.",
      "Keratin reduces frizz and adds shine while keeping some natural movement in the hair. Hair smoothening gives a straighter, sleeker finish. They are different results, so it helps to decide which one you actually want before you book.",
      "Both are chemical treatments, so we ask about your hair history, any recent colour and your health, and we tell you honestly if it is better to wait.",
    ],
    steps: [
      {
        title: "Hair assessment",
        text: "Your stylist looks at your hair type, its condition and any earlier colour, bleach or smoothening, and asks what result you want.",
      },
      {
        title: "Choose keratin or smoothening",
        text: "Keratin keeps natural movement and softens frizz. Smoothening gives a straighter finish. We explain the difference and recommend one for your hair.",
      },
      {
        title: "Treatment",
        text: "The treatment is applied and finished in the salon. The room should be well ventilated, and you can ask which product is being used.",
      },
      {
        title: "Aftercare instructions",
        text: "You are told how long to wait before washing, what to avoid in the first days and which shampoo to use, because the exact instructions depend on the product used.",
      },
    ],
    suits: [
      "People with frizzy or rough hair who spend a long time blow-drying and straightening.",
      "Anyone who wants softer, shinier hair that holds its shape in humid weather.",
      "Those who want a straighter, sleeker finish and are happy to use smoothening.",
      "Brides who want hair that is easier to style, planned weeks before the wedding.",
    ],
    tips: [
      "Tell us about any recent colour, bleaching or earlier smoothening before we start.",
      "Follow the washing and tying instructions you are given on the day. Commonly you wait two to three days and do not tie, clip or tuck your hair behind your ears.",
      "Use a sulfate-free shampoo afterwards, which helps the treatment last longer.",
      "If you are pregnant or breastfeeding, check with your doctor before any chemical hair treatment.",
    ],
    more: [
      {
        heading: "Keratin or smoothening: which should you choose?",
        paragraphs: [
          "Choose keratin if you want less frizz, more shine and hair that is easier to manage but still has some natural bend. Choose smoothening if you want hair that looks straighter and sleeker.",
          "If you are not sure, tell us how you wear your hair on an ordinary day and how much time you want to spend on it. We will recommend the treatment that fits, and we will say so if neither is a good idea for your hair right now.",
        ],
      },
      {
        heading: "How long does it last?",
        paragraphs: [
          "A keratin treatment typically lasts three to five months, depending on your hair type, how often you wash it and which shampoo you use. It fades gradually rather than all at once, and hair growing from the roots stays natural, so you will see the contrast in time.",
          "These are typical ranges and not guarantees. They vary with your hair and how you look after it.",
        ],
      },
      {
        heading: "Keratin and colour",
        paragraphs: [
          "It is usually better to colour first and do keratin afterwards, or to wait around two weeks after keratin before colouring. Colouring too soon can affect both the shade and how long the treatment lasts.",
          "Tell us what you plan to do over the next few months, and we will suggest the best order for your hair.",
        ],
      },
      {
        heading: "Safety and pregnancy",
        paragraphs: [
          "Some smoothening and keratin products release fumes that can irritate the eyes and lungs, so ask which product is being used and make sure the room is well ventilated.",
          "If you are pregnant or breastfeeding, check with your doctor first before any chemical hair treatment, and tell us before the appointment.",
        ],
      },
    ],
    updated: "2026-11-02",
  },
  {
    slug: "acrylic-nails-and-nail-art",
    parent: "nails",
    category: "nails",
    serviceIds: ["acrylic-nails"],
    h1: "Acrylic Nails & Nail Art in Thiruvalla",
    shortName: "Acrylic nails & nail art",
    title: "Acrylic Nails & Nail Art in Thiruvalla | Glam'more",
    description:
      "Acrylic nail extensions in your choice of length and shape, finished with custom nail art, at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    lead: "Acrylic nail extensions in your choice of length and shape, finished with custom nail art.",
    faqTopics: ["Nails"],
    faqIncludes: ["acrylic"],
    intro: [
      "Acrylic nails are for people who want length, strength or a particular shape that their own nails will not give them. At Glam'more in Thukalassery, Thiruvalla, we build acrylic extensions in the length and shape you choose, and finish them with custom nail art if you want it.",
      "Acrylic is a stronger, sculpted material, which is the main difference from gel. Gel polish is a thin, flexible coat over your natural nail, so it suits a glossy manicure at your own length. If you want extensions, acrylic is the one to ask for.",
      "A good set depends on preparation and on the shape being planned around your hands and daily routine, so we talk through length and shape before we start, not after.",
    ],
    steps: [
      {
        title: "Plan the set",
        text: "Tell us the length and shape you want, and show a photo if you have one. We tell you what suits your nail beds and how you use your hands, so the set is practical as well as pretty.",
      },
      {
        title: "Prepare the nails",
        text: "Old polish is removed and the natural nails are shaped and cleaned, with cuticle care, so that the extension has a clean surface to bond to.",
      },
      {
        title: "Build and shape",
        text: "The acrylic extensions are sculpted on the nail and filed to the shape you chose, then smoothed and finished with colour.",
      },
      {
        title: "Nail art",
        text: "Custom nail art is added if you want it, from a simple accent to a full design matched to an outfit or an occasion.",
      },
    ],
    suits: [
      "People who want added length or a specific shape that their natural nails cannot hold.",
      "Anyone who likes custom nail art and wants a set built to carry it.",
      "Brides and wedding guests who want nails planned around an outfit and jewellery.",
      "Those who are happy to come back for a fill every two to three weeks.",
    ],
    tips: [
      "Come with old polish removed if you can, and do not cut your own cuticles beforehand, which raises the risk of infection.",
      "Tell us about any cuts, fungal infection or skin conditions on your hands before we start.",
      "Never peel or pull acrylics off. Have them soaked off and removed professionally.",
      "Wear gloves for washing and cleaning, and do not use your nails as tools.",
    ],
    more: [
      {
        heading: "Gel or acrylic: which should you choose?",
        paragraphs: [
          "Gel polish is cured under a lamp and sits as a thin, flexible coat over your natural nail. It suits a glossy manicure at your own nail length and usually lasts around two to three weeks without chipping, depending on how hard you use your hands.",
          "Acrylic is stronger and is used to add length and shape. If you want extensions, choose acrylic. If you want a neat, natural-length finish, gel is usually the simpler option. Tell us what your week looks like and we will suggest one.",
        ],
      },
      {
        heading: "Fills and nail health",
        paragraphs: [
          "As your natural nail grows, a gap appears near the cuticle, and acrylics usually need a fill every two to three weeks to keep the set strong and tidy.",
          "Acrylics do not have to damage your natural nails when they are applied and removed properly. The damage comes from peeling or pulling them off, which takes layers of the natural nail with it. If you want a set removed, book it with us instead of removing it at home.",
        ],
      },
      {
        heading: "Planning nail art",
        paragraphs: [
          "Nail art works best when it is planned with the shape and length, because a long coffin or almond shape carries a design differently from a short square one. Bring photos of designs you like and tell us how much detail you want.",
          "For a wedding or event, plan the nail art around the outfit and jewellery, and book a few days ahead so that the set has settled before photographs.",
        ],
      },
    ],
    updated: "2026-11-02",
  },
  {
    slug: "beard-and-shaving",
    parent: "mens-grooming",
    category: "mens",
    serviceIds: ["shaving"],
    h1: "Beard Styling & Hot-Towel Shave in Thiruvalla",
    shortName: "Beard & shaving",
    title: "Beard Styling & Hot-Towel Shave in Thiruvalla | Glam'more",
    description:
      "Hot-towel shave, beard shaping and edging with advice on a beard style that suits your face, at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    lead: "Hot-towel shave, beard shaping and edging, with advice on a beard style that suits your face.",
    faqTopics: ["Men's Grooming"],
    faqIncludes: ["beard", "shave"],
    intro: [
      "A beard looks deliberate when its lines are clean and its shape suits the face. At Glam'more in Thukalassery, Thiruvalla, we shape and edge beards to suit your face and how densely your beard grows, and we offer a hot-towel shave for a close, comfortable finish.",
      "Whether you are growing a beard out, keeping a short one sharp or clean-shaving for an occasion, tell us what you want and we will say honestly whether it will suit you.",
      "We are open every day, including Sundays, so a quick tidy-up before work, a function or a wedding is easy to fit in.",
    ],
    steps: [
      {
        title: "Talk it through",
        text: "Tell us whether you want a full beard, a short one or a clean shave. We look at your face shape and how your beard grows and suggest a style.",
      },
      {
        title: "Warm towel",
        text: "A warm towel softens the hair and opens the skin before the razor, so the shave is closer and more comfortable with less irritation.",
      },
      {
        title: "Shave or shape",
        text: "The beard is shaped and edged, or shaved, with a clean neckline and defined cheek lines.",
      },
      {
        title: "Finish",
        text: "A cooling towel and moisturiser finish the shave. We show you how to maintain the shape at home and when to come back.",
      },
    ],
    suits: [
      "Men who get razor bumps or irritation from ordinary shaving.",
      "Anyone growing a beard who wants it shaped as it fills in.",
      "Men who want a short beard kept sharp, with defined lines.",
      "Grooms and guests who want a neat finish for photographs.",
    ],
    tips: [
      "Tidy the neckline and cheek lines every one to two weeks, and have the shape set by a barber about once a month.",
      "Tell us about sensitive skin, razor bumps or any skin condition before the shave.",
      "For a wedding or event, trim the beard the day before or on the morning itself for sharp lines.",
      "Moisturise daily so skin does not look dry or patchy.",
    ],
    more: [
      {
        heading: "Choosing a beard style",
        paragraphs: [
          "Your face shape and how densely your beard grows decide what works. Fuller sides can balance a long face, while a defined jawline and neat edges suit most shapes.",
          "Patchy growth does not mean you cannot have a beard. A shorter, well-shaped style often looks better than a long one with gaps. We will tell you plainly what your beard can carry.",
        ],
      },
      {
        heading: "What a hot-towel shave does",
        paragraphs: [
          "A warm towel softens the hair and opens the skin before the razor, so the shave is closer and more comfortable with less irritation. It is finished with a cooling towel and moisturiser.",
          "It is a good choice before a wedding or event, and if you get razor bumps with ordinary shaving.",
        ],
      },
      {
        heading: "Keeping it neat between visits",
        paragraphs: [
          "The neckline and cheek lines grow out first, so a quick tidy every one to two weeks keeps the shape looking deliberate.",
          "Wash the beard regularly, keep the skin underneath moisturised, and come back about once a month to have the shape reset by a barber.",
        ],
      },
    ],
    updated: "2026-11-02",
  },
  {
    slug: "hair-extensions",
    parent: "womens-hair",
    category: "hair",
    serviceIds: ["hair-extensions"],
    h1: "Hair Extensions in Thiruvalla",
    shortName: "Hair extensions",
    title: "Hair Extensions in Thiruvalla | Glam'more Unisex Salon",
    description:
      "Natural human hair extensions for added length or volume, colour-matched and fitted in the salon at Glam'more, Thukalassery, Thiruvalla.",
    lead: "Natural human hair extensions for added length or volume, colour-matched and fitted in the salon.",
    faqTopics: ["Hair Extensions"],
    intro: [
      "Hair extensions add length, volume or both, without waiting months for your own hair to grow. At Glam'more in Thukalassery, Thiruvalla, we use natural human hair extensions, which are colour-matched to your hair and fitted in the salon.",
      "The aim is a result that looks like your own hair. That depends on matching the colour and texture, on not adding more weight than your hair can carry, and on fitting the extensions neatly.",
      "Tell us how much length or volume you want and what you are using the extensions for, a wedding or everyday wear, and we will recommend what your hair can comfortably carry.",
    ],
    steps: [
      {
        title: "Consultation",
        text: "We look at your hair's length, thickness and condition, and talk about the length or volume you want and how long you want to wear them.",
      },
      {
        title: "Colour and texture matching",
        text: "The extensions are matched to your hair colour and texture so that they blend, and we tell you if a small colour change would help.",
      },
      {
        title: "Fitting",
        text: "The extensions are fitted in the salon, with the weight kept appropriate for your hair, and the cut and styling blended around them.",
      },
      {
        title: "Care advice",
        text: "You are shown how to brush, wash and style the hair with the extensions, and what to avoid so they last and your own hair stays healthy.",
      },
    ],
    suits: [
      "People who want length for a wedding, a function or a change of look.",
      "Anyone with fine or thin hair who wants more volume.",
      "Those who would like both length and volume without a long wait.",
      "Brides who want a fuller hairstyle for the wedding day.",
    ],
    tips: [
      "Tell us how much length or volume you want, so we can recommend what your hair can comfortably carry.",
      "Brush gently and wash carefully, as good brushing and gentle washing make the biggest difference to how long extensions last.",
      "Avoid heat damage, and use a heat protectant when you style.",
      "Have extensions removed in the salon, not at home, since removing them yourself can damage your own hair.",
    ],
    more: [
      {
        heading: "How long do extensions last?",
        paragraphs: [
          "It depends on the type and on how you care for them. Clip-in extensions can be reused many times, while longer-wear methods are worn for weeks to months before they need to be moved up or removed.",
          "Good brushing, gentle washing and avoiding heat damage make the biggest difference. Ask us which type suits your plans before you decide.",
        ],
      },
      {
        heading: "Will extensions damage your own hair?",
        paragraphs: [
          "Not when they are fitted well, kept light, brushed properly and removed correctly. Problems usually come from extensions that are too heavy for your hair, left in too long, or removed at home.",
          "That is why we ask how much length or volume you want, and recommend only what your hair can comfortably carry.",
        ],
      },
      {
        heading: "Extensions for a wedding",
        paragraphs: [
          "Extensions are often used for bridal hairstyles that need fullness, such as a long braid, a bun or loose curls. Plan them with the hairstyle, and try the look at your bridal trial.",
          "If you want to wear extensions on the wedding day, book a consultation a few weeks ahead so that the colour match and fitting can be checked, and any cut or colour can be done first.",
        ],
      },
    ],
    updated: "2026-11-02",
  },
  {
    slug: "groom-makeup",
    parent: "bridal-and-groom-makeup",
    category: "events",
    serviceIds: ["groom-makeup"],
    h1: "Groom Makeup & Styling in Thiruvalla",
    shortName: "Groom makeup",
    title: "Groom Makeup & Styling in Thiruvalla | Glam'more",
    description:
      "Groom styling for the wedding day: hair, beard trim and shaping, and light, natural makeup for photos, at Glam'more Salon, Thukalassery, Thiruvalla.",
    lead: "Groom styling for the wedding day: hair, beard trim and shaping, and light, natural makeup for photos.",
    faqTopics: ["Bridal & Groom"],
    faqIncludes: ["groom"],
    intro: [
      "A groom is photographed all day, often at close range, so clean hair and beard lines and even skin matter. At Glam'more in Thukalassery, Thiruvalla, groom styling covers the haircut, beard trim and shaping, and light, natural makeup for photos.",
      "The aim is to look like yourself on a good day, not made up. The makeup is light, and its job is to even out skin tone and take away shine under flash and strong light.",
      "We can plan the groom's styling together with the bride's schedule, so that both are ready on time.",
    ],
    steps: [
      {
        title: "Plan ahead",
        text: "Message us with the wedding date. We suggest when to get the haircut and a clean-up or facial, so everything has settled by the day.",
      },
      {
        title: "Haircut and beard",
        text: "The haircut and beard trim are done a few days before, and the beard is tidied again on the morning if needed, for sharp lines.",
      },
      {
        title: "Skin and light makeup",
        text: "On the day the skin is prepared and light, natural makeup is applied to even the tone and reduce shine for photographs.",
      },
      {
        title: "Final check",
        text: "A last check of the hair, the beard and the skin before you leave, so you are ready for photographs.",
      },
    ],
    suits: [
      "Grooms who want a polished, natural look in wedding photos.",
      "Men who do not usually wear makeup and want it to look invisible.",
      "Grooms who want a haircut, beard and skin plan across the days before the wedding.",
      "Families who need the groom and the bride ready on the same morning.",
    ],
    tips: [
      "Get the haircut three to five days before so it settles, and trim the beard the day before or on the morning itself.",
      "A clean-up or facial a few days ahead helps skin look even in photos.",
      "Moisturise daily so skin does not look dry or patchy under makeup.",
      "Do not try new skincare products in the week before the wedding.",
    ],
    more: [
      {
        heading: "How should a groom prepare for the wedding day?",
        paragraphs: [
          "Plan the haircut about three to five days before, so that it looks natural rather than freshly cut. Trim the beard the day before or on the morning itself for sharp lines.",
          "A clean-up or facial a few days ahead helps skin look even in photos, and moisturising daily stops it looking dry or patchy under makeup.",
        ],
      },
      {
        heading: "What does groom makeup involve?",
        paragraphs: [
          "Groom makeup is light and natural. It evens out the skin tone, covers marks and takes away shine, so that the skin looks healthy under flash and bright light.",
          "If you are unsure about wearing makeup, tell us. We can keep it to the minimum and show you what it looks like before the day.",
        ],
      },
      {
        heading: "Hair and beard on the day",
        paragraphs: [
          "The hairstyle and beard are finished on the morning of the wedding, with the neckline and cheek lines cleaned up. If you want a hot-towel shave, plan it with us for a close, comfortable finish.",
          "If other family members need styling as well, let us know when you book, so the schedule works for everyone.",
        ],
      },
    ],
    updated: "2026-11-02",
  },
  {
    slug: "lash-extensions",
    parent: "brows-and-lashes",
    category: "brows",
    serviceIds: ["eyelashes"],
    h1: "Eyelash Extensions in Thiruvalla",
    shortName: "Eyelash extensions",
    title: "Eyelash Extensions in Thiruvalla | Glam'more Salon",
    description:
      "Classic and volume eyelash extensions, applied lash by lash, at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    lead: "Classic and volume lash extensions, applied lash by lash.",
    faqTopics: ["Brows, Lashes & Waxing"],
    faqIncludes: ["eyelash"],
    intro: [
      "Eyelash extensions give the eyes more definition without mascara. At Glam'more in Thukalassery, Thiruvalla, we apply classic and volume lash extensions lash by lash.",
      "Classic extensions place one extension on each natural lash, for a natural, defined look. Volume extensions give a fuller, denser look.",
      "Extensions need some upkeep, so tell us what you wear every day and how much maintenance you are happy with, and we will suggest a style that fits.",
      "Lashes also work well alongside brow threading, and many people book both in the same visit before a wedding or an event. We are open every day, including Sundays, and walk-ins are welcome when a chair is free, although lash extensions take time, so booking ahead is better.",
    ],
    steps: [
      {
        title: "Choose the style",
        text: "We talk about whether you want a natural, classic look or a fuller, volume look, and how much upkeep suits you.",
      },
      {
        title: "Prepare",
        text: "The eye area is cleaned and the natural lashes are prepared, so that the extensions bond properly.",
      },
      {
        title: "Application",
        text: "The extensions are applied lash by lash, with care taken to keep the natural lashes separate.",
      },
      {
        title: "Aftercare",
        text: "We show you how to keep the extensions clean and what to avoid, and suggest when to come back for a fill.",
      },
    ],
    suits: [
      "Anyone who wants defined eyes without mascara every day.",
      "Brides who want lashes planned as part of the wedding look.",
      "People going on holiday or to an event who want a low-effort look.",
      "Those happy to return for a fill every two to three weeks.",
    ],
    tips: [
      "Tell us about any allergy, eye condition or sensitivity before we start.",
      "Keep the extensions dry for the first 24 hours.",
      "Avoid oil-based cleansers and waterproof mascara, never pull or pick at the extensions, and brush them gently with a clean spoolie.",
      "Do not remove extensions yourself. Come back to have them taken off properly.",
    ],
    more: [
      {
        heading: "Classic or volume lashes",
        paragraphs: [
          "Classic lashes place one extension on each natural lash, which gives a natural, defined look. They suit people who want enhancement without drama.",
          "Volume lashes use finer extensions in fans, which gives a fuller, denser look. Choose volume if you want more drama, and tell us how bold you want to go.",
        ],
      },
      {
        heading: "How long do they last?",
        paragraphs: [
          "Extensions shed naturally with your own lashes, which renew over about six to eight weeks, so most people have a fill every two to three weeks.",
          "How long a set looks good depends on your own lash cycle, how you care for them, and how often you rub your eyes.",
        ],
      },
      {
        heading: "Looking after your lashes",
        paragraphs: [
          "Keep them dry for the first 24 hours, avoid oil-based cleansers and waterproof mascara, never pull or pick at them, and brush them gently with a clean spoolie.",
          "If your eyes feel irritated or sore, get in touch with us and see a doctor if it does not settle.",
          "Sleeping on your back, washing your face gently around the eyes and keeping the lashes brushed will help a set stay neat between fills. If a few extensions fall out early, that is normal, because each one sheds with the natural lash it was attached to.",
        ],
      },
    ],
    updated: "2026-11-02",
  },
  {
    slug: "hair-botox",
    parent: "womens-hair",
    category: "hair",
    serviceIds: ["hair-botox"],
    h1: "Hair Botox in Thiruvalla",
    shortName: "Hair botox",
    title: "Hair Botox in Thiruvalla for Frizzy, Damaged Hair | Glam'more",
    description:
      "Hair botox for frizzy, dry and damaged hair at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla. Smoother, shinier hair with natural movement.",
    lead: "A deep-repair treatment for frizzy, rough or damaged hair that keeps your natural movement.",
    faqTopics: ["Hair Botox"],
    intro: [
      "Hair botox is a deep-conditioning repair treatment, and despite the name it has nothing to do with the skin injection. It coats and fills rough, damaged strands so hair feels smoother, looks shinier and frizzes less. At Glam'more in Thukalassery, Thiruvalla, your stylist checks your hair first and tells you plainly whether it is the right treatment.",
      "It suits hair that is dry, frizzy or worn down by colour, bleach, heat styling or humidity. Unlike keratin or smoothening, which change the shape of the hair, hair botox is about repair and condition, so your natural wave or curl stays.",
      "The effect is not permanent. It fades gradually as you wash your hair, and how long it lasts depends on your hair and how you look after it.",
    ],
    steps: [
      {
        title: "Hair check",
        text: "We look at your hair's texture and condition and ask about earlier colour, bleach, smoothening and heat styling, so the treatment is planned around your hair.",
      },
      {
        title: "Wash and prepare",
        text: "Your hair is cleansed so the treatment can reach the strands properly.",
      },
      {
        title: "The treatment",
        text: "The repair formula is worked through your hair and left to take effect, following the instructions of the product being used.",
      },
      {
        title: "Finish and aftercare",
        text: "Your hair is rinsed and styled, and you leave knowing how to wash it, which shampoo to use and how to keep the results going.",
      },
    ],
    suits: [
      "Anyone with frizzy, dry or rough hair who wants it smoother without changing its natural shape.",
      "People whose hair has been damaged by colour, bleach or heat styling.",
      "Those unsure whether they want keratin or smoothening and would like a gentler first step.",
      "Anyone who wants shinier, easier-to-manage hair before a wedding or function.",
    ],
    tips: [
      "Tell us about any recent colour, bleach or smoothening before we start.",
      "Follow the washing and tying instructions you are given on the day, since they depend on the product used.",
      "Use a sulfate-free shampoo and a conditioner, and a heat protectant before blow-drying or ironing.",
      "If you are pregnant or breastfeeding, check with your doctor before any chemical hair treatment.",
    ],
    more: [
      {
        heading: "Hair botox, keratin or hair spa?",
        paragraphs: [
          "Hair botox repairs and conditions damaged hair and keeps your natural movement. Keratin and smoothening reduce frizz more strongly and give a straighter, sleeker finish. A hair spa is lighter care for your hair and scalp, with shorter-lasting results.",
          "If you cannot decide, bring a few photos of how you want your hair to look and tell us how much time you spend styling it. We will recommend the one that fits, even if that is the simpler option.",
        ],
      },
      {
        heading: "Making the results last",
        paragraphs: [
          "Washing less often, using lukewarm rather than hot water and choosing a sulfate-free shampoo all help the treatment last longer. Regular conditioning and heat protection keep damage from building up again.",
        ],
      },
    ],
    updated: "2026-11-08",
  },
  {
    slug: "hair-spa",
    parent: "womens-hair",
    category: "hair",
    serviceIds: ["hair-spa"],
    h1: "Hair Spa in Thiruvalla",
    shortName: "Hair spa",
    title: "Hair Spa in Thiruvalla: Scalp Care & Conditioning | Glam'more",
    description:
      "Hair spa with cleansing, a conditioning mask and a relaxing head massage at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    lead: "A cleansing, conditioning and scalp-care treatment with a relaxing head massage.",
    faqTopics: ["Hair Spa"],
    intro: [
      "A hair spa is care for your hair and scalp rather than a change of look. Your hair is cleansed, a conditioning mask chosen for your hair is applied, and the treatment ends with a relaxing head massage. At Glam'more in Thukalassery, Thiruvalla, we start by looking at your hair and scalp so the products suit them.",
      "It is a good fit for dry, dull or tired hair, for hair that is coloured or heat styled, and for anyone who simply wants an hour to unwind. The results are short term, so it works best as regular upkeep.",
    ],
    steps: [
      {
        title: "Hair and scalp check",
        text: "We look at your hair and scalp and ask about dryness, dandruff, itching and any recent treatments, so we choose the right products.",
      },
      {
        title: "Cleanse",
        text: "Your hair and scalp are washed gently to remove build-up from products, oil and dust.",
      },
      {
        title: "Mask and massage",
        text: "A conditioning mask is applied and left to work, with a relaxing head massage as part of the treatment.",
      },
      {
        title: "Rinse and style",
        text: "The mask is rinsed out and your hair is dried and styled. We suggest how often to come back based on your hair.",
      },
    ],
    suits: [
      "Anyone with dry, dull or frizzy hair who wants it to feel softer.",
      "People with coloured, smoothened or heat-styled hair who want to keep it in good condition.",
      "Those who want a relaxing head massage along with hair care.",
      "Anyone who wants fresher-looking hair before a function or a wedding.",
    ],
    tips: [
      "Tell us if your scalp is sensitive, itchy or flaky so we can choose suitable products.",
      "Come with clean, untangled hair if you can, and tell us about any recent colour or chemical treatment.",
      "Use a mild shampoo and a conditioner at home, and avoid very hot water on your hair.",
      "For a longer-lasting change in texture, ask us about hair botox or keratin instead.",
    ],
    updated: "2026-11-08",
  },
  {
    slug: "saree-draping-and-party-makeup",
    parent: "bridal-and-groom-makeup",
    category: "events",
    serviceIds: ["saree-party-makeup"],
    h1: "Saree Draping & Party Makeup in Thiruvalla",
    shortName: "Saree draping & party makeup",
    title: "Saree Draping & Party Makeup in Thiruvalla | Glam'more",
    description:
      "Saree draping, evening party makeup and hairstyling for wedding guests, Holy Communion and receptions at Glam'more Premium Unisex Salon, Thukalassery, Thiruvalla.",
    lead: "Saree draping, party makeup and hairstyling for wedding guests, Holy Communion and receptions.",
    faqTopics: ["Party Makeup & Saree Draping"],
    intro: [
      "You do not have to be the bride to want to look your best at a wedding, a Holy Communion or a reception. At Glam'more in Thukalassery, Thiruvalla, we drape your saree, do your party makeup and style your hair, so you can walk in ready and not worry about pins slipping or makeup fading.",
      "The look is planned around your outfit and the occasion: softer for a daytime church function, more defined for an evening reception. Tell us what you are wearing and we will suggest what works.",
    ],
    steps: [
      {
        title: "Tell us the occasion",
        text: "Message us the date, the time of the function and what you are wearing, with a photo of the saree and blouse if you can.",
      },
      {
        title: "Makeup and hair",
        text: "Your makeup is chosen to suit your skin and outfit, and your hair is styled to go with the saree and any jewellery.",
      },
      {
        title: "Saree draping",
        text: "The saree is draped neatly and pinned so the pleats sit well and it stays comfortable to wear through the event.",
      },
      {
        title: "Final check",
        text: "A last look at the drape, makeup and hair before you leave, so you are ready for photographs.",
      },
    ],
    suits: [
      "Guests attending weddings, engagements and receptions.",
      "Families getting ready for Holy Communion and other church functions.",
      "Anyone who wants a neat saree drape that stays in place all day.",
      "Groups of family or friends who want to be ready at the same time.",
    ],
    tips: [
      "Bring the saree, blouse, petticoat and any pins or jewellery you plan to wear.",
      "Wear a blouse that fits properly, since it affects how the drape sits.",
      "Come with clean, dry hair and a moisturised face.",
      "Book early for wedding season and for groups, so everyone gets a slot before the function.",
    ],
    updated: "2026-11-10",
  },
];

export const servicePageBySlug = (slug: string) => servicePages.find((p) => p.slug === slug);
export const servicePageByCategory = (category: CategoryId) => servicePages.find((p) => p.category === category);

/** The page that explains one service: its own detail page if it has one, else its group page. */
export const servicePageForService = (service: { id: string; category: CategoryId }) =>
  servicePages.find((p) => p.serviceIds?.includes(service.id)) ?? servicePageByCategory(service.category);

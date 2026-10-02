"use client";
import ScrollReveal from "./ScrollReveal";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
  /** Optional topic; questions with the same topic are grouped under one heading. */
  topic?: string;
}

// Shown when Sanity has no FAQs. Two kinds of questions: "do you offer…" questions for local search,
// and the practical how-long / how-often / how-to-prepare questions people ask about each service.
// Timings are typical ranges, not guarantees; they vary with hair, skin and aftercare.
export const fallbackFaqs: FAQItem[] = [
  // ── About the Salon ──
  {
    topic: "About the Salon",
    question: "Where is Glam'more Premium Unisex Salon in Thiruvalla?",
    answer:
      "Glam'more is on the first floor of the Professional Building on SH 1 (Kollam–Theni Highway) at Thukalassery, Thiruvalla, Kerala 689115. It's easy to reach from Thiruvalla town, Changanassery, Chengannur, and Pathanamthitta. Search \"Glam'more Premium Unisex Salon\" on Google Maps for directions.",
  },
  {
    topic: "About the Salon",
    question: "Is Glam'more a salon for both men and women?",
    answer:
      "Yes. Glam'more is a unisex salon. We offer haircuts, beard styling, and grooming for men, and hair, makeup, skin, and nail services for women.",
  },
  {
    topic: "About the Salon",
    question: "What are Glam'more's opening hours?",
    answer:
      "We're open every day, including Sundays, from 10:00 AM to 8:30 PM.",
  },
  {
    topic: "About the Salon",
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "Walk-ins are welcome when a chair is free. To avoid waiting, especially on weekends and before festivals, book ahead on WhatsApp at +91 96459 15329 or through the Services page.",
  },
  {
    topic: "About the Salon",
    question: "How can I book an appointment at Glam'more?",
    answer:
      "Choose your services on our Services page and send the booking to us on WhatsApp, or message us directly at +91 96459 15329.",
  },

  // ── Hair: Cuts & Care ──
  {
    topic: "Hair Cuts & Care",
    question: "What hair services do you offer?",
    answer:
      "Women's haircuts, hair colouring (global colour, highlights, and grey coverage), keratin treatments, hair smoothening, occasion hairstyling, and human hair extensions. Men's haircuts are part of our Men's Grooming services.",
  },
  {
    topic: "Hair Cuts & Care",
    question: "How often should I get a haircut?",
    answer:
      "Most people trim every 6 to 8 weeks to keep the shape and remove split ends. Short, sharp styles lose their shape sooner (every 4 to 6 weeks), while long hair that you're growing out can often wait 10 to 12 weeks for a trim. If your ends feel dry or tangle easily, that's your sign.",
  },
  {
    topic: "Hair Cuts & Care",
    question: "Should I bring a reference photo to my haircut?",
    answer:
      "Yes, it helps a lot. Bring two or three photos, ideally showing the front and side, and mention what you don't like too. The stylist can then tell you honestly whether the cut suits your hair texture, density and face shape, and adjust it so it works for you day to day, not just in the photo.",
  },
  {
    topic: "Hair Cuts & Care",
    question: "How do I choose a haircut that suits my face shape?",
    answer:
      "As a rough guide: layers and side-swept fringes soften a square or strong jaw, length and volume at the crown balance a round face, and fuller sides suit a long face. Hair texture matters as much as face shape, because curly or fine hair behaves differently, so ask your stylist to assess both before cutting.",
  },

  // ── Hair Colour ──
  {
    topic: "Hair Colour",
    question: "How long does hair colour last?",
    answer:
      "Permanent colour doesn't wash out, but roots show as your hair grows, so most people touch up roots every 4 to 6 weeks. Highlights and balayage grow out more softly and usually need refreshing every 2 to 3 months. Semi-permanent colour fades gradually over several weeks of washing.",
  },
  {
    topic: "Hair Colour",
    question: "Will colouring damage my hair?",
    answer:
      "Adding colour without lightening is gentle on most hair. Lightening (bleach), which is needed for highlights or going much lighter, is what causes dryness and breakage. Healthy hair handles it well when it's done carefully, spaced out, and followed with conditioning treatments, so tell your stylist about any previous colouring or smoothening.",
  },
  {
    topic: "Hair Colour",
    question: "How can I make my hair colour last longer?",
    answer:
      "Wash less often, use lukewarm or cool water, and choose a shampoo made for coloured hair. Use a heat protectant before blow-drying or ironing, condition regularly, and cover your hair in strong sun. Fading is mostly caused by hot water, frequent washing and sun exposure.",
  },
  {
    topic: "Hair Colour",
    question: "Do I need a patch test before colouring my hair?",
    answer:
      "Yes, if you've never used that colour product. Hair dye can cause allergic reactions in some people, and the standard advice is a small skin patch test about 48 hours beforehand. Always tell your stylist about past reactions, a sensitive scalp, or any recent treatments.",
  },

  // ── Keratin & Hair Smoothening ──
  {
    topic: "Keratin & Hair Smoothening",
    question: "What is the difference between keratin and hair smoothening?",
    answer:
      "Keratin treatment reduces frizz and adds shine while keeping some natural movement. Hair smoothening gives a straighter, sleeker finish. Our stylists will check your hair type and recommend the one that suits you.",
  },
  {
    topic: "Keratin & Hair Smoothening",
    question: "How long does a keratin treatment last?",
    answer:
      "Typically 3 to 5 months, depending on your hair type, how often you wash it and which shampoo you use. It fades gradually rather than all at once, and hair growing from the roots stays natural, so you'll see the contrast in time.",
  },
  {
    topic: "Keratin & Hair Smoothening",
    question: "How long should I wait to wash my hair after keratin?",
    answer:
      "Commonly 2 to 3 days, and during that time you're usually asked not to tie, clip or tuck your hair behind your ears. The exact instructions depend on the product used, so follow what your stylist tells you on the day. After that, a sulfate-free shampoo helps the treatment last.",
  },
  {
    topic: "Keratin & Hair Smoothening",
    question: "Can I colour my hair after keratin?",
    answer:
      "It's usually better to colour first and do keratin afterwards, or to wait around two weeks after keratin before colouring. Colouring too soon can affect both the shade and how long the treatment lasts. Tell us what you plan to do and we'll suggest the best order.",
  },
  {
    topic: "Keratin & Hair Smoothening",
    question: "Are keratin treatments safe, and what about during pregnancy?",
    answer:
      "Some smoothening and keratin products release fumes that can irritate the eyes and lungs, so ask which product is being used and make sure the room is well ventilated. If you are pregnant or breastfeeding, check with your doctor first before any chemical hair treatment.",
  },

  // ── Hair Extensions ──
  {
    topic: "Hair Extensions",
    question: "How long do hair extensions last?",
    answer:
      "It depends on the type and how you care for them. Clip-in extensions can be reused many times, while longer-wear methods are worn for weeks to months before they need to be moved up or removed. Good brushing, gentle washing and avoiding heat damage make the biggest difference.",
  },
  {
    topic: "Hair Extensions",
    question: "Will extensions damage my own hair?",
    answer:
      "Not when they are fitted well, kept light, brushed properly and removed correctly. Problems usually come from extensions that are too heavy for your hair, left in too long, or removed at home. Tell us how much length or volume you want so we can recommend what your hair can comfortably carry.",
  },

  // ── Bridal & Groom ──
  {
    topic: "Bridal & Groom",
    question: "Do you offer bridal makeup in Thiruvalla?",
    answer:
      "Yes. We do Kerala bridal makeup in HD and airbrush, with bridal hairstyling and saree draping. We can also get the bride's family and bridal party ready on the wedding day.",
  },
  {
    topic: "Bridal & Groom",
    question: "Do you offer groom makeup and styling?",
    answer:
      "Yes. Groom styling for the wedding day includes hair, beard trim and shaping, and light, natural makeup for photos.",
  },
  {
    topic: "Bridal & Groom",
    question: "How early should I book bridal makeup?",
    answer:
      "Book as early as you can once your wedding date is fixed, ideally one to three months ahead, especially during the wedding season. We recommend a trial session a few weeks before the wedding.",
  },
  {
    topic: "Bridal & Groom",
    question: "What is the difference between HD and airbrush bridal makeup?",
    answer:
      "HD makeup uses camera-friendly formulas applied with brushes and sponges, and gives fuller, more defined coverage. Airbrush sprays a very fine mist of makeup, giving a thin, even, lightweight finish. Neither is better for everyone: it depends on your skin, the look you want and how long the day is, so try both at your trial.",
  },
  {
    topic: "Bridal & Groom",
    question: "What happens at a bridal makeup trial?",
    answer:
      "You discuss the look you want, bring reference photos, and the artist tries makeup and hair on you so you can adjust before the big day. Wear a similar neckline to your wedding outfit if you can, and bring jewellery or a dupatta reference so the colours and style work together. Do it a few weeks before the wedding.",
  },
  {
    topic: "Bridal & Groom",
    question: "How do I make bridal makeup last through a hot, humid wedding day?",
    answer:
      "Good skin prep is half of it: cleanse, moisturise and use a primer suited to your skin type. Ask for long-wear or waterproof products, set the makeup well, and keep blotting papers and a few touch-up items with someone close by. Avoid trying new skincare or treatments in the week before the wedding.",
  },
  {
    topic: "Bridal & Groom",
    question: "Do you offer pre-bridal packages?",
    answer:
      "Yes. Pre-bridal care can include facials, de-tan, keratin or smoothening, waxing, threading, manicure, and pedicure, planned over the weeks before your wedding. Message us on WhatsApp and we'll suggest a plan.",
  },
  {
    topic: "Bridal & Groom",
    question: "How should a groom prepare for the wedding day?",
    answer:
      "Get the haircut 3 to 5 days before so it settles, and trim the beard the day before or on the morning itself for sharp lines. A clean-up or facial a few days ahead helps skin look even in photos, and moisturising daily keeps it from looking dry or patchy under makeup.",
  },

  // ── Facials & De-tan ──
  {
    topic: "Facials & De-tan",
    question: "Do you offer facials and de-tan treatments?",
    answer:
      "Yes. We offer facials for different skin types, plus de-tan and clean-up treatments to lift sun tan and refresh dull skin.",
  },
  {
    topic: "Facials & De-tan",
    question: "How often should I get a facial?",
    answer:
      "About once every 4 weeks is a good rhythm for most people, because skin renews itself roughly every month. If your skin is very sensitive, or you're using strong active products, space them further apart, and tell the therapist what's in your routine.",
  },
  {
    topic: "Facials & De-tan",
    question: "What should I expect at my first facial?",
    answer:
      "The therapist looks at your skin type and concerns, then typically cleanses, exfoliates, may steam and clear blocked pores if needed, gives a face massage, applies a mask and finishes with moisturiser and sun protection. Come without heavy makeup if possible and mention allergies or skin conditions beforehand.",
  },
  {
    topic: "Facials & De-tan",
    question: "What is de-tan, and who needs it?",
    answer:
      "De-tan treatments are designed to lift surface tan caused by sun exposure, so they suit anyone who has been outdoors a lot, travelled, or wants an even-looking face and neck before an event. It can take a few sessions for a deep tan, and daily sunscreen afterwards stops it coming straight back.",
  },
  {
    topic: "Facials & De-tan",
    question: "Can I get a facial with sensitive skin or acne, and when should I have one before an event?",
    answer:
      "Yes, but tell your therapist first so they can pick gentle products and avoid heavy extractions on inflamed spots. For an event, have your facial about 3 to 7 days before so any redness settles, and don't try new products or treatments the day before.",
  },

  // ── Spa & Massage ──
  {
    topic: "Spa & Massage",
    question: "Do you offer massage in Thiruvalla?",
    answer:
      "Yes. We offer full-body relaxation massage and head-and-shoulder massage in a private treatment room.",
  },
  {
    topic: "Spa & Massage",
    question: "What is the difference between a body massage and a head-and-shoulder massage?",
    answer:
      "A body massage works across the whole body for deep relaxation, while a head-and-shoulder massage is shorter and focuses on the scalp, neck and shoulders, where most people carry desk and screen tension. It's a good choice when you don't have time for a full session.",
  },
  {
    topic: "Spa & Massage",
    question: "How should I prepare for a massage?",
    answer:
      "Avoid a heavy meal just before, drink some water, and arrive a few minutes early to settle. Tell the therapist about pain, injuries, skin problems or health conditions, and say if the pressure is too light or too firm at any point: you can always ask them to adjust.",
  },
  {
    topic: "Spa & Massage",
    question: "Is massage safe during pregnancy or with health conditions?",
    answer:
      "It depends. If you are pregnant, have heart or circulation problems, a recent injury or surgery, or any condition affecting your skin or joints, check with your doctor first and let the therapist know before the session so they can adapt or advise against it.",
  },

  // ── Nails ──
  {
    topic: "Nails",
    question: "Do you do acrylic nails and nail art?",
    answer:
      "Yes. We do acrylic nail extensions, custom nail art, gel manicures, and spa pedicures.",
  },
  {
    topic: "Nails",
    question: "What is the difference between gel and acrylic nails?",
    answer:
      "Gel polish is a long-wear coat applied over your natural nail and cured under a lamp, so it's thin and flexible. Acrylic is a stronger, sculpted material used to add length and shape. Choose gel for a glossy natural-length manicure and acrylic if you want extensions.",
  },
  {
    topic: "Nails",
    question: "How long does a gel manicure last?",
    answer:
      "Usually around 2 to 3 weeks without chipping, depending on how hard you use your hands. Wearing gloves for washing and cleaning, and not using your nails as tools, helps it last longer and keeps the edges from lifting.",
  },
  {
    topic: "Nails",
    question: "How often do acrylic nails need a fill, and do they damage natural nails?",
    answer:
      "Acrylics usually need a fill every 2 to 3 weeks as your natural nail grows out. They don't have to damage your nails when applied and removed properly, but peeling or pulling them off does. Always have them soaked off and removed professionally.",
  },
  {
    topic: "Nails",
    question: "How should I prepare for a manicure or pedicure?",
    answer:
      "Come with your old polish removed if you can, and don't cut your cuticles yourself beforehand, as that raises the risk of infection. For a pedicure, avoid shaving your legs just before. Tell us about any cuts, fungal infection or skin conditions on your hands or feet so we can advise.",
  },

  // ── Brows, Lashes & Waxing ──
  {
    topic: "Brows, Lashes & Waxing",
    question: "Do you offer eyebrow threading, eyelash extensions, and waxing?",
    answer:
      "Yes. We offer eyebrow threading, classic and volume eyelash extensions, and full-body and facial waxing using wax suited to sensitive skin.",
  },
  {
    topic: "Brows, Lashes & Waxing",
    question: "Should I choose threading or waxing for my eyebrows?",
    answer:
      "Threading is more precise for shaping and works well on small areas and fine hairs, and it uses no wax or chemicals. Waxing is quicker over larger areas. Both last roughly 3 to 4 weeks on the brows, so choose based on your skin sensitivity and the shape you want.",
  },
  {
    topic: "Brows, Lashes & Waxing",
    question: "Does threading hurt?",
    answer:
      "There's a quick, sharp sting for a few seconds, and it's usually most noticeable the first time. It gets easier with regular sessions. Avoid threading if your skin is sunburnt, irritated or has been treated with strong skincare actives recently, and tell us beforehand if you're sensitive.",
  },
  {
    topic: "Brows, Lashes & Waxing",
    question: "How long does waxing last, and does hair grow back thicker?",
    answer:
      "Waxing typically keeps skin smooth for 3 to 6 weeks, because hair is removed from the root. Hair does not grow back thicker or darker: that's a myth. With regular waxing, regrowth often looks finer and sparser over time.",
  },
  {
    topic: "Brows, Lashes & Waxing",
    question: "How should I prepare for waxing, and what should I do afterwards?",
    answer:
      "Hair should be about 0.5 cm (a quarter inch) long, roughly 2 to 3 weeks of growth, and skin clean and dry. Exfoliate gently the day before. For 24 hours afterwards avoid sun, hot showers, saunas, heavy workouts and tight clothes, and don't scrub or apply perfumed products on the area.",
  },
  {
    topic: "Brows, Lashes & Waxing",
    question: "How long do eyelash extensions last, and how do I look after them?",
    answer:
      "Extensions shed naturally with your own lashes, which renew over about 6 to 8 weeks, so most people have a fill every 2 to 3 weeks. Keep them dry for the first 24 hours, avoid oil-based cleansers and waterproof mascara, never pull or pick at them, and brush them gently with a clean spoolie.",
  },

  // ── Men's Grooming ──
  {
    topic: "Men's Grooming",
    question: "Do you offer men's haircuts, beard styling and shaving?",
    answer:
      "Yes. We offer men's haircuts, hot-towel shaves, and beard shaping and edging, and we're happy to suggest a style that suits your face.",
  },
  {
    topic: "Men's Grooming",
    question: "How often should men get a haircut?",
    answer:
      "Short, tapered or faded cuts look best with a visit every 3 to 4 weeks, as the shape grows out quickly. Medium and longer styles can go 4 to 6 weeks. If you notice the neckline and sides getting untidy before the top does, that's the time to book.",
  },
  {
    topic: "Men's Grooming",
    question: "How do I choose a beard style, and how often should I trim?",
    answer:
      "Your face shape and how densely your beard grows decide what works: fuller sides can balance a long face, while a defined jawline and neat edges suit most shapes. Tidy the neckline and cheek lines every 1 to 2 weeks, and have the shape set properly by a barber every month or so.",
  },
  {
    topic: "Men's Grooming",
    question: "What is a hot-towel shave, and why is it better?",
    answer:
      "A warm towel softens the hair and opens the skin before the razor, so the shave is closer and more comfortable with less irritation. It's finished with a cooling towel and moisturiser. It's a good choice before a wedding or event, and if you get razor bumps with ordinary shaving.",
  },
];

export default function FAQ({
  faqs = [],
  asPage = false,
}: {
  faqs?: FAQItem[];
  /** On the standalone /faq page the heading is the page's h1. */
  asPage?: boolean;
}) {
  const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs;
  const Heading = asPage ? "h1" : "h2";

  // Group by topic, keeping the original order. Questions without a topic form one plain list.
  const groups: { topic: string | null; items: { faq: FAQItem; index: number }[] }[] = [];
  displayFaqs.forEach((faq, index) => {
    const topic = faq.topic ?? null;
    let group = groups.find((g) => g.topic === topic);
    if (!group) {
      group = { topic, items: [] };
      groups.push(group);
    }
    group.items.push({ faq, index });
  });

  return (
    <section className="faq-section" id="faq">
      <ScrollReveal direction="up">
        <div className="section-title faq-title-container">
          <Heading className="gold-section-heading">Frequently Asked Questions</Heading>
          {asPage && (
            <p className="faq-intro">
              Straight answers to what people ask us most about hair, bridal makeup, skin, nails, waxing and men&apos;s grooming, plus how to find and book us in Thiruvalla. Timings are typical ranges: your hair, skin and aftercare can change them, so ask your stylist about your own case.
            </p>
          )}
        </div>
      </ScrollReveal>

      {/* CENTERED FAQ ACCORDIONS, GROUPED BY TOPIC */}
      <ScrollReveal direction="up" delay={200}>
        <div className="faq-right">
          {groups.map((group, gi) => (
            <div className="faq-topic-group" key={group.topic ?? "all"}>
              {group.topic && <h2 className="faq-topic">{group.topic}</h2>}
              <Accordion
                defaultValue={gi === 0 ? [`faq-${group.items[0].index}`] : []}
                className="faq-accordion-group"
              >
                {group.items.map(({ faq, index }) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="faq-card">
                    <AccordionTrigger className="faq-question">
                      <h3>{faq.question}</h3>
                    </AccordionTrigger>
                    <AccordionContent className="faq-answer">
                      <div className="faq-answer-inner">
                        <p>{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* FAQPage Structured Data Schema for Google, Bing and AI Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": displayFaqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }).replace(/</g, "\\u003c")
        }}
      />
    </section>
  );
}

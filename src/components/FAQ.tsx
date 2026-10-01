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
}

// Shown when Sanity has no FAQs. Written around what people search for locally.
export const fallbackFaqs: FAQItem[] = [
  {
    question: "Where is Glam'more Unisex Salon in Thiruvalla?",
    answer:
      "Glam'more is on the first floor of the Professional Building on SH 1 (Kollam–Theni Highway) at Thukalassery, Thiruvalla, Kerala 689115. It's easy to reach from Thiruvalla town, Changanassery, Chengannur, and Pathanamthitta. Search \"Glam'more Unisex Salon\" on Google Maps for directions.",
  },
  {
    question: "What are Glam'more's opening hours?",
    answer:
      "We're open every day, including Sundays, from 10:00 AM to 8:30 PM.",
  },
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "Walk-ins are welcome when a chair is free. To avoid waiting, especially on weekends and before festivals, book ahead on WhatsApp at +91 96459 15329 or through the Services page.",
  },
  {
    question: "Is Glam'more a salon for both men and women?",
    answer:
      "Yes. Glam'more is a unisex salon. We offer haircuts, beard styling, and grooming for men, and hair, makeup, skin, and nail services for women.",
  },
  {
    question: "Do you offer bridal makeup in Thiruvalla?",
    answer:
      "Yes. We do Kerala bridal makeup in HD and airbrush, with bridal hairstyling and saree draping. We can also get the bride's family and bridal party ready on the wedding day.",
  },
  {
    question: "How early should I book bridal makeup?",
    answer:
      "Book as early as you can once your wedding date is fixed, ideally one to three months ahead, especially during the wedding season. We recommend a trial session a few weeks before the wedding.",
  },
  {
    question: "Do you offer pre-bridal packages?",
    answer:
      "Yes. Pre-bridal care can include facials, de-tan, keratin or smoothening, waxing, threading, manicure, and pedicure, planned over the weeks before your wedding. Message us on WhatsApp and we'll suggest a plan.",
  },
  {
    question: "What hair services do you offer?",
    answer:
      "Haircuts for men and women, hair colouring (global colour, highlights, and grey coverage), keratin treatments, hair smoothening, occasion hairstyling, and human hair extensions.",
  },
  {
    question: "What is the difference between keratin and hair smoothening?",
    answer:
      "Keratin treatment reduces frizz and adds shine while keeping some natural movement. Hair smoothening gives a straighter, sleeker finish. Our stylists will check your hair type and recommend the one that suits you.",
  },
  {
    question: "Do you offer facials and de-tan treatments?",
    answer:
      "Yes. We offer facials for different skin types, plus de-tan and clean-up treatments to lift sun tan and refresh dull skin.",
  },
  {
    question: "Do you offer massage in Thiruvalla?",
    answer:
      "Yes. We offer full-body relaxation massage and head-and-shoulder massage in a private treatment room.",
  },
  {
    question: "Do you do acrylic nails and nail art?",
    answer:
      "Yes. We do acrylic nail extensions, custom nail art, gel manicures, and spa pedicures.",
  },
  {
    question: "Do you offer eyebrow threading, eyelash extensions, and waxing?",
    answer:
      "Yes. We offer eyebrow threading, classic and volume eyelash extensions, and full-body and facial waxing using wax suited to sensitive skin.",
  },
  {
    question: "Do you offer beard styling and shaving for men?",
    answer:
      "Yes. We offer hot-towel shaves, beard shaping and edging, and men's haircuts, and we're happy to suggest a style that suits your face.",
  },
  {
    question: "How can I book an appointment at Glam'more?",
    answer:
      "Choose your services on our Services page and send the booking to us on WhatsApp, or message us directly at +91 96459 15329.",
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

  return (
    <section className="faq-section" id="faq">
      <ScrollReveal direction="up">
        <div className="section-title faq-title-container">
          <Heading className="gold-section-heading">Frequently Asked Questions</Heading>
        </div>
      </ScrollReveal>

      {/* CENTERED FAQ ACCORDIONS */}
      <ScrollReveal direction="up" delay={200}>
        <div className="faq-right">
          <Accordion defaultValue={["faq-0"]} className="faq-accordion-group">
            {displayFaqs.map((faq, index) => {
              const itemValue = `faq-${index}`;
              return (
                <AccordionItem key={index} value={itemValue} className="faq-card">
                  <AccordionTrigger className="faq-question">
                    <h3>{faq.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
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
          })
        }}
      />
    </section>
  );
}

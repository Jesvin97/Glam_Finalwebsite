"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  const fallbackFaqs = [
    {
      question: "What makes Glam'more the unisex salon in Thiruvalla?",
      answer:
        "Glam'more is recognized as the leading unisex salon in Thiruvalla, offering world-class hair styling, skin therapies, and beauty treatments. Our team of expert stylists and certified therapists use top-tier global products to deliver customized grooming, precision cuts, and luxury beauty services in a pristine environment designed for both men and women.",
    },
    {
      question: "Do you offer professional bridal makeup in Thiruvalla?",
      answer:
        "Yes, we specialize in high-end bridal makeup in Thiruvalla. Our master makeup artists provide custom HD and airbrush bridal makeups, pre-wedding skin preparation treatments, and comprehensive groom makeover packages, all tailored during personalized consultations to ensure you look breathtaking on your special day.",
    },
    {
      question: "What hair care and styling services are available at your salon?",
      answer:
        "As the best hair salon in Thiruvalla, we offer a comprehensive suite of hair care solutions, including precision haircuts, creative hair styling, keratin treatments, hair smoothening, global hair coloring, and organic hair spa therapies. Our master stylists are trained in modern international trends and cater to all hair textures.",
    },
    {
      question: "What are the operating hours for Glam'more Unisex Salon in Thiruvalla?",
      answer:
        "Glam'more Unisex Salon in Thiruvalla is open every day from Monday to Sunday, from 10:00 AM to 9:30 PM (including Sundays). We recommend booking your appointments in advance to secure your preferred master stylist, although walk-in clients are always welcome based on seat availability.",
    },
    {
      question: "Do you provide premium nail art and pedicure services?",
      answer:
        "Yes, we are a fully equipped nail art salon in Thiruvalla. Our services include high-quality acrylic gel nail extensions, custom nail art designs, spa pedicures, and pampering manicures. We use safe, long-lasting gel polishes to keep your nails looking flawless, strong, and beautiful.",
    },
  ];

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const query = `*[_type == "faq"] | order(order asc)`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setFaqs(data);
        }
      } catch (err) {
        console.error("Failed to fetch FAQs from Sanity, using fallback:", err);
      }
    }
    fetchFaqs();
  }, []);

  const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs;

  return (
    <section className="faq-section">
      {/* CENTERED HEADER */}
      <div className="section-title" style={{ marginBottom: "40px", width: "100%", textAlign: "center" }}>
        <p>FAQ</p>
      </div>

      {/* CENTERED FAQ ACCORDIONS */}
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
    </section>
  );
}
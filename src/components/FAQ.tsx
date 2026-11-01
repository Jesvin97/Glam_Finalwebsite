"use client";
import ScrollReveal from "./ScrollReveal";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { fallbackFaqs, type FAQItem } from "@/lib/faq-data";
export type { FAQItem };


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

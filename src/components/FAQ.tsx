"use client";
import { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { client } from "@/sanity/client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { useLanguage } from "./LanguageContext";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const { t, language } = useLanguage();

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

  const fallbackFaqsMl = [
    {
      question: "തിരുവല്ലയിൽ ഗ്ലാംമോറിനെ മികച്ച സലൂൺ ആക്കുന്നത് എന്താണ്?",
      answer: "തിരുവല്ലയിലെ ഏറ്റവും പ്രശസ്തമായ യൂണിസെക്സ് സലൂണാണ് ഗ്ലാംമോർ. മികച്ച ഹെയർ സ്റ്റൈലിംഗ്, സ്കിൻ കെയർ തെറാപ്പികൾ, സൗന്ദര്യവർദ്ധക സേവനങ്ങൾ എന്നിവ ഞങ്ങൾ നൽകുന്നു. പ്രൊഫഷണൽ ഹെയർ സ്റ്റൈലിസ്റ്റുകളും മികച്ച ഉൽപ്പന്നങ്ങളുമാണ് ഞങ്ങളുടെ പ്രത്യേകത.",
    },
    {
      question: "തിരുവല്ലയിൽ വിവാഹ മേക്കപ്പ് സേവനങ്ങൾ നൽകുന്നുണ്ടോ?",
      answer: "അതെ, ഞങ്ങൾ ഉയർന്ന നിലവാരത്തിലുള്ള ബ്രൈഡൽ മേക്കപ്പ് സേവനങ്ങൾ നൽകുന്നു. എച്ച്ഡി (HD), എയർബ്രഷ് മേക്കപ്പ്, വിവാഹത്തിന് മുന്നോടിയായുള്ള ഫേഷ്യലുകൾ എന്നിവ ഞങ്ങളുടെ പ്രത്യേകതകളാണ്.",
    },
    {
      question: "എന്തൊക്കെ ഹെയർ സ്റ്റൈലിംഗ് സേവനങ്ങളാണ് ഇവിടെ ലഭ്യമായിട്ടുള്ളത്?",
      answer: "കൃത്യതയാർന്ന ഹെയർകട്ടുകൾ, ഹെയർ സ്റ്റൈലുകൾ, ഹെയർ സ്മൂത്തനിംഗ്, കെരാറ്റിൻ ട്രീറ്റ്മെന്റുകൾ, ഹെയർ സ്പാകൾ എന്നിവ ഞങ്ങൾ നൽകുന്നു.",
    },
    {
      question: "ഗ്ലാംമോർ സലൂണിന്റെ പ്രവർത്തന സമയം എപ്പോഴൊക്കെയാണ്?",
      answer: "ഞങ്ങൾ തിങ്കൾ മുതൽ ഞായർ വരെ എല്ലാ ദിവസവും രാവിലെ 10:00 മുതൽ രാത്രി 9:30 വരെ പ്രവർത്തിക്കുന്നു. ബുക്കിംഗുകൾ മുൻകൂട്ടി ചെയ്യുവാൻ ഞങ്ങൾ നിർദ്ദേശിക്കുന്നു.",
    },
    {
      question: "നിങ്ങൾ നെയിൽ ആർട്ടും പെഡിക്യൂർ സേവനങ്ങളും നൽകാറുണ്ടോ?",
      answer: "അതെ, തിരുവല്ലയിലെ ഏറ്റവും മികച്ച നെയിൽ സ്റ്റുഡിയോയാണ് ഞങ്ങളുടേത്. അക്രിലിക് ജെൽ നെയിൽ എക്സ്റ്റൻഷൻ, പെഡിക്യൂർ, മാനിക്യൂർ സേവനങ്ങൾ എന്നിവ ഞങ്ങൾ നൽകുന്നു.",
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

  const displayFaqs = language === "ml"
    ? (faqs.length > 0 ? faqs : fallbackFaqsMl)
    : (faqs.length > 0 ? faqs : fallbackFaqs);

  return (
    <section className="faq-section">
      <ScrollReveal direction="up">
        <div className="section-title faq-title-container">
          <h2 className="gold-section-heading">
            {t("faqTitle")}
          </h2>
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
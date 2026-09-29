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

export default function FAQ({ faqs = [] }: { faqs?: FAQItem[] }) {
  const fallbackFaqs = [
    {
      question: "Where is Glam'more Unisex Salon in Thiruvalla?",
      answer:
        "We're on the first floor of the Professional Building on SH 1 (Kollam–Theni Highway) at Thukalassery, Thiruvalla, Kerala 689115. It's easy to reach from Thiruvalla town, Changanassery, Chengannur, and Pathanamthitta, and you can find us on Google Maps as Glam'more Unisex Salon.",
    },
    {
      question: "Do you offer bridal makeup in Thiruvalla?",
      answer:
        "Yes. We do Kerala bridal makeup in HD and airbrush, along with bridal hairstyling, saree draping, and pre-bridal facials. We can also get the bride's family and bridal party ready on the day. Message us on WhatsApp to book a consultation or trial.",
    },
    {
      question: "What hair services do you offer for men and women?",
      answer:
        "Haircuts for men and women, hair colouring (global colour, highlights, and grey coverage), keratin treatments, hair smoothening, occasion hairstyling, and human hair extensions.",
    },
    {
      question: "Do you offer facials, de-tan, and massage?",
      answer:
        "Yes. We offer facials for different skin types, de-tan and clean-up treatments, and body and head-and-shoulder massages in a private treatment room.",
    },
    {
      question: "Do you do nail extensions, manicures, and pedicures?",
      answer:
        "Yes. We do acrylic nail extensions, nail art, gel manicures, and spa pedicures.",
    },
    {
      question: "What are Glam'more's opening hours?",
      answer:
        "We're open every day, 8:30 AM to 8:00 PM. Walk-ins are welcome when a chair is free, but booking ahead on WhatsApp (+91 96459 15329) means you won't have to wait.",
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
      answer: "ഞങ്ങൾ തിങ്കൾ മുതൽ ഞായർ വരെ എല്ലാ ദിവസവും രാവിലെ 8:30 മുതൽ രാത്രി 8:00 വരെ പ്രവർത്തിക്കുന്നു. ബുക്കിംഗുകൾ മുൻകൂട്ടി ചെയ്യുവാൻ ഞങ്ങൾ നിർദ്ദേശിക്കുന്നു.",
    },
    {
      question: "നിങ്ങൾ നെയിൽ ആർട്ടും പെഡിക്യൂർ സേവനങ്ങളും നൽകാറുണ്ടോ?",
      answer: "അതെ, തിരുവല്ലയിലെ ഏറ്റവും മികച്ച നെയിൽ സ്റ്റുഡിയോയാണ് ഞങ്ങളുടേത്. അക്രിലിക് ജെൽ നെയിൽ എക്സ്റ്റൻഷൻ, പെഡിക്യൂർ, മാനിക്യൂർ സേവനങ്ങൾ എന്നിവ ഞങ്ങൾ നൽകുന്നു.",
    },
  ];

  const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs;

  return (
    <section className="faq-section">
      <ScrollReveal direction="up">
        <div className="section-title faq-title-container">
          <h2 className="gold-section-heading">Frequently Asked Questions</h2>
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
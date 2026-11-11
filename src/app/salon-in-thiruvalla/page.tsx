import LocationLanding, { locationMetadata } from "@/components/LocationLanding";
import { ADDRESS, AREAS_SERVED, HOURS } from "@/lib/site";

const PATH = "/salon-in-thiruvalla";
const TITLE = "Salon in Thiruvalla | Glam'more Premium Unisex Salon";
const DESCRIPTION =
  "Haircuts, hair colour, bridal makeup, facials, massage and nails at Glam'more, Thukalassery, Thiruvalla. Rated 4.9 on Google. Open daily 10 AM to 8:30 PM.";

export const metadata = locationMetadata(PATH, TITLE, DESCRIPTION);

const FAQS = [
  {
    question: "Where is Glam'more located in Thiruvalla?",
    answer: `We are on the first floor of the Professional Building on SH 1 (Kollam - Theni Highway) in Thukalassery, Thiruvalla, near MACFAST, pincode ${ADDRESS.postalCode}.`,
  },
  {
    question: "What are your opening hours?",
    answer: `We are open every day, including Sundays, from ${HOURS.opens} to ${HOURS.closes}.`,
  },
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "Walk-ins are welcome when a chair is free. For weekends, festivals, bridal bookings and longer services, book ahead on WhatsApp so we can keep your time ready.",
  },
  {
    question: "Which areas do your clients come from?",
    answer: `Our clients come from ${AREAS_SERVED.slice(0, -1).join(", ")} and ${AREAS_SERVED[AREAS_SERVED.length - 1]}, as well as Thukalassery and Manjadi.`,
  },
];

export default function Page() {
  return (
    <LocationLanding
      path={PATH}
      title={TITLE}
      h1="Salon in Thiruvalla"
      lead="Glam'more Premium Unisex Salon is on SH 1 in Thukalassery, Thiruvalla, rated 4.9 on Google. Women, men and brides come to us for haircuts, hair colour, bridal makeup, facials, massage, nails, waxing and grooming."
      whyHeading="Your salon in Thukalassery, Thiruvalla"
      whyIntro="Every visit starts with a short consultation. Your stylist looks at your hair, skin and the occasion, and tells you honestly what suits you, even when that is the simpler option."
      whyPoints={[
        "One salon for the whole family: women, men, brides and grooms are all looked after here.",
        "Rated 4.9 on Google, with reviews that mention our staff, our hair colour and hair botox work, and our facials.",
        "A hygiene-first process, with chemical treatments planned around your hair's condition.",
        `Open every day, including Sundays, from ${HOURS.opens} to ${HOURS.closes}.`,
      ]}
      faqHeading="Questions about our salon in Thiruvalla"
      faqs={FAQS}
    />
  );
}

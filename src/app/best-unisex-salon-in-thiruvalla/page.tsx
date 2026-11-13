import LocationLanding, { locationMetadata } from "@/components/LocationLanding";
import { HOURS } from "@/lib/site";

const PATH = "/best-unisex-salon-in-thiruvalla";
const TITLE = "Best Unisex Salon in Thiruvalla for Men & Women | Glam'more";
const DESCRIPTION =
  "A unisex salon in Thiruvalla for men, women and couples: haircuts, shaves and beard styling, hair colour, facials and massage. Glam'more, rated 4.9 on Google.";

export const metadata = locationMetadata(PATH, TITLE, DESCRIPTION);

const FAQS = [
  {
    question: "What is a unisex salon?",
    answer:
      "A unisex salon serves both men and women in the same place. At Glam'more you can get a men's haircut and beard trim, while the rest of the family has hair colour, a facial or a pedicure, all in one visit.",
  },
  {
    question: "What services do you offer for men?",
    answer:
      "Men's haircuts, hot-towel shaves, beard trims and shaping, hair colour, facials and clean-ups, head and shoulder massage, and groom styling for weddings.",
  },
  {
    question: "What services do you offer for women?",
    answer:
      "Haircuts, hair colour and balayage, keratin, hair botox and hair spa, hairstyling, hair extensions, facials, massage, waxing, nails, threading, eyelash extensions, and bridal and party makeup with saree draping.",
  },
  {
    question: "Can couples or families book together?",
    answer:
      "Yes. Tell us how many people are coming and what each person wants when you book on WhatsApp, and we will plan the timings so you can finish around the same time.",
  },
  {
    question: "Is Glam'more open on Sundays?",
    answer: `Yes. We are open every day, including Sundays, from ${HOURS.opens} to ${HOURS.closes}. Weekends are busy, so booking ahead is better.`,
  },
];

export default function Page() {
  return (
    <LocationLanding
      path={PATH}
      title={TITLE}
      h1="Best Unisex Salon in Thiruvalla for Men & Women"
      lead="One salon for the whole family. Glam'more in Thukalassery, Thiruvalla looks after men, women, couples and bridal parties, and is rated 4.9 on Google."
      whyHeading="Why a unisex salon works for families"
      whyIntro="When everyone in the house needs something different, a unisex salon saves a trip. Men's grooming and women's hair and beauty services are both done by trained staff in the same salon."
      whyPoints={[
        "Men: haircuts, hot-towel shaves, beard trims and shaping, with advice on a style that suits your face.",
        "Women: haircuts, colour, keratin, hair botox, facials, massage, waxing and nail care.",
        "Couples and families: book together and plan the timings so you leave around the same time.",
        "Weddings: bride and groom styling and the bridal party, ready on the same morning.",
      ]}
      faqHeading="Questions about our unisex salon in Thiruvalla"
      faqs={FAQS}
    />
  );
}

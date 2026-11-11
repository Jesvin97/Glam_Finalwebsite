import LocationLanding, { locationMetadata } from "@/components/LocationLanding";

const PATH = "/best-salon-in-thiruvalla";
const TITLE = "Best Salon in Thiruvalla for Hair, Bridal & Skin | Glam'more";
const DESCRIPTION =
  "How to choose the best salon in Thiruvalla, and what to expect at Glam'more: honest advice, clear pricing before you visit and a 4.9 Google rating.";

export const metadata = locationMetadata(PATH, TITLE, DESCRIPTION);

const FAQS = [
  {
    question: "How do I choose the best salon in Thiruvalla?",
    answer:
      "Look at recent Google reviews rather than ratings alone, check that the salon asks about your hair or skin before it starts, and ask for the price before you sit down. Visit once for a simple service like a haircut or threading to see how the staff and the hygiene feel.",
  },
  {
    question: "Is Glam'more the best salon in Thiruvalla?",
    answer:
      "We cannot judge that for ourselves. What we can say is that Glam'more is rated 4.9 on Google by over 100 customers, and you can read what they wrote on our Google profile before you decide.",
  },
  {
    question: "Will you tell me the price before the service?",
    answer:
      "Yes. Message us on WhatsApp and we will quote the price before you visit, since it depends on your hair length, your skin and the look you want. Please ask for the full price when you book so there are no surprises at the counter.",
  },
  {
    question: "Which services are people booking most?",
    answer:
      "Hair colouring, hair botox, haircuts, facials and pedicures come up most in our Google reviews, along with bridal makeup and saree draping for weddings and functions.",
  },
  {
    question: "Can I book bridal makeup here?",
    answer:
      "Yes. We do Christian and Hindu bridal makeup in HD or airbrush, with hairstyling and saree draping. Book as early as you can once your date is fixed and plan a trial a few weeks before the wedding.",
  },
];

export default function Page() {
  return (
    <LocationLanding
      path={PATH}
      title={TITLE}
      h1="Best Salon in Thiruvalla for Hair, Skin & Bridal Care"
      lead="Choosing a salon is about trust. Here is what to look for in Thiruvalla, and what you can expect when you book Glam'more in Thukalassery."
      whyHeading="What to look for in a good salon"
      whyIntro="A good salon does not rush you into a service. Before you book anywhere, check for these four things, and judge us by them too."
      whyPoints={[
        "A consultation first: the stylist should look at your hair or skin and ask about earlier colour, smoothening or sensitivities.",
        "Honest advice: you should be told when a treatment does not suit you, and when a simpler option will do.",
        "A clear price: you should know the cost before the service starts, not after.",
        "Recent, real reviews: read the latest Google reviews, including the critical ones and how the owner replied.",
      ]}
      faqHeading="Choosing the best salon in Thiruvalla"
      faqs={FAQS}
    />
  );
}

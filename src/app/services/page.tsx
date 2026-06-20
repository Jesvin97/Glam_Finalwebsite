import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services & Treatments | Glam'more Salon Thiruvalla",
  description: "Explore our full menu of hair cutting, creative coloring, acrylic gel nail extensions, spa pedicures, and skincare treatments at Glam'more.",
};

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

const servicesData: ServiceItem[] = [
    {
      id: "acrylic-nails",
      title: "Acrylic nails",
      category: "nails",
      description: "High-quality, durable acrylic extensions with custom premium nail art and luxury finish at Thiruvalla's top beauty and nail salon.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "body-waxing",
      title: "Body waxing",
      category: "grooming",
      description: "Full body smooth waxing treatment using premium, gentle organic wax for delicate skin, available in Thiruvalla, Kerala.",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "bridal-services",
      title: "Bridal services",
      category: "events",
      description: "Luxury comprehensive Kerala bridal makeup, hair styling, and wellness treatments tailored for your special wedding day in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "eyebrow-shaping",
      title: "Eyebrow shaping",
      category: "grooming",
      description: "Professional eyebrow mapping and precision shaping to perfectly frame your face at Thiruvalla's premier beauty studio.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "eyebrow-threading",
      title: "Eyebrow threading",
      category: "grooming",
      description: "Precision eyebrow threading for ultra-clean, beautifully defined brow contours by expert beauticians in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "eyelashes",
      title: "Eyelashes",
      category: "grooming",
      description: "Premium individual eyelashes and volume extension services for a mesmerizing, natural look in Thiruvalla, Kerala.",
      image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "hair-extensions",
      title: "Hair extensions",
      category: "hair",
      description: "100% natural, premium human hair extensions for length, volume, and custom styling, professionally fitted in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "haircut",
      title: "Haircut",
      category: "hair",
      description: "Precision styling, trend-forward haircuts, and expert hair texturizing for men, women, and kids by master stylists in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "hairstyling",
      title: "Hairstyling",
      category: "hair",
      description: "Luxury blowouts, elegant updos, and custom event hairstyling for all hair types at Thiruvalla's leading unisex salon.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "makeup-services",
      title: "Make-up services",
      category: "events",
      description: "Flawless HD and airbrush makeup styles for celebrity shoots, family events, and parties by professional makeup artists in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "massages",
      title: "Massages",
      category: "skin",
      description: "Deep tissue, aromatherapy, and muscle relief massages in our quiet wellness spa in Thukalassery, Thiruvalla.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "mobile-salon",
      title: "Mobile salon service",
      category: "events",
      description: "Experience premium luxury salon styling, cuts, and bridal makeovers at your home or hotel room anywhere in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "pedicures",
      title: "Pedicures",
      category: "nails",
      description: "Revitalizing foot spa therapy, organic scrub exfoliation, and precision nail care at our premium Thiruvalla nail studio.",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "shampoo-conditioning",
      title: "Shampoo & conditioning",
      category: "hair",
      description: "Deep cleansing hair wash paired with organic hydration conditioning treatment in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "shaving",
      title: "Shaving",
      category: "grooming",
      description: "Traditional hot towel classic shave, beard detailing, styling, and skin hydration for men in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "skincare",
      title: "Skin care",
      category: "skin",
      description: "Advanced facials, organic peels, and custom hydration therapies for glowing skin at our Thiruvalla wellness center.",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "spa-services",
      title: "Spa services",
      category: "skin",
      description: "Premium wellness packages, full-body body scrub therapies, and premium stress relief at the best unisex spa in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "waxing",
      title: "Waxing",
      category: "grooming",
      description: "Fast, gentle precision waxing for facial and body grooming by experienced professionals in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "wedding-prep",
      title: "Wedding and event preparation",
      category: "events",
      description: "Complete hair, skin, and styling packages for Kerala weddings and events in Thiruvalla.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
    },
  ];

export default function Page() {
  return <ServicesClient />;
}

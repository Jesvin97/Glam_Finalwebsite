"use client"

import * as React from "react"
import { client } from "@/sanity/client"
import { urlFor } from "@/sanity/image"
import ScrollReveal from "./ScrollReveal"

// Lightweight classname helper to safely concat classes
function cn(...inputs: unknown[]) {
  return inputs.filter(Boolean).join(" ");
}

export interface Testimonial {
  name: string
  text: string
  avatar?: any
  role?: string
  username?: string
  profileLink?: string
}

export interface TestimonialMarqueeProps {
  items: Testimonial[]
  variant?: "default" | "stacked" | "dual" | "flush" | "flush-dual"
  className?: string
  speed?: number
  containerClassName?: string
}

const MarqueeStyles = React.memo(() => (
  <style>
    {`
    @keyframes marquee-left {
      from { transform: translate3d(0, 0, 0); }
      to { transform: translate3d(-100%, 0, 0); }
    }
    @keyframes marquee-right {
      from { transform: translate3d(-100%, 0, 0); }
      to { transform: translate3d(0, 0, 0); }
    }
    .animate-marquee-left {
       animation: marquee-left var(--duration) linear infinite;
    }
    .animate-marquee-right {
       animation: marquee-right var(--duration) linear infinite;
    }
    `}
  </style>
))
MarqueeStyles.displayName = "MarqueeStyles"

const MarqueeRow = React.memo(({
  children,
  direction = "left",
  speed = 40,
  className,
  pauseOnHover = true
}: {
  children: React.ReactNode,
  direction?: "left" | "right"
  speed?: number,
  className?: string,
  pauseOnHover?: boolean
}) => {
  return (
    <div className={cn("marquee-container", className)}>
      <div
        className={cn("marquee-row",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          "--duration": `${speed}s`,
        } as React.CSSProperties}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn("marquee-row",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          "--duration": `${speed}s`,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  )
})
MarqueeRow.displayName = "MarqueeRow"

const TestimonialCard = React.memo(({ item, variant = "default" }: { item: Testimonial, variant?: "default" | "flush" }) => {
  const isFlush = variant === "flush";

  return (
    <div className={cn("testimonial-card-v2", isFlush && "flush")}>
      <div className="card-gradient-overlay" />

      <div className="testimonial-card-content">
        <p className="testimonial-text-v2">
          {item.text}
        </p>

        <div className="testimonial-user-v2">
          <div className="testimonial-info-v2">
            <span className="testimonial-name-v2">{item.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
})
TestimonialCard.displayName = "TestimonialCard"

export function TestimonialMarquee({ items, variant = "default", className, speed = 30, containerClassName }: TestimonialMarqueeProps) {
  const cnContainer = cn(containerClassName, className)

  const itemsToDisplay = React.useMemo(() => {
    let result = [...items]
    if (result.length === 0) return [];
    while (result.length < 10) {
      result = [...result, ...items]
    }
    return result
  }, [items])

  return (
    <React.Fragment>
      <MarqueeStyles />
      {variant === "dual" ? (
        <div className={cn("testimonial-marquee-wrapper", containerClassName)}>
          <MarqueeRow speed={speed} direction="left" className="group">
            {itemsToDisplay.slice(0, Math.ceil(itemsToDisplay.length / 2)).map((item, i) => <TestimonialCard key={`row1-${i}`} item={item} />)}
          </MarqueeRow>
          <MarqueeRow speed={speed} direction="right" className="group">
            {itemsToDisplay.slice(Math.ceil(itemsToDisplay.length / 2)).map((item, i) => <TestimonialCard key={`row2-${i}`} item={item} />)}
          </MarqueeRow>
        </div>
      ) : variant === "stacked" ? (
        <div className={cn("testimonial-marquee-wrapper stacked-height rotate-negative-2", containerClassName)}>
          <div className="gradient-left-right-overlay" />
          <MarqueeRow speed={speed * 1.5} direction="left" className="group [--gap:0.75rem]">
            {itemsToDisplay.slice(0, Math.ceil(itemsToDisplay.length / 3)).map((item, i) => <TestimonialCard key={`s-row1-${i}`} item={item} />)}
          </MarqueeRow>
          <MarqueeRow speed={speed * 1.2} direction="right" className="group [--gap:0.75rem]">
            {itemsToDisplay.slice(Math.ceil(itemsToDisplay.length / 3), Math.ceil(itemsToDisplay.length / 3) * 2).map((item, i) => <TestimonialCard key={`s-row2-${i}`} item={item} />)}
          </MarqueeRow>
          <MarqueeRow speed={speed * 1.5} direction="left" className="group [--gap:0.75rem]">
            {itemsToDisplay.slice(Math.ceil(itemsToDisplay.length / 3) * 2).map((item, i) => <TestimonialCard key={`s-row3-${i}`} item={item} />)}
          </MarqueeRow>
        </div>
      ) : variant === "flush" ? (
        <div className={cn("testimonial-marquee-wrapper flush-border bg-black-gradient", cnContainer)}>
          <MarqueeRow speed={speed} direction="left" className="group [--gap:0rem] p-0">
            {itemsToDisplay.map((item, i) => <TestimonialCard key={`flush-${i}`} item={item} variant="flush" />)}
          </MarqueeRow>
          <div className="pointer-gradient-left" />
          <div className="pointer-gradient-right" />
        </div>
      ) : variant === "flush-dual" ? (
        <div className={cn("testimonial-marquee-wrapper flush-border bg-black-gradient", containerClassName)}>
          <MarqueeRow speed={speed} direction="left" className="group [--gap:0rem] p-0 border-b border-border">
            {itemsToDisplay.slice(0, Math.ceil(itemsToDisplay.length / 2)).map((item, i) => <TestimonialCard key={`fd-row1-${i}`} item={item} variant="flush" />)}
          </MarqueeRow>
          <MarqueeRow speed={speed} direction="right" className="group [--gap:0rem] p-0">
            {itemsToDisplay.slice(Math.ceil(itemsToDisplay.length / 2)).map((item, i) => <TestimonialCard key={`fd-row2-${i}`} item={item} variant="flush" />)}
          </MarqueeRow>
          <div className="pointer-gradient-left z-10" />
          <div className="pointer-gradient-right z-10" />
        </div>
      ) : (
        <div className={cn("testimonial-marquee-wrapper", cnContainer)}>
          <MarqueeRow speed={speed} direction="left" className="group">
            {itemsToDisplay.map((item, i) => <TestimonialCard key={`default-${i}`} item={item} />)}
          </MarqueeRow>
        </div>
      )}
    </React.Fragment>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);

  const fallbackTestimonials: Testimonial[] = [
    {
      name: "Damsel Kuriakose",
      username: "Local Guide",
      role: "Client",
      text: "I had a wonderful experience bringing both of my daughters to Glam'more Salon for their hair styling! The team was remarkably accommodating, patient, and gentle. Both of their hair styles turned out absolutely beautiful and exceeded our expectations. Highly recommended!",
    },
    {
      name: "PRIYA ELSA",
      username: "priya.elsa",
      role: "Bridal Client",
      text: "Had a wonderful makeover experience at Glam More Unisex Salon for a wedding function. Kathir’s makeup, Salman’s hairstyle, and the beautiful saree draping by Harani were all excellent. I received so many compliments and absolutely loved my look!",
    },
    {
      name: "Ashiq Muhammad",
      username: "ashiq.m",
      role: "Client",
      text: "Hi, I came to Glammore unisex salon in Thukalessery for hair cut and shaving. The service is excellent. The staffs are very friendly. I LOVED THE SERVICE AND IS A MUST TRY FOR EVERYONE.",
    },
    {
      name: "Jaitha Sree",
      username: "jaitha.sree",
      role: "Client",
      text: "I had such a lovely experience! ❤️ I got a detan, veg peel, and threading done, and I’m really happy with the service. The staff were professional, welcoming. A special mention to Lincy Chechi, who was incredibly friendly. Definitely looking forward to visiting again. ✨",
    },
    {
      name: "Devnandhu kurup",
      username: "devnandhu.k",
      role: "Client",
      text: "Had a really good experience. The beard cut came out exactly how I wanted, and they also suggested a style that suited my face better than I expected. The service was friendly, professional, and they paid attention to the small details.",
    },
    {
      name: "Ranjini R",
      username: "ranjini.r",
      role: "Bridal Client",
      text: "I had a wonderful experience with glam more unisex makeup studio and I’m truly 100% satisfied with their work. Lincy did my saree draping beautifully, Kathir did an amazing job with my makeup and hair. The look was flawless. Highly recommended!",
    },
    {
      name: "SHERIN M THOMAS",
      username: "sherin.thomas",
      role: "Client",
      text: "Good service and friendly staff and the manager was very thorough in explaining everything also the owner was so helpful in detailing everything..I recommend this place for everybody (10/10). Mr. sherif did a wonderful job with my hair smoothening..Surely coming back 😍😍",
    },
    {
      name: "Mo Anas",
      username: "mo.anas",
      role: "Bridal Client",
      text: "I took bridal services from glammore and their services were amazing. Took the HD makeup and all the prebridal services. I was really happy that I took the makeup and it made my big day so special. Thank u glammore.",
    },
    {
      name: "Akhil Krishnan",
      username: "Local Guide",
      role: "Client",
      text: "Amazing experience with Anas! He understood my curls perfectly and gave me exactly the haircut I wanted. Really happy with the result.🤍",
    },
    {
      name: "Anu Varghese",
      username: "anu.varghese",
      role: "Client",
      text: "Very nice experience.... Staff very genuin service... Especially lincy doing very gud services... Overall am satisfied",
    },
    {
      name: "jagatheesh jj",
      role: "Client",
      text: "They had done my hair cut . I am more pleasure to review Glam more because they had done an absolute excellence in their work. Staff, ambiance and work are really appreciated. Thank you",
    },
    {
      name: "Sunil Kumar.n",
      role: "Client",
      text: "Had a wonderful experience at Glam’more Unisex Salon. Great ambiance, skilled staff, and top-notch service. Highly recommended for anyone looking for a premium grooming experience. Best of luck with the new venture!❤️",
    },
    {
      name: "Ajith Kumar",
      role: "Client",
      text: "Great experience in Thiruvalla! Mohammed Rashid gave an excellent shave—professional, polite, and skilled. Highly recommended.",
    }
  ];

  React.useEffect(() => {
    async function fetchTestimonials() {
      try {
        const query = `*[_type == "testimonial"]`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials from Sanity, using fallback:", err);
      }
    }
    fetchTestimonials();
  }, []);

  const displayItems = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section className="testimonials-section" id="testimonials">
      <ScrollReveal direction="up">
        <div className="section-title text-center">
          <h2 className="gold-section-heading">
            TESTIMONIALS
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="none" delay={200}>
        <TestimonialMarquee items={displayItems} variant="dual" speed={30} />
      </ScrollReveal>
    </section>
  );
}

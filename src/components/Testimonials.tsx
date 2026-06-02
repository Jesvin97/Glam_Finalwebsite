"use client"

import * as React from "react"
import { client } from "@/sanity/client"
import { urlFor } from "@/sanity/image"

// Lightweight classname helper to safely concat classes
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export interface Testimonial {
  name: string
  text: string
  avatar: any
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

  // Resolve image path safely (either local string or Sanity dynamic URL)
  const imageUrl = (item.avatar && typeof item.avatar !== "string")
    ? urlFor(item.avatar).url()
    : (item.avatar || "/images/model.jpeg");

  return (
    <div className={cn("testimonial-card-v2", isFlush && "flush")}>
      <div className="card-gradient-overlay" />

      <div className="testimonial-card-content">
        <p className="testimonial-text-v2">
          &quot;{item.text}&quot;
        </p>

        <div className="testimonial-user-v2">
          <div className="testimonial-avatar-v2">
            <img src={imageUrl} alt={item.name} loading="eager" />
          </div>
          <div className="testimonial-info-v2">
            <span className="testimonial-name-v2">{item.name}</span>
            {item.username && (
              <span className="testimonial-username-v2">@{item.username}</span>
            )}
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
      name: "Aiswarya Nair",
      username: "aiswarya.nair",
      role: "Bridal Client",
      avatar: "/images/model.jpeg",
      text: "Glam'more is hands down the best salon in Thiruvalla! The bridal makeup and luxury spa session was absolute perfection. Highly recommended!",
    },
    {
      name: "Rohan Mathew",
      username: "rohan.mathew",
      role: "Gold Member",
      avatar: "/images/male model.jpeg",
      text: "The haircut and beard grooming here is outstanding. The staff is professional, the ambiance is luxurious, and the attention to detail is unmatched.",
    },
    {
      name: "Sneha Joseph",
      username: "sneha.joseph",
      role: "Regular Client",
      avatar: "/images/model2.jpeg",
      text: "Their nail art and skincare treatment are world-class. It's a true luxury wellness experience that keeps me coming back every month.",
    },
    {
      name: "Anjali Krishna",
      username: "anjali.krishna",
      role: "Regular Client",
      avatar: "/images/model.jpeg",
      text: "Step into pure luxury! Glam'more's attention to detail, luxury organic products, and highly skilled styling team completely transformed my hair styling routine.",
    },
    {
      name: "Dr. Sandeep Kurian",
      username: "dr.sandeep",
      role: "Gold Member",
      avatar: "/images/male model.jpeg",
      text: "Exceptional service and extremely relaxing ambiance. Their head massage and skincare treatments are absolutely restorative after a busy week.",
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
      <div className="section-title">
        <p>TESTIMONIALS</p>
        <h2>
          What Our
          <span className="gold-text"> Clients Say</span>
        </h2>
      </div>

      <TestimonialMarquee items={displayItems} variant="dual" speed={30} />
    </section>
  );
}

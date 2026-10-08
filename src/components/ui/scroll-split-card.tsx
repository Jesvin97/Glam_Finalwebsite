"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// A small grain texture drawn inline, so the card needs no outside image.
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

interface ScrollSplitCardItem {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  icon?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}

interface ScrollSplitCardProps {
  className?: string;
  imageSrc: string;
  cards: ScrollSplitCardItem[];
  containerRef?: React.RefObject<HTMLElement | null>;
  startText?: string;
  endText?: string;
}

export function ScrollSplitCard({
  className,
  imageSrc,
  cards,
  containerRef: externalContainerRef,
  startText = "Scroll down",
  endText,
}: ScrollSplitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: externalContainerRef,
    offset: ["start start", "end end"],
  });

  // Stage 1 to 2: Separation (0 to 0.4), then Stage 2 to 3: Overlap closer (0.4 to 0.8)
  const leftX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, -48, -24]);
  const rightX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 48, 24]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

  // Stage 2 to 3: Flip (0.4 to 0.8)
  const rotateY = useTransform(scrollYProgress, [0.4, 0.8], [0, 180]);
  // Due to 180deg Y flip, positive Z becomes visual counter-clockwise, negative Z becomes visual clockwise
  const rotateZLeft = useTransform(scrollYProgress, [0.4, 0.8], [0, 6]);
  const rotateZRight = useTransform(scrollYProgress, [0.4, 0.8], [0, -6]);

  // Dynamic borders/radii so it looks like ONE flat image initially
  const borderRadiusLeft = useTransform(scrollYProgress, [0, 0.2], ["16px 0px 0px 16px", "16px 16px 16px 16px"]);
  const borderRadiusMiddle = useTransform(scrollYProgress, [0, 0.2], ["0px 0px 0px 0px", "16px 16px 16px 16px"]);
  const borderRadiusRight = useTransform(scrollYProgress, [0, 0.2], ["0px 16px 16px 0px", "16px 16px 16px 16px"]);
  const borderOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.2]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.4]);
  const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255, 255, 255, ${borderOpacity}), inset 0 -24px 48px rgba(0, 0, 0, ${shadowOpacity}), 0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`;

  // Cards move up in the last viewport
  const cardsY = useTransform(scrollYProgress, [0.8, 1], [0, -110]);

  // Text appearance at the end in the sticky viewport
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.8, 1], [40, 0]);

  // Indicator text appearance at the start
  const startTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const startTextY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  if (reduceMotion) {
    // No scroll animation for people who turned motion off: show the three cards flat.
    return (
      <div className="mx-auto grid w-full max-w-4xl gap-4 px-4 sm:grid-cols-3">
        {cards.slice(0, 3).map((card, i) => (
          <div key={i} className="overflow-hidden rounded-2xl" style={{ backgroundColor: card.bgColor, color: card.textColor }}>
            {card.image && (
              <div className="relative h-48 w-full">
                <Image src={card.image} alt={card.imageAlt ?? ""} fill sizes="(max-width: 640px) 90vw, 300px" className="object-cover" />
              </div>
            )}
            <div className="p-6">
            <h3 className="mb-3 text-2xl font-medium leading-tight">{card.title}</h3>
            <p className="text-sm opacity-80">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[500vh] w-full", className)}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden [perspective:1200px]">
        {/* Starting Text indicator */}
        <motion.div
          className="absolute top-[20%] left-0 right-0 text-center"
          style={{
            opacity: startTextOpacity,
            y: startTextY,
          }}
        >
          <p className="text-sm font-medium tracking-widest text-white/60 uppercase">
            {startText}
          </p>
        </motion.div>

        <motion.div
          style={{ scale, y: cardsY, transformStyle: "preserve-3d" }}
          className="flex h-[400px] w-full max-w-4xl px-4 relative"
        >
          {cards.slice(0, 3).map((card, i) => (
            <motion.div
              key={i}
              className="relative h-full flex-1"
              style={{
                x: i === 0 ? leftX : i === 2 ? rightX : 0,
                rotateY,
                rotateZ: i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0,
                zIndex: i, // Ensures Left is under Middle, and Right is above Middle
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Side: Original Image Split */}
              <motion.div
                className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
                style={{
                  zIndex: 2, // Ensure front stays above initially
                  borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow,
                }}
              >
                <div
                  className="absolute inset-0 h-full w-[300%]"
                  style={{
                    left: `${-100 * i}%`,
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </motion.div>

              {/* Back Side: New Content Card */}
              <motion.div
                className={cn(
                  "absolute inset-0 overflow-hidden flex flex-col justify-end p-3 sm:p-8 [backface-visibility:hidden] will-change-transform",
                  "border border-white/5",
                  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-24px_48px_rgba(0,0,0,0.2)]"
                )}
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  transform: "rotateY(180deg)",
                  zIndex: 1, // Ensure back is behind before flip
                  borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow,
                }}
              >
                {/* Grainy Noise Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage: GRAIN,
                    backgroundRepeat: "repeat",
                  }}
                />

                {card.image && (
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
                    style={{
                      maskImage: "linear-gradient(to bottom, #000 65%, transparent)",
                      WebkitMaskImage: "linear-gradient(to bottom, #000 65%, transparent)",
                    }}
                  >
                    <Image src={card.image} alt={card.imageAlt ?? ""} fill sizes="(max-width: 768px) 40vw, 300px" loading="eager" className="object-cover" />
                  </div>
                )}

                <div className="relative z-10 mb-auto">{card.icon}</div>
                <h3 className="relative z-10 mb-2 text-base font-medium leading-tight sm:mb-4 sm:text-2xl">
                  {card.title}
                </h3>
                <p className="relative z-10 text-[11px] leading-snug opacity-80 sm:text-sm">{card.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ending text fixed in the sticky viewport */}
        {endText && (
          <motion.div
            className="absolute bottom-[20%] left-0 right-0 px-4 text-center"
            style={{
              opacity: textOpacity,
              y: textY,
            }}
          >
            <p className="text-2xl font-medium tracking-tight text-white/85 font-serif italic sm:text-3xl">{endText}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

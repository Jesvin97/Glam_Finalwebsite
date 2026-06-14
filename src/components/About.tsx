"use client";

import React, { useEffect, useState, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

function AnimatedNumber({ value, suffix = "", decimal = false }: { value: number; suffix?: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTimestamp: number | null = null;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentVal = progress * value;
      setCount(decimal ? parseFloat(currentVal.toFixed(1)) : Math.floor(currentVal));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [started, value, decimal]);

  return <span ref={ref}>{decimal ? count.toFixed(1) : count}{suffix}</span>;
}

export default function About() {
  return (
    <section className="about-section" id="about">
      <ScrollReveal direction="left" className="about-image-wrapper">
        <div className="about-image">
          <img
            src="/images/reception-area.jpeg"
            alt="Glam'more Salon Interior Reception Area"
          />
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right" className="about-content-wrapper">
        <div className="about-content">
          <p className="about-tag">
            ABOUT GLAM'MORE
          </p>

          <h2>
            Luxury
            <span className="gold-text">
              {" "}Salon Experience
            </span>
          </h2>

          <p className="about-description">
            Step into a world where elegance,
            beauty and luxury come together.
            Our salon offers world-class beauty
            treatments, professional care,
            premium styling and personalized
            wellness experiences designed for
            modern beauty standards.
          </p>

          {/* STATISTICS COUNTER */}
          <div className="about-stats-grid">
            <div className="stat-card">
              <span className="stat-num">
                <AnimatedNumber value={10} suffix="+" />
              </span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">
                <AnimatedNumber value={5000} suffix="+" />
              </span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">
                <AnimatedNumber value={15} suffix="+" />
              </span>
              <span className="stat-label">Master Stylists</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">
                <AnimatedNumber value={4.9} suffix="★" decimal={true} />
              </span>
              <span className="stat-label">Google Rating</span>
            </div>
          </div>

          <a href="/#contact" className="primary-btn">
            Book Your Visit
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
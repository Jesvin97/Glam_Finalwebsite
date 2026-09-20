"use client";

import { FaSmile, FaMagic, FaUserTie, FaAward } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: FaSmile,
      title: "200+ Happy Clients",
      description: "Trusted by thousands across Kerala for exceptional beauty & hair care",
    },
    {
      icon: FaMagic,
      title: "Premium Hair & Skin Care",
      description: "Using top-tier international products for radiant, lasting results",
    },
    {
      icon: FaUserTie,
      title: "Expert Master Stylists",
      description: "Highly trained professionals dedicated to your perfect transformation",
    },
    {
      icon: FaAward,
      title: "100% Satisfaction",
      description: "Luxury salon experience with personalized care tailored for you",
    },
  ];

  return (
    <section className="why-choose-us-section">
      <div className="why-header">
        <span className="subtitle-elegant">EXCELLENCE & LUXURY</span>
        <h2>Why Glam'more?</h2>
        <div className="why-header-line"></div>
      </div>

      <div className="why-grid">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className="why-card">
              <div className="why-icon-circle">
                <IconComponent className="why-icon" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

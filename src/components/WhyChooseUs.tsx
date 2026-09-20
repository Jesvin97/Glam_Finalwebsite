"use client";

import { FaHeart, FaCut, FaGem, FaClock } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: FaHeart,
      title: "200+ Happy Clients",
    },
    {
      icon: FaCut,
      title: "Expert Master Stylists",
    },
    {
      icon: FaGem,
      title: "Premium Products",
    },
    {
      icon: FaClock,
      title: "10+ Years in Business",
    },
  ];

  return (
    <section className="why-choose-us-section">
      <div className="why-header">
        <h2>Why Glam'more?</h2>
        <div className="why-header-underline"></div>
      </div>

      <div className="why-grid">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className="why-card">
              <div className="why-double-ring">
                <div className="why-inner-circle">
                  <IconComponent className="why-icon" />
                </div>
              </div>
              <p className="why-title">{feature.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

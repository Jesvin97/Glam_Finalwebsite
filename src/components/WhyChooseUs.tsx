"use client";

import { FaHeart, FaClock, FaUserFriends } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

export default function WhyChooseUs() {
  const features = [
    {
      icon: FaHeart,
      title: "3000+ Happy Customers",
    },
    {
      icon: FaScissors,
      title: "Experienced Stylists",
    },
    {
      icon: FaUserFriends,
      title: "Men & Women Welcome",
    },
    {
      icon: FaClock,
      title: "Open 7 Days, 10 AM – 8:30 PM",
    },
  ];

  return (
    <section className="why-choose-us-section">
      <div className="why-header">
        <h2>Why Choose Glam&apos;more</h2>
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

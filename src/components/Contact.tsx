'use client';
import { useState } from "react";
import { ADDRESS, AREAS_SERVED, BUSINESS_NAME, MAPS_URL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";
import ScrollReveal from "./ScrollReveal";
import { FaPhoneAlt } from "react-icons/fa";



export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendToWhatsApp = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const phoneNumber = PHONE_E164.slice(1);
    const text = `Hello Glam'more Salon,

My name is ${formData.name}.

${formData.message}`;

    const whatsappURL =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* LEFT SIDE - FIND US */}
        <ScrollReveal direction="left" className="map-column contact-column-flex">
          <div>
            <h2 className="contact-section-title">
              Visit Us in Thukalassery, Thiruvalla
            </h2>
            <div className="map-container contact-map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1937.5310551542557!2d76.579642!3d9.371174000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0623786b117fff%3A0x1df5eadfac9d2008!2sGlam&#39;more%20Premium%20Unisex%20Salon!5e1!3m2!1sen!2skw!4v1782336240302!5m2!1sen!2skw"
                width="100%"
                height="100%"
                className="contact-map-iframe"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title={`Google Maps location of ${BUSINESS_NAME} in Thiruvalla`}
              ></iframe>

              <div className="map-details">
                <h3>{BUSINESS_NAME}</h3>
                <p className="contact-map-details-desc">
                  {ADDRESS.streetAddress}, {ADDRESS.addressLocality}, {ADDRESS.addressRegion} {ADDRESS.postalCode}, India
                </p>
                <p className="contact-map-details-phone">
                  <a href={`tel:${PHONE_E164}`} style={{ color: '#d4af37', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <FaPhoneAlt size={14} /> Phone: {PHONE_DISPLAY}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* RIGHT SIDE - CONTACT US */}
        <ScrollReveal direction="right" delay={200} className="form-column contact-column-flex">
          <div>
            <h2 className="contact-section-title">
              Contact Us
            </h2>
            <form
              className="contact-form"
              onSubmit={sendToWhatsApp}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" className="btn-luxury" style={{ marginTop: '20px', cursor: 'pointer' }}>
                Send Message
                <span className="btn-luxury-hover-effect"></span>
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>

      <div className="contact-areas">
        <h2 className="contact-section-title">Areas we serve</h2>
        <p>
          We are on SH 1 (the Kollam–Theni Highway) at Thukalassery, and clients come to us from {AREAS_SERVED.join(", ")}. We have one
          salon, at the address above, and we don&apos;t have branches in these towns. Use{" "}
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
            Google Maps
          </a>{" "}
          for directions and travel time from where you are, or call us on <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a> and we&apos;ll
          help you find us.
        </p>
        <ul>
          {AREAS_SERVED.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
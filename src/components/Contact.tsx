'use client';
import { useState } from "react";
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

    const phoneNumber = "919645915329";
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
              Find Us
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
                title="Google Maps Location of Glam'more Unisex Salon in Thiruvalla"
              ></iframe>

              <div className="map-details">
                <h3>Glam'more Unisex Salon</h3>
                <p className="contact-map-details-desc">
                  First Floor, Professional Building, SH 1, Kollam - Theni Hwy, Thukalassery, Thiruvalla, Kerala 689115, India
                </p>
                <p className="contact-map-details-phone">
                  <a href="tel:+919645915329" style={{ color: '#d4af37', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <FaPhoneAlt size={14} /> Phone: +91 96459 15329
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

              <button type="submit" className="primary-btn">
                Send Message
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
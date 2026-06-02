'use client';
import { useState } from "react";

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
        <div className="map-column" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h2 style={{ color: "#d4af37", fontSize: "22px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "25px", fontFamily: "Playfair Display, serif" }}>
            Find Us
          </h2>
          <div className="map-container" style={{ flex: 1 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d775.2690901451283!2d76.57811094811737!3d9.371003421344438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0623786b117fff%3A0x1df5eadfac9d2008!2sGlam%27more%20Premium%20Unisex%20Salon!5e1!3m2!1sen!2skw!4v1780220181551!5m2!1sen!2skw"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="map-details">
              <h3>Glam'more Unisex Salon</h3>
              <p>
                First Floor, Professional Building, SH 1, Kollam - Theni Hwy, Thukalassery, Thiruvalla, Kerala 689115, India
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - CONTACT US */}
        <div className="form-column" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h2 style={{ color: "#d4af37", fontSize: "22px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "25px", fontFamily: "Playfair Display, serif" }}>
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

            <button
              type="submit"
              className="primary-btn"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
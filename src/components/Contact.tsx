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

    const text = `Hello Glammore Salon,

My name is ${formData.name}.

${formData.message}`;

    const whatsappURL =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-title">
        <p>CONTACT US</p>
        <h2>
          Book Your
          <span className="gold-text">
            {" "}Comfort Session
          </span>
        </h2>
      </div>

      <div className="contact-container">
        {/* LEFT SIDE - MAP */}
        <div className="map-container">
          <iframe
            src="https://maps.google.com/maps?q=9.370987,76.579257&z=17&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="map-details">
            <h3>Glammore Premium Unisex Salon</h3>
            <p>
              📍 Club 7 Junction, MC Road, Thiruvalla, Kerala
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
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
    </section>
  );
}
'use client';
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";
import { FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  const { t, language } = useLanguage();
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

    const text = language === "ml"
      ? `ഹലോ ഗ്ലാംമോർ സലൂൺ,

എന്റെ പേര് ${formData.name}.

${formData.message}`
      : `Hello Glam'more Salon,

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
              {language === "ml" ? "ഞങ്ങളെ കണ്ടെത്തുക" : "Find Us"}
            </h2>
            <div className="map-container contact-map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d775.2690901451283!2d76.57811094811737!3d9.371003421344438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0623786b117fff%3A0x1df5eadfac9d2008!2sGlam%27more%20Premium%20Unisex%20Salon!5e1!3m2!1sen!2skw!4v1780220181551!5m2!1sen!2skw"
                width="100%"
                height="100%"
                className="contact-map-iframe"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location of Glam'more Unisex Salon in Thiruvalla"
              ></iframe>

              <div className="map-details">
                <h3>Glam'more Unisex Salon</h3>
                <p className="contact-map-details-desc">
                  {language === "ml"
                    ? "ഫസ്റ്റ് ഫ്ലോർ, പ്രൊഫഷണൽ ബിൽഡിംഗ്, എം.സി റോഡ് (SH 1), തുകലശ്ശേരി, തിരുവല്ല, കേരളം 689115, ഇന്ത്യ"
                    : "First Floor, Professional Building, SH 1, Kollam - Theni Hwy, Thukalassery, Thiruvalla, Kerala 689115, India"}
                </p>
                <p className="contact-map-details-phone">
                  <a href="tel:+919645915329" style={{ color: '#d4af37', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <FaPhoneAlt size={14} /> {language === "ml" ? "ഫോൺ" : "Phone"}: +91 96459 15329
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
              {t("contactTitle")}
            </h2>
            <form
              className="contact-form"
              onSubmit={sendToWhatsApp}
            >
              <input
                type="text"
                name="name"
                placeholder={t("namePlace")}
                value={formData.name}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder={t("msgPlace")}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button
                type="submit"
                className="primary-btn"
              >
                {t("sendMsg")}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
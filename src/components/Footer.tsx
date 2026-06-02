import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaGoogle,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      {/* LEFT */}
      <div className="footer-left">
        <h2 style={{ color: "#d4af37", fontSize: "20px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "Playfair Display, serif", lineHeight: "1.4" }}>
          Glam'more Unisex Salon
        </h2>
        <p style={{ color: "#aaa", fontSize: "13px", lineHeight: "1.6", marginBottom: "12px", maxWidth: "450px" }}>
          First Floor, Professional Building, SH 1, Kollam - Theni Hwy, Thukalassery, Thiruvalla, Kerala 689115, India
        </p>
        <p style={{ color: "#666", fontSize: "13px" }}>All Rights Reserved, 2026</p>
        <p style={{ marginTop: "12px", fontSize: "12px", color: "#555" }}>
          Powered by Raphael Group -{" "}
          <a
            href="https://raphaelgroup.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#d4af37", textDecoration: "underline" }}
          >
            raphaelgroup.in
          </a>
        </p>
      </div>

      {/* CENTER */}
      <div className="footer-center">
        <a href="/">Home</a>
        <a href="#about">About</a>
        <a href="#blog">Blogs</a>
        <a href="#contact">Contact</a>
      </div>

      {/* RIGHT */}
      <div className="footer-right">
        <div className="social-icons">
          <a
            href="https://instagram.com/glammore.unisex.salon"
            target="_blank"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/glammoresalon/"
            target="_blank"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.youtube.com/@Glammoreunisexsalon"
            target="_blank"
          >
            <FaYoutube />
          </a>
          <a
            href="https://wa.me/919645915329"
            target="_blank"
            style={{ color: "#25D366" }}
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://maps.app.goo.gl/XUFVqGPK9REuB6yf8"
            target="_blank"
          >
            <FaGoogle />
          </a>
        </div>
      </div>
    </footer>
  );
}
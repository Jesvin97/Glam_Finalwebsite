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
        <h2 className="footer-title">
          Glam'more Unisex Salon
        </h2>
        <p className="footer-text-muted">
          First Floor, Professional Building, SH 1, Kollam - Theni Hwy, Thukalassery, Thiruvalla, Kerala 689115, India
        </p>
        <p className="footer-text-muted-compact">
          Phone: +91 96459 15329
        </p>
        <p className="footer-text-copyright">All Rights Reserved, 2026</p>
        <p className="footer-powered-by">
          Powered by Raphael Group -{" "}
          <a
            href="https://raphaelgroup.in"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-powered-by-link"
          >
            raphaelgroup.in
          </a>
        </p>
      </div>

      {/* CENTER */}
      <div className="footer-center">
        <a href="/">Home</a>
        <a href="/#about">About</a>
        <a href="/blogs">Blogs</a>
        <a href="/#contact">Contact</a>
      </div>

      {/* RIGHT */}
      <div className="footer-right">
        <div className="social-icons">
          <a
            href="https://instagram.com/glammore.unisex.salon"
            target="_blank"
            aria-label="Follow Glam'more on Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/glammoresalon/"
            target="_blank"
            aria-label="Follow Glam'more on Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.youtube.com/@Glammoreunisexsalon"
            target="_blank"
            aria-label="Subscribe to Glam'more on YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://wa.me/919645915329"
            target="_blank"
            className="whatsapp-green-text"
            aria-label="Chat with Glam'more on WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://maps.app.goo.gl/XUFVqGPK9REuB6yf8"
            target="_blank"
            aria-label="Find Glam'more on Google Maps"
          >
            <FaGoogle />
          </a>
        </div>
      </div>
    </footer>
  );
}
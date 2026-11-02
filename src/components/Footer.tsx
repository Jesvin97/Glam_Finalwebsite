import Image from "next/image";
import { BUSINESS_NAME } from "@/lib/site";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaGoogle,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      {/* TOP ROW: logo | copyright | social */}
      <div className="footer-top">
        <Link href="/" className="footer-logo-link" aria-label="Glam'more home">
          <Image src="/images/logo.png" alt="Glam'more logo" width={56} height={56} className="footer-logo" />
        </Link>
        <span className="footer-divider" aria-hidden="true">|</span>
        <p className="footer-copyright" suppressHydrationWarning>
          {`© ${new Date().getFullYear()} ${BUSINESS_NAME}`}
        </p>
        <div className="social-icons">
          <a href="https://instagram.com/glammore.unisex.salon" target="_blank" rel="noopener noreferrer" aria-label="Follow Glam'more on Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/glammoresalon/" target="_blank" rel="noopener noreferrer" aria-label="Follow Glam'more on Facebook">
            <FaFacebookF />
          </a>
          <a href="https://www.youtube.com/@Glammoreunisexsalon" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to Glam'more on YouTube">
            <FaYoutube />
          </a>
          <a href="https://maps.app.goo.gl/XUFVqGPK9REuB6yf8" target="_blank" rel="noopener noreferrer" aria-label="Find Glam'more on Google Maps">
            <FaGoogle />
          </a>
        </div>
      </div>


      {/* BOTTOM BAR: name · address · phone · credit */}
      <div className="footer-bottom">
        <p>
          <strong>{BUSINESS_NAME}</strong>
          {" · "}First Floor, Professional Building, SH 1, Kollam - Theni Hwy, Thukalassery, Thiruvalla, Kerala 689115
          {" · "}<a href="tel:+919645915329">+91 96459 15329</a>
          {" · "}Powered by{" "}
          <a href="https://raphaelgroup.in" target="_blank" rel="noopener noreferrer">Raphael Group</a>
        </p>
      </div>
    </footer>
  );
}

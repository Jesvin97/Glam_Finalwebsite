import ScrollReveal from "./ScrollReveal";
import { GOOGLE_REVIEW_URL } from "@/lib/site";

// Reviews live on the Google Business Profile, so this section just sends happy clients there.
export default function CustomerFeedback() {
  return (
    <section className="feedback-section" id="feedback">
      <ScrollReveal direction="up">
        <div className="section-title text-center">
          <h2 className="gold-section-heading">SHARE YOUR GLAM&apos;MORE EXPERIENCE</h2>
        </div>
        <div className="review-cta">
          <p className="review-cta-stars" aria-hidden="true">★★★★★</p>
          <p>Enjoyed your visit? A short Google review helps other people in Thiruvalla find us.</p>
          <a className="btn-luxury" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
            Review us on Google
            <span className="btn-luxury-hover-effect"></span>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

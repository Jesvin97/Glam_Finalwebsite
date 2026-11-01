import ScrollReveal from "./ScrollReveal";

export const GOOGLE_REVIEW_URL = "https://g.page/r/CQggnazf6vUdEAE/review";

export default function CustomerFeedback() {
  return (
    <section className="feedback-section" id="feedback">
      <ScrollReveal direction="up">
        <div className="section-title">
          <h2 className="gold-section-heading">SHARE YOUR GLAM&apos;MORE EXPERIENCE</h2>
        </div>
        <p className="feedback-intro">
          Loved your visit? A few words on Google help other brides and guests find us, and mean the world to our team.
        </p>
        <div className="feedback-stars-row" aria-hidden="true">★★★★★</div>
        <a
          className="btn-luxury"
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Review us on Google
          <span className="btn-luxury-hover-effect" />
        </a>
      </ScrollReveal>
    </section>
  );
}

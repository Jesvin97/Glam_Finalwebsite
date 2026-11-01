import ScrollReveal from "./ScrollReveal";

// Paste the Google Form share link here.
const GOOGLE_FORM_URL = "";

export default function CustomerFeedback() {
  return (
    <section className="feedback-section" id="feedback">
      <ScrollReveal direction="up">
        <div className="section-title">
          <h2 className="gold-section-heading">SHARE YOUR GLAM&apos;MORE EXPERIENCE</h2>
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <a className="btn-luxury" href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
            <span>Leave a review</span>
            <span className="btn-luxury-hover-effect" />
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

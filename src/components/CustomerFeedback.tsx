"use client";

import { useState } from "react";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/image";
import ScrollReveal from "./ScrollReveal";

export interface FeedbackPhoto {
  _id: string;
  image: SanityImageSource;
  caption?: string;
}

export interface ApprovedFeedback {
  _id: string;
  name: string;
  service?: string;
  rating: number;
  message: string;
}

const SERVICES = [
  "Haircut / Hairstyling",
  "Hair Colour / Keratin",
  "Bridal Makeup",
  "Party / Event Makeup",
  "Facial / Skin Care",
  "Massage",
  "Nails",
  "Threading / Lashes",
  "Shaving / Beard",
  "Waxing",
  "Other",
];

type Status = { type: "idle" | "sending" | "success" | "error"; message?: string };

export default function CustomerFeedback({
  photos = [],
  feedback = [],
}: {
  photos?: FeedbackPhoto[];
  feedback?: ApprovedFeedback[];
}) {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "", website: "" });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setStatus({ type: "error", message: "Please choose a star rating." });
      return;
    }
    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus({ type: "success", message: "Thank you! Your feedback has been sent." });
      setForm({ name: "", phone: "", service: "", message: "", website: "" });
      setRating(0);
    } catch (err) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  };

  return (
    <section className="feedback-section" id="feedback">
      <ScrollReveal direction="up">
        <div className="section-title text-center">
          <h2 className="gold-section-heading">CUSTOMER FEEDBACK</h2>
        </div>
      </ScrollReveal>

      {photos.length > 0 && (
        <div className="feedback-photo-grid">
          {photos.map((p) => (
            <figure className="feedback-photo" key={p._id}>
              <Image
                src={urlFor(p.image).width(600).height(600).fit("crop").auto("format").url()}
                alt={p.caption || "Glam'more customer"}
                width={600}
                height={600}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {p.caption && <figcaption>{p.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {feedback.length > 0 && (
        <div className="feedback-list">
          {feedback.map((f) => (
            <blockquote className="feedback-card" key={f._id}>
              <div className="feedback-stars" aria-label={`${f.rating} out of 5 stars`}>
                {"★".repeat(f.rating)}
                <span className="feedback-stars-empty">{"★".repeat(5 - f.rating)}</span>
              </div>
              <p>{f.message}</p>
              <footer>
                — {f.name}
                {f.service && <span> · {f.service}</span>}
              </footer>
            </blockquote>
          ))}
        </div>
      )}

      <form className="feedback-form" onSubmit={onSubmit} noValidate>
        <h3>Share your experience</h3>

        <div className="feedback-rating" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              className={(hover || rating) >= n ? "active" : ""}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
            >
              ★
            </button>
          ))}
        </div>

        <div className="feedback-form-row">
          <input name="name" value={form.name} onChange={onChange} placeholder="Your name *" maxLength={80} required />
          <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone (optional, kept private)" maxLength={20} inputMode="tel" />
        </div>

        <select name="service" value={form.service} onChange={onChange} aria-label="Service">
          <option value="">Which service did you have? (optional)</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <textarea name="message" value={form.message} onChange={onChange} placeholder="Tell us about your visit *" rows={4} maxLength={1000} required />

        {/* Honeypot for bots; hidden from real visitors */}
        <input name="website" value={form.website} onChange={onChange} className="feedback-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <button type="submit" className="btn-luxury" disabled={status.type === "sending"}>
          {status.type === "sending" ? "Sending…" : "Submit Feedback"}
          <span className="btn-luxury-hover-effect" />
        </button>

        {status.message && (
          <p className={`feedback-status ${status.type}`} role="status">{status.message}</p>
        )}
      </form>
    </section>
  );
}

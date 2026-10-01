"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { FEEDBACK_SERVICES, MAX_WORDS, MIN_MEANINGFUL_WORDS, countWords, validateFeedback } from "@/lib/feedback";

export interface ApprovedFeedback {
  id: number;
  name: string;
  services: string[];
  rating: number;
  message: string;
}

type Status = { type: "idle" | "sending" | "success" | "error"; message?: string };

const EMPTY_FORM = { name: "", email: "", message: "", website: "" };

export default function CustomerFeedback({
  feedback = [],
}: {
  feedback?: ApprovedFeedback[];
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [services, setServices] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const words = countWords(form.message);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const toggleService = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: form.name, email: form.email, services, rating, message: form.message };
    const error = validateFeedback(payload);
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }
    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, website: form.website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus({ type: "success", message: "Thank you! Your feedback has been sent." });
      setForm(EMPTY_FORM);
      setServices([]);
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

      {feedback.length > 0 && (
        <div className="feedback-list">
          {feedback.map((f) => (
            <blockquote className="feedback-card" key={f.id}>
              <div className="feedback-stars" aria-label={`${f.rating} out of 5 stars`}>
                {"★".repeat(f.rating)}
                <span className="feedback-stars-empty">{"★".repeat(5 - f.rating)}</span>
              </div>
              <p>{f.message}</p>
              <footer>
                — {f.name}
                {f.services?.length > 0 && <span> · {f.services.join(", ")}</span>}
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
          <input name="name" value={form.name} onChange={onChange} placeholder="Your name *" maxLength={80} required autoComplete="name" />
          <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email (kept private) *" maxLength={254} required autoComplete="email" />
        </div>

        <fieldset className="feedback-services">
          <legend>Services you had * <span>(choose one or more)</span></legend>
          <div className="feedback-service-chips">
            {FEEDBACK_SERVICES.map((s) => {
              const on = services.includes(s);
              return (
                <button type="button" key={s} className={on ? "chip active" : "chip"} aria-pressed={on} onClick={() => toggleService(s)}>
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="feedback-message">
          <textarea name="message" value={form.message} onChange={onChange} placeholder="Tell us about your visit *" rows={4} required />
          <p className={`feedback-word-count ${words.total > MAX_WORDS ? "over" : ""}`}>
            {words.total}/{MAX_WORDS} words
            {words.meaningful < MIN_MEANINGFUL_WORDS && ` · at least ${MIN_MEANINGFUL_WORDS} needed`}
          </p>
        </div>

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

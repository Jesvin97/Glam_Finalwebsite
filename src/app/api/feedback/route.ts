import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/client";

// Server-only client with write access. The token must never be exposed to the browser
// (no NEXT_PUBLIC_ prefix). Create it in sanity.io/manage → API → Tokens with "Editor" rights.
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// Basic per-IP rate limit (per server instance): 3 submissions per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const recent = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("SANITY_API_WRITE_TOKEN is not set; cannot save feedback.");
    return Response.json({ error: "Feedback is temporarily unavailable." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (clean(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 20);
  const service = clean(body.service, 80);
  const message = clean(body.message, 1000);
  const rating = Number(body.rating);

  if (!name) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    return Response.json({ error: "Please choose a rating." }, { status: 400 });
  if (message.length < 10)
    return Response.json({ error: "Please write at least a few words of feedback." }, { status: 400 });
  if (phone && !/^[0-9+\s\-()]{7,20}$/.test(phone))
    return Response.json({ error: "Enter a valid phone number." }, { status: 400 });

  try {
    await writeClient.create({
      _type: "customerFeedback",
      approved: false,
      name,
      phone: phone || undefined,
      service: service || undefined,
      rating,
      message,
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to save feedback to Sanity:", err);
    return Response.json({ error: "Could not save your feedback. Please try again." }, { status: 500 });
  }

  return Response.json({ ok: true });
}

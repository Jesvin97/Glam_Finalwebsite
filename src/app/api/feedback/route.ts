import { getSupabase } from "@/lib/supabase";
import { validateFeedback } from "@/lib/feedback";

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
  const supabase = getSupabase();
  if (!supabase) {
    console.error("Supabase env vars are not set; cannot save feedback.");
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

  const input = {
    name: clean(body.name, 80),
    email: clean(body.email, 254).toLowerCase(),
    services: Array.isArray(body.services) ? body.services.map((s) => clean(s, 80)).filter(Boolean).slice(0, 10) : [],
    rating: Number(body.rating),
    message: clean(body.message, 2000),
  };

  const error = validateFeedback(input);
  if (error) return Response.json({ error }, { status: 400 });

  const { error: dbError } = await supabase.from("customer_feedback").insert({
    name: input.name,
    email: input.email,
    services: input.services,
    rating: input.rating,
    message: input.message,
  });

  if (dbError) {
    console.error("Failed to save feedback to Supabase:", dbError);
    return Response.json({ error: "Could not save your feedback. Please try again." }, { status: 500 });
  }

  return Response.json({ ok: true });
}

// Shared by the feedback form (browser) and /api/feedback (server) so both validate the same way.

export const FEEDBACK_SERVICES = [
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
] as const;

export const MIN_MEANINGFUL_WORDS = 7;
export const MAX_WORDS = 100;

// Filler words that don't count towards the minimum.
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "of", "to", "in", "on", "at", "by", "for", "with",
  "from", "as", "is", "am", "are", "was", "were", "be", "been", "it", "its", "this", "that",
  "so", "very", "too", "also", "just", "i", "me", "my", "we", "our", "you", "your", "he", "she",
  "they", "them", "his", "her", "their", "do", "did", "does", "had", "has", "have", "not", "no",
]);

export function countWords(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const meaningful = words.filter((w) => {
    const bare = w.toLowerCase().replace(/[^\p{L}\p{N}']/gu, "");
    return bare.length > 0 && !STOP_WORDS.has(bare);
  });
  return { total: words.length, meaningful: meaningful.length };
}

export interface FeedbackInput {
  name: string;
  email: string;
  services: string[];
  rating: number;
  message: string;
}

/** Returns an error message, or null when the input is valid. */
export function validateFeedback(f: FeedbackInput): string | null {
  if (!f.name.trim()) return "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) return "Please enter a valid email address.";
  if (!Number.isInteger(f.rating) || f.rating < 1 || f.rating > 5) return "Please choose a star rating.";
  if (f.services.length === 0) return "Please select at least one service.";
  if (f.services.some((s) => !(FEEDBACK_SERVICES as readonly string[]).includes(s))) return "Please choose services from the list.";
  const { total, meaningful } = countWords(f.message);
  if (total > MAX_WORDS) return `Please keep your feedback to ${MAX_WORDS} words or fewer.`;
  if (meaningful < MIN_MEANINGFUL_WORDS)
    return `Please write a little more: at least ${MIN_MEANINGFUL_WORDS} words (not counting words like "a", "the", "is").`;
  return null;
}

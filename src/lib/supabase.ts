import { createClient } from "@supabase/supabase-js";

// Anonymous (publishable-key) client for server-side use. No user sessions are
// involved, so this doesn't need @supabase/ssr cookie handling. Access is
// limited by Row Level Security in the database (see supabase/feedback.sql).
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // The Vercel Supabase integration names this key NEXT_PUBLIC_SUPABASE_ANON_KEY / SUPABASE_PUBLISHABLE_KEY.
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

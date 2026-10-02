// YouTube playlist that feeds the testimonial video section.
// Set NEXT_PUBLIC_YOUTUBE_PLAYLIST in Vercel / .env.local to the playlist link or just its ID.
// Videos added to that playlist later show up automatically; nothing to change on the site.

export function parsePlaylistId(raw: string | undefined): string | null {
  if (!raw) return null;
  const value = raw.trim();
  const fromUrl = value.match(/[?&]list=([A-Za-z0-9_-]+)/);
  if (fromUrl) return fromUrl[1];
  return /^[A-Za-z0-9_-]{10,}$/.test(value) ? value : null;
}

export const TESTIMONIAL_PLAYLIST_ID = parsePlaylistId(process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST);

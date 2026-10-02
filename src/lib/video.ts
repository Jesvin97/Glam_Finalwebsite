// YouTube playlist that feeds the testimonial video section ("Website" playlist on the
// Glam'more channel). Videos added to it later show up automatically; nothing to change here.
// The ID is public, so it's built in. NEXT_PUBLIC_YOUTUBE_PLAYLIST (link or ID) can override it.
const DEFAULT_PLAYLIST_ID = "PLRIJPeVqhhW0";

export function parsePlaylistId(raw: string | undefined): string | null {
  if (!raw) return null;
  const value = raw.trim();
  const fromUrl = value.match(/[?&]list=([A-Za-z0-9_-]+)/);
  if (fromUrl) return fromUrl[1];
  return /^[A-Za-z0-9_-]{10,}$/.test(value) ? value : null;
}

export const TESTIMONIAL_PLAYLIST_ID =
  parsePlaylistId(process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST) ?? DEFAULT_PLAYLIST_ID;

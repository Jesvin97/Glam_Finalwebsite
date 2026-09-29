import { client } from "./client";

// Server-side Sanity fetch. Returns [] on error so pages fall back to built-in content.
export async function fetchList<T>(query: string): Promise<T[]> {
  try {
    const data = await client.fetch<T[]>(query, {}, { next: { revalidate: 3600 } });
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Sanity fetch failed, using fallback content:", err);
    return [];
  }
}

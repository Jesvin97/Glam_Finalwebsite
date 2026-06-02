import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "oewfkbvj";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2023-05-30";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Crucial to prevent API request exhaustion and keep usage strictly in the free tier!
});

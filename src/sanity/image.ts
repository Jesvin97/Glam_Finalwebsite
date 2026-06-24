import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

// Converts any Sanity image reference safely to an optimized CDN URL
export function urlFor(source: any) {
  return builder.image(source);
}

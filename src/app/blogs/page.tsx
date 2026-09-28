import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "Hair, Skin & Bridal Beauty Tips | Glam'more Salon Thiruvalla",
  description: "Hair care, skin care, and bridal makeup tips from the stylists at Glam'more Unisex Salon in Thukalassery, Thiruvalla.",
  alternates: { canonical: "/blogs" },
};

export default function Page() {
  return <BlogsClient />;
}

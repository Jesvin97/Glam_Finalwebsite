"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Blogs, { type BlogItem } from "@/components/Blogs";

export default function BlogsClient({ blogs }: { blogs: BlogItem[] }) {
  return (
    <>
      <Navbar />
      <main className="blogs-page">
        <Blogs blogs={blogs} />
      </main>
      <Footer />
    </>
  );
}

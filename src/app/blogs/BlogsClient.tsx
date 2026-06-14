"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Blogs from "@/components/Blogs";

export default function BlogsClient() {
  return (
    <>
      <Navbar />
      <main className="blogs-page">
        <Blogs />
      </main>
      <Footer />
    </>
  );
}

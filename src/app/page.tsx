import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import HappyCustomers from "@/components/HappyCustomers";
import Photos from "@/components/Photos";
import WhyChooseUs from "@/components/WhyChooseUs";
import type { Testimonial } from "@/components/Testimonials";
import CustomerFeedback, { type ApprovedFeedback } from "@/components/CustomerFeedback";
import { fetchList } from "@/sanity/fetch";
import { getSupabase } from "@/lib/supabase";

async function fetchApprovedFeedback(): Promise<ApprovedFeedback[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("approved_feedback")
    .select("id, name, services, rating, message")
    .order("created_at", { ascending: false })
    .limit(6);
  if (error) {
    console.error("Failed to load approved feedback:", error.message);
    return [];
  }
  return data ?? [];
}

// Canonical lives here, not in the layout, so /studio, the 404 page and other routes don't all point at the home page.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const revalidate = 3600;

export default async function Home() {
  const [testimonials, feedback] = await Promise.all([
    fetchList<Testimonial>(`*[_type == "testimonial"]`),
    fetchApprovedFeedback(),
  ]);

  return (
    <main>
      <Navbar />
      <HeroBanner />
      <About />
      <WhyChooseUs />
      <Services />
      <Testimonials testimonials={testimonials} />
      <CustomerFeedback feedback={feedback} />
      <HappyCustomers />
      <Photos />
      <Contact />
      <Footer />
    </main>
  );
}
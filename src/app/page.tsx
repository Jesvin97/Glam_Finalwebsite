import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import Photos from "@/components/Photos";
import WhyChooseUs from "@/components/WhyChooseUs";
import type { Testimonial } from "@/components/Testimonials";
import CustomerFeedback, { type FeedbackPhoto, type ApprovedFeedback } from "@/components/CustomerFeedback";
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

export const revalidate = 3600;

export default async function Home() {
  const [testimonials, feedbackPhotos, feedback] = await Promise.all([
    fetchList<Testimonial>(`*[_type == "testimonial"]`),
    fetchList<FeedbackPhoto>(`*[_type == "feedbackPhoto" && defined(image)] | order(order asc, _createdAt desc){_id, image, caption}`),
    fetchApprovedFeedback(),
  ]);

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <WhyChooseUs />
      <Services />
      <Testimonials testimonials={testimonials} />
      <CustomerFeedback photos={feedbackPhotos} feedback={feedback} />
      <Photos />
      <Contact />
      <Footer />
    </main>
  );
}
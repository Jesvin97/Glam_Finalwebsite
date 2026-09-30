import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Photos from "@/components/Photos";
import WhyChooseUs from "@/components/WhyChooseUs";
import type { FAQItem } from "@/components/FAQ";
import type { Testimonial } from "@/components/Testimonials";
import CustomerFeedback, { type FeedbackPhoto, type ApprovedFeedback } from "@/components/CustomerFeedback";
import { fetchList } from "@/sanity/fetch";

export const revalidate = 3600;

export default async function Home() {
  const [faqs, testimonials, feedbackPhotos, feedback] = await Promise.all([
    fetchList<FAQItem>(`*[_type == "faq"] | order(order asc)`),
    fetchList<Testimonial>(`*[_type == "testimonial"]`),
    fetchList<FeedbackPhoto>(`*[_type == "feedbackPhoto" && defined(image)] | order(order asc, _createdAt desc){_id, image, caption}`),
    fetchList<ApprovedFeedback>(`*[_type == "customerFeedback" && approved == true] | order(submittedAt desc)[0...6]{_id, name, service, rating, message}`),
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
      <FAQ faqs={faqs} />
      <Contact />
      <Footer />
    </main>
  );
}
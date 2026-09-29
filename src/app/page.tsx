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
import { fetchList } from "@/sanity/fetch";

export const revalidate = 3600;

export default async function Home() {
  const [faqs, testimonials] = await Promise.all([
    fetchList<FAQItem>(`*[_type == "faq"] | order(order asc)`),
    fetchList<Testimonial>(`*[_type == "testimonial"]`),
  ]);

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <WhyChooseUs />
      <Services />
      <Testimonials testimonials={testimonials} />
      <Photos />
      <FAQ faqs={faqs} />
      <Contact />
      <Footer />
    </main>
  );
}
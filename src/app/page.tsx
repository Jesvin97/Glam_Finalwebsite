import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import Services from "@/components/Services";
import SalonSplit from "@/components/SalonSplit";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import HappyCustomers from "@/components/HappyCustomers";
import Photos from "@/components/Photos";
import WhyChooseUs from "@/components/WhyChooseUs";
import type { Testimonial } from "@/components/Testimonials";
import CustomerFeedback from "@/components/CustomerFeedback";
import { fetchList } from "@/sanity/fetch";

// Canonical lives here, not in the layout, so /studio, the 404 page and other routes don't all point at the home page.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const revalidate = 3600;

export default async function Home() {
  const testimonials = await fetchList<Testimonial>(`*[_type == "testimonial"]`);

  return (
    <main>
      <Navbar />
      <HeroBanner />
      <About />
      <WhyChooseUs />
      <Services />
      <SalonSplit />
      <Testimonials testimonials={testimonials} />
      <CustomerFeedback />
      <HappyCustomers />
      <Photos />
      <Contact />
      <Footer />
    </main>
  );
}
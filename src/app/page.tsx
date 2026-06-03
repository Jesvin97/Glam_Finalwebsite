import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Photos from "@/components/Photos";

export default function Home() {

  return (

    <main>

      <Navbar />

      <Hero />
    
      <About />

      <Services />

      <Testimonials />

      <Photos />

      <FAQ />
    
      <Contact />

      <Footer />

    </main>
  );
}
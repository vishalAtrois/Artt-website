import AboutSection from "@/components/AboutSection";
import ArtGrid from "@/components/ArtGrid";
import CategoryNav from "@/components/CategoryNav";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
 import Navbar from "@/components/Navbar";
// import TestimonialSection from "@/components/TestimonialSection";
// import UpcomingEventCard from "@/components/UpcomingEventCard";
import ViewAllPaintings from "@/components/ViewAllPaintings";


export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden">
        <Hero />
      </div>
        <section className="px-20">
        <ArtGrid />
        </section>
        <ViewAllPaintings />
        <AboutSection />
        <section className="px-36">
        <CategoryNav />
        </section>
        <ContactSection />
        <Footer />
        {/* <UpcomingEventCard /> */}
        {/* <TestimonialSection /> */}
     </>
  );
}

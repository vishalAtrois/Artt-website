 import ArtGrid from "@/components/ArtGrid";
import BrowsePaintingsHeader from "@/components/BrowsePaintingsHeader";
 import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
 import Navbar from "@/components/Navbar";
// import TestimonialSection from "@/components/TestimonialSection";
// import UpcomingEventCard from "@/components/UpcomingEventCard";
import ViewAllPaintings from "@/components/ViewAllPaintings";


export default function paintings() {
  return (
    <>
      <Navbar />
 
      <BrowsePaintingsHeader />
      <section className="px-20">
        <ArtGrid />
        </section>
        <ContactSection />
        <Footer />
        {/* <UpcomingEventCard /> */}
        {/* <TestimonialSection /> */}
     </>
  );
}

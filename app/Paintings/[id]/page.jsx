import { artworks } from "@/data/artworks";
import PaintingDetail from "@/components/PaintingDetail";
import Navbar from "@/components/Navbar";
import LatestPaintings from "@/components/LatestPaintings";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const PaintingPage = ({ params }) => {
  const art = artworks.find(
    (item) => item.id === Number(params.id)
  );

  if (!art) return <div className="p-20">Painting not found</div>;

  return (
  <>
  <Navbar />
  <PaintingDetail art={art} />;
  <LatestPaintings /> 
  <ContactSection />
        <Footer />
  </>
  )
};

export default PaintingPage;

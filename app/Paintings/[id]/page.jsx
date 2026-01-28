"use client";

import { useState, useEffect } from "react";
import { artworks as defaultArtworks } from "@/data/artworks";
import { AdminStorage } from "@/lib/adminStorage";
import PaintingDetail from "@/components/PaintingDetail";
import Navbar from "@/components/Navbar";
import LatestPaintings from "@/components/LatestPaintings";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const PaintingPage = ({ params }) => {
  const [art, setArt] = useState(null);

  useEffect(() => {
    const storedArtworks = AdminStorage.getArtworks();
    const artworks = storedArtworks && storedArtworks.length > 0 ? storedArtworks : defaultArtworks;
    const foundArt = artworks.find((item) => item.id === Number(params.id));
    setArt(foundArt);

    // Listen for updates
    const handleUpdate = () => {
      const updated = AdminStorage.getArtworks();
      if (updated && updated.length > 0) {
        const found = updated.find((item) => item.id === Number(params.id));
        setArt(found);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('artworksUpdated', handleUpdate);
      return () => window.removeEventListener('artworksUpdated', handleUpdate);
    }
  }, [params.id]);

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

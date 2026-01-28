"use client";

import ArtCard from "./ArtCard";
import { artworks as defaultArtworks } from "@/data/artworks";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AdminStorage } from "@/lib/adminStorage";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const ArtGrid = () => {
  const [artworks, setArtworks] = useState(defaultArtworks);

  useEffect(() => {
    // Load artworks from admin storage (if available)
    const storedArtworks = AdminStorage.getArtworks();
    if (storedArtworks && storedArtworks.length > 0) {
      setArtworks(storedArtworks);
    }

    // Listen for updates
    const handleUpdate = () => {
      const updated = AdminStorage.getArtworks();
      if (updated && updated.length > 0) {
        setArtworks(updated);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('artworksUpdated', handleUpdate);
      return () => window.removeEventListener('artworksUpdated', handleUpdate);
    }
  }, []);

  return (
    <section className="bg-[#f7f5ef] px-4 sm:px-6 md:px-[50px] py-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10"
      >
        {artworks.map((art) => (
          <ArtCard key={art.id} art={art} />
        ))}
      </motion.div>
    </section>
  );
};

export default ArtGrid;

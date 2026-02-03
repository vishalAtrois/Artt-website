"use client";

import ArtCard from "./ArtCard";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getUserProductsApi } from "@/lib/userApi";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function normalizeProduct(item) {
  const inStock = item.inStock;
  const forSale = inStock === true || inStock === 'yes' || item.forSale === true;
  return {
    id: item.id ?? item._id,
    title: item.title ?? '',
    category: item.category ?? '',
    image: item.image ?? '',
    description: item.description ?? '',
    forSale,
    layout: item.layout || 'vertical',
    price: item.price,
    year: item.year,
  };
}

const ArtGrid = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    setLoading(true);
    const res = await getUserProductsApi();
    setLoading(false);
    // API returns { success: true, data: { totalCount, totalPages, currentPage, limit, data: Array } }
    const list = res?.data?.data ?? [];
    const normalized = Array.isArray(list) ? list.map(normalizeProduct) : [];
    setArtworks(normalized);
  };

  return (
    <section className="bg-[#f7f5ef] px-4 sm:px-6 md:px-[50px] py-10">
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading artworks...</div>
      ) : artworks.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No artworks available.</div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10"
        >
          {artworks.map((art) => (
            <ArtCard key={art.id ?? art._id} art={art} />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default ArtGrid;

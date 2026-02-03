"use client";

import { useState, useEffect } from "react";
import { getUserProductsApi } from "@/lib/userApi";
import PaintingDetail from "@/components/PaintingDetail";
import Navbar from "@/components/Navbar";
import LatestPaintings from "@/components/LatestPaintings";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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

const PaintingPage = ({ params }) => {
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtwork();
  }, [params.id]);

  const loadArtwork = async () => {
    setLoading(true);
    const res = await getUserProductsApi();
    // API returns { success: true, data: { totalCount, totalPages, currentPage, limit, data: Array } }
    const list = res?.data?.data ?? [];
    const normalized = Array.isArray(list) ? list.map(normalizeProduct) : [];
    const foundArt = normalized.find((item) => String(item.id ?? item._id) === String(params.id));
    setArt(foundArt);
    setLoading(false);
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!art) return <div className="p-20 text-center">Painting not found</div>;

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

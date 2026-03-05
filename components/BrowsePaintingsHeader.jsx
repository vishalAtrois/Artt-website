"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export default function BrowsePaintingsHeader() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#f6f4ef] py-24 flex items-center justify-center">
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute top-8 w-3 h-3 rounded-full bg-white"
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-normal text-black tracking-tight"
      >
        {t("browsePaintings.title")}
      </motion.h1>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ArtCard = ({ art }) => {
  return (
    <Link href={`/Paintings/${art.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ y: -6 }}
        className="bg-[#e8e4d7] hover:bg-[#dcd6c8] transition rounded-[32px] px-4 sm:px-6 md:px-8 relative font-sans"
      >
        {art.forSale && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute top-4 right-6 z-10 bg-white/80 backdrop-blur-sm text-[14px] py-1.5 px-4 rounded-full shadow-sm"
          >
            <span className="text-gray-500 mr-1">$</span>
            <span className="text-black">For sale</span>
          </motion.div>
        )}

        <div className="p-8 sm:p-16">
          <motion.div
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative rounded-[12px] overflow-hidden bg-white shadow-sm"
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={art.image}
                alt={art.title}
                fill
                sizes="(max-width: 768px) 200px, 
                (max-width: 1024px) 300px, 
                400px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="pb-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <h3 className="text-[22px] font-semibold">{art.title}</h3>
            <p className="text-gray-600">{art.category}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-full px-3 py-2 shadow-sm flex items-center gap-2 overflow-hidden"
          >
            <span
              className="
                text-sm font-medium whitespace-nowrap
                max-w-0 opacity-0
                group-hover:max-w-[100px] group-hover:opacity-100
                transition-all duration-500
              "
            >
              See details
            </span>

            <ArrowRight
              className="
                transition-transform duration-500
                rotate-[-45deg]
                group-hover:rotate-0
              "
            />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ArtCard;

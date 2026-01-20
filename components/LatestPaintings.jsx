"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { artworks } from "@/data/artworks";
import { motion } from "framer-motion";

const LatestPaintings = () => {
  const latestArtworks = artworks.slice(0, 2);

  return (
    <section className="bg-[#f7f5ef] px-4 sm:px-6 md:px-[80px] py-14 md:py-20">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="text-[28px] sm:text-[34px] md:text-[42px] font-semibold mb-10 md:mb-14"
      >
        Latest paintings
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {latestArtworks.map((art, index) => (
          <motion.div
            key={art.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Link href={`/Paintings/${art.id}`} className="block group">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-[#e8e4d7] rounded-3xl p-5 sm:p-8 md:p-10 relative hover:bg-[#ddd7c9] transition"
              >
                {/* For Sale Badge */}
                {art.forSale && (
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/80 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full shadow-sm z-50">
                    $ For sale
                  </div>
                )}

                {/* Image */}
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex justify-center mb-8 md:mb-10"
                >
                  <div
                    className={`relative
                      ${
                        art.layout === "vertical"
                          ? "w-[200px] sm:w-[230px] md:w-[260px]"
                          : "w-[260px] sm:w-[300px] md:w-[360px]"
                      }
                      h-[300px] sm:h-[340px] md:h-[380px]
                      bg-white rounded-xl overflow-hidden shadow-md`}
                  >
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

                {/* Bottom Content */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium">
                      {art.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {art.category}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="pb-6 flex items-center justify-between">
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <h3 className="text-[22px] font-semibold">{art.title}</h3>
            <p className="text-gray-600">{art.category}</p>
          </motion.div> */}

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
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestPaintings;

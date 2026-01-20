"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const PaintingDetail = ({ art }) => {
  return (
    <section className="bg-[#f7f5ef] px-4 sm:px-6 md:px-[80px] py-12 md:py-16 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start md:items-center">

        {/* IMAGE (TOP ON MOBILE) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-1 md:order-2 bg-[#e8e4d7] p-6 sm:p-10 md:p-16 rounded-3xl flex justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative w-[220px] sm:w-[280px] md:w-[360px] aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-md"
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
          </motion.div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-2 md:order-1"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-gray-500 mb-3"
          >
            <Link
              href="/Paintings"
              className="hover:text-black hover:underline transition cursor-pointer"
            >
              All Paintings
            </Link>{" "}
            &gt; Detail
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[28px] sm:text-[36px] md:text-[48px] font-semibold mb-6 md:mb-8"
          >
            {art.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 text-sm mb-8 md:mb-10"
          >
            <div>
              <p className="text-gray-500">Category</p>
              <p>{art.category}</p>
            </div>

            <div>
              <p className="text-gray-500">Year</p>
              <p>2024</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-gray-500 mb-1">Description</p>
              <p className="text-gray-700 leading-relaxed">
                {art.description}
              </p>
            </div>

            <div>
              <p className="text-gray-500">For sale?</p>
              <p>{art.forSale ? "Yes" : "No"}</p>
            </div>

            {art.forSale && (
              <div>
                <p className="text-gray-500">Price</p>
                <p>$2,300</p>
              </div>
            )}
          </motion.div>

          {art.forSale && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto bg-[#2a2926] text-white px-8 py-4 rounded-full flex items-center justify-center gap-3"
            >
              Get the painting →
            </motion.button>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default PaintingDetail;

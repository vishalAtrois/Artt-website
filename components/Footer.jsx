"use client";

import Link from "next/link";
import { FaTiktok, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full bg-[#FAF8F3] px-4 sm:px-6 md:px-36 pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16"
        >
          
          {/* LEFT */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <h3 className="text-lg font-medium mb-3">Christina</h3>
            <p className="text-sm text-gray-600 mb-4 sm:mb-6">
              christina@example.com
            </p>

            <div className="flex justify-center md:justify-start gap-5 text-lg text-black">
              <motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
                <FaTiktok />
              </motion.span>
              <motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
                <FaXTwitter />
              </motion.span>
              <motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
                <FaInstagram />
              </motion.span>
            </div>
          </motion.div>

          {/* MIDDLE */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center md:text-left mt-8 md:mt-0"
          >
            <h4 className="text-sm font-medium mb-4 sm:mb-6">Pages</h4>
            <ul className="space-y-2 sm:space-y-4 text-sm text-gray-700">
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/">Homepage</Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/Paintings">Paintings</Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/About">About</Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/Contact">Contact</Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center md:text-left mt-8 md:mt-0"
          >
            <h4 className="text-sm font-medium mb-4 sm:mb-6">
              Paintings for sale
            </h4>
            <ul className="space-y-2 sm:space-y-4 text-sm text-gray-700">
              <li>Obsidian Tide</li>
              <li>Crimson Horizon</li>
              <li>Golden Veins</li>
              <li>Azure Fragments</li>
            </ul>
          </motion.div>

        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

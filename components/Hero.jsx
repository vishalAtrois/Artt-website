"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative bg-[#f7f5ef] py-[80px] sm:py-[100px] md:py-[120px] overflow-hidden">
      {/* ATMOSPHERIC MOUNTAINS BACKGROUND */}
<div className="absolute inset-0 z-0">
  <svg
    viewBox="0 0 1440 500"
    preserveAspectRatio="none"
    className="w-full h-full -translate-y-32"
  >
    <defs>
      <linearGradient id="mountainFar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6f7f73" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#f7f5ef" stopOpacity="1" />
      </linearGradient>

      <linearGradient id="mountainNear" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5f6b63" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#f7f5ef" stopOpacity="1" />
      </linearGradient>
    </defs>

    {/* FAR RANGE */}
    <path
      d="M0 260 L180 200 L360 220 L560 170 L740 210 L940 160 L1140 200 L1340 180 L1440 200 L1440 500 L0 500 Z"
      fill="url(#mountainFar)"
    />

    {/* NEAR RANGE */}
    <path
      d="M0 320 L160 260 L340 280 L560 230 L780 270 L980 220 L1180 260 L1380 240 L1440 260 L1440 500 L0 500 Z"
      fill="url(#mountainNear)"
    />
  </svg>
</div>

      {/* Background Text */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[180px] md:text-[220px] font-semibold text-black/5 select-none"
      >
        AlfJssonart
      </motion.h1>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-0">
        
        {/* Name Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[40px] sm:text-[52px] md:text-[64px] font-medium text-black"
          >
            AlfJssonart
          </motion.h2>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="rotate-[-6deg] bg-white p-1 rounded-md shadow-md"
          >
            <Image
              src="/Images/LadyPhoto.jpg"
              alt="AlfJssonart"
              width={60}
              height={60}
              className="sm:w-20 sm:h-20 rounded-md object-cover"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[40px] sm:text-[52px] md:text-[64px] font-medium text-black"
          >
          </motion.h2>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4 sm:mt-6 max-w-[320px] sm:max-w-[440px] md:max-w-[520px] text-[14px] sm:text-[15px] text-black/70 leading-relaxed"
        >
          Exotic animals, vivid landscapes and abstract art,  <br />
          to make your personal area
into a colorful and living space.        </motion.p>
      </div>

    </section>
  );
};

export default Hero;

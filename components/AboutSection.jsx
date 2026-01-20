"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="bg-[#f7f5ef] px-6 sm:px-10 md:px-[130px] py-[80px] md:py-[120px]">
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
        className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-[120px]"
      >
        {/* LEFT */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -40 },
            show: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-shrink-0 text-center md:text-left"
        >
          <h2 className="text-[36px] md:text-[48px] font-medium text-black mb-6 md:mb-8">
            About
          </h2>

          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="mx-auto md:mx-0 flex items-center gap-3 bg-[#e8e2d6] px-6 py-3 rounded-full text-[15px] text-black"
          >
            More about me
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <ArrowUpRight size={16} />
            </span>
          </motion.button>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-full md:max-w-[560px] text-[15px] md:text-[16px] leading-relaxed text-black/70 space-y-5 md:space-y-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I am a visual artist with over ten years of experience in painting
            and visual communication. In my work, I combine delicate
            brushstrokes with minimalist compositions to create emotional
            visual stories.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            I collaborate with galleries and private collectors and participate
            in exhibitions both at home and abroad. My approach combines
            traditional techniques with modern methods, giving each work a
            unique depth and precision.
          </motion.p>

          {/* SIGNATURE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex items-center justify-center md:justify-start gap-3 pt-4 md:pt-6"
          >
            <motion.div
              whileHover={{ rotate: -2, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="rotate-[-6deg] bg-[#e8e4d7] p-1 rounded-md shadow-sm"
            >
              <Image
                src="/Images/LadyPhoto.jpg"
                alt="Christina Vale"
                fill
                sizes="(max-width: 768px) 200px, 
         (max-width: 1024px) 300px, 
         400px"
                className="rounded-md object-cover"
              />
            </motion.div>

            <span className="font-[cursive] text-[18px] md:text-[20px] text-black">
              Christina Vale
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;

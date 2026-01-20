"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ContactSection = () => {
  const router = useRouter();

  return (
    <section className="w-full px-4 sm:px-6 md:px-32 py-8 sm:py-10">
      <motion.div
        onClick={() => router.push("/Contact")}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{ y: -6 }}
        className="max-w-7xl mx-auto bg-gradient-to-b from-[#f3efe6] via-[#ded7c9] to-[#cfc7b6] rounded-[32px] px-6 sm:px-12 py-12 sm:py-16 flex flex-col md:flex-row items-center md:justify-between overflow-hidden cursor-pointer"
      >
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-full md:max-w-xl text-center md:text-left mb-8 md:mb-0"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-2 text-sm bg-white rounded-full text-gray-700"
          >
            100+ Custom paintings made
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[32px] sm:text-[38px] md:text-[44px] leading-[1.15] font-medium text-black mb-6 sm:mb-8"
          >
            Only your imagination <br />
            limits you
          </motion.h1>

          {/* Button */}
          <motion.button
            onClick={() => router.push("/Contact")}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="group flex items-center gap-3 bg-white px-4 sm:px-6 py-2.5 sm:py-2 rounded-full text-lg font-medium shadow-sm mx-auto md:mx-0"
          >
            Contact me

            <div
              className="
                w-7 h-7 rounded-full flex items-center justify-center
                bg-black
                transition-colors duration-500
              "
            >
              <ArrowRight
                className="
                  text-white
                  transition-transform duration-500
                  rotate-[-45deg]
                  group-hover:rotate-0
                "
              />
            </div>
          </motion.button>
        </motion.div>

        {/* RIGHT IMAGE STACK */}
        <div className="relative w-full sm:w-[360px] h-[320px] sm:h-[520px]">
          
          {/* BACK IMAGE 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 10 }}
            animate={{ opacity: 0.3, y: 0, rotate: 6 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            whileHover={{ y: -4 }}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 w-full h-full rounded-[28px] overflow-hidden rotate-[6deg] opacity-30"
          >
            <Image
              src="/Images/art1.jpeg"
              alt="Artwork shadow 2"
              fill
              sizes="(max-width: 768px) 200px, 
              (max-width: 1024px) 300px, 
              400px"
              className="object-cover"
            />
          </motion.div>

          {/* BACK IMAGE 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15, rotate: 6 }}
            animate={{ opacity: 0.5, y: 0, rotate: 3 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            whileHover={{ y: -4 }}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 w-full h-full rounded-[28px] overflow-hidden rotate-[3deg] opacity-50"
          >
            <Image
              src="/Images/art1.jpeg"
              alt="Artwork shadow 1"
              fill
              sizes="(max-width: 768px) 200px, 
              (max-width: 1024px) 300px, 
              400px"
              className="object-cover"
            />
          </motion.div>

          {/* MAIN IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            whileHover={{ scale: 1.03 }}
            className="relative w-full h-full rounded-[28px] overflow-hidden"
          >
            <Image
              src="/Images/art1.jpeg"
              alt="Artwork"
              fill
              sizes="(max-width: 768px) 200px, 
              (max-width: 1024px) 300px, 
              400px"
              className="object-cover"
              priority
            />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;

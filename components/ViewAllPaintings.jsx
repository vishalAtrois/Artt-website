"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ViewAllPaintings = () => {
  const router = useRouter();

  return (
    <section className="bg-[#f7f5ef] px-4 sm:px-6 md:px-[130px] py-8 sm:py-12 md:py-[60px]">
      <motion.div
        onClick={() => router.push("/Paintings")}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ y: -6 }}
        className="cursor-pointer bg-[#e8e4d7] rounded-[28px] p-6 sm:p-12 md:p-[60px] flex flex-col md:flex-row items-center md:justify-between group relative"
      >
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center md:text-left mb-6 md:mb-0"
        >
          <h2 className="text-[28px] sm:text-[36px] md:text-[48px] font-medium text-black leading-tight">
            View All <br /> Paintings
          </h2>
        </motion.div>

        {/* CENTER IMAGES */}
        <div className="relative w-full md:w-[720px] h-[200px] sm:h-[260px] md:h-[320px] flex justify-center md:justify-start mb-6 md:mb-0">
          
          {/* IMAGE 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20, rotate: -4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            whileHover={{ y: -6 }}
            className="absolute md:left-0 left-0 top-4 md:top-[40px] w-[160px] sm:w-[200px] md:w-[220px] h-[180px] sm:h-[260px] md:h-[300px] rounded-[20px] overflow-hidden"
          >
            <Image
              src="/Images/art3.jpeg"
              alt="Painting 1"
              fill
              sizes="(max-width: 768px) 200px, 
              (max-width: 1024px) 300px, 
              400px"
              className="object-cover"
            />
          </motion.div>

          {/* IMAGE 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            whileHover={{ y: -6 }}
            className="absolute md:left-[170px] left-[80px] top-0 md:top-0 w-[160px] sm:w-[200px] md:w-[220px] h-[180px] sm:h-[260px] md:h-[300px] rounded-[20px] overflow-hidden"
          >
            <Image
              src="/Images/art2.jpeg"
              alt="Painting 2"
              fill
              sizes="(max-width: 768px) 200px, 
              (max-width: 1024px) 300px, 
              400px"
              className="object-cover"
            />
          </motion.div>

          {/* IMAGE 3 */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            whileHover={{ y: -6 }}
            className="absolute md:left-[340px] left-[160px] top-4 md:top-[40px] w-[160px] sm:w-[200px] md:w-[220px] h-[180px] sm:h-[260px] md:h-[300px] rounded-[20px] overflow-hidden"
          >
            <Image
              src="/Images/art4.jpeg"
              alt="Painting 3"
              fill
              sizes="(max-width: 768px) 200px, 
              (max-width: 1024px) 300px, 
              400px"
              className="object-cover"
            />
          </motion.div>

        </div>

        {/* RIGHT ARROW */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
        >
          <ArrowRight size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ViewAllPaintings;

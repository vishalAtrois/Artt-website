"use client";

import { motion } from "framer-motion";

const categories = [
  "Abstract Expressions",
  "Compositions",
  "Portraits",
  "Landscape",
  "Minimalism",
  "Modern Art",
];

// List ko double kar dete hain taaki loop smooth ho
const doubleCategories = [...categories, ...categories];

const CategoryNav = () => {
  return (
    <section className="bg-[#f7f5ef] py-16 sm:py-20 md:py-[120px] overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6 sm:gap-8 md:gap-[60px] whitespace-nowrap w-max"
          animate={{
            x: ["0%", "-50%"], // horizontal scroll effect
          }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
        >
          {doubleCategories.map((item, index) => (
            <span
              key={index}
              className="text-[16px] sm:text-[18px] md:text-[22px] font-normal text-gray-500 flex-shrink-0"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryNav;

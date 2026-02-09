"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function InAboutSection() {
  return (
    <section className="relative w-full bg-[#f6f4ef] py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-36 overflow-hidden">
      
      {/* Top center heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-2xl sm:text-3xl md:text-4xl font-normal text-black mb-12 sm:mb-16 md:mb-20"
      >
        Om
      </motion.h2>

      {/* right floating dot */}
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute right-4 sm:right-10 md:right-20 top-10 sm:top-20 md:top-40 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-white"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 md:gap-20 items-center">
        
        {/* Image section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full sm:w-auto"
        >
          {/* background offset card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="absolute -left-2 sm:-left-4 md:-left-6 -top-2 sm:-top-4 md:-top-6 w-full h-full bg-[#edeae3] rounded-2xl"
          />

          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/Images/LadyPhoto.jpg"
              alt="Artist"
              width={600}
              height={750}
              className="object-cover w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-normal text-black mb-4 sm:mb-6"
          >
Konst är min passion
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 leading-relaxed mb-4 sm:mb-6"
          >
         Jag kanaliserar över ett decennium av konstnärlig utforskning i varje komposition, och blandar uttrycksfulla penseldrag med harmoniska paletter. Mina verk inbjuder betraktaren att stanna upp och engagera sig i subtila nyanser av ljus och form.

          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 leading-relaxed mb-4 sm:mb-6"
          >
           Jag ställs ut över hela Europa – både i intima gallerier och storskaliga konst mässor – och strävar efter att koppla samman rum med meningsfulla visuella berättelser. Vare sig det är genom djärva abstrakta verk eller fina studier, återspeglar varje målning mitt engagemang för hantverk och historieberättande.

          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 leading-relaxed mb-6 sm:mb-10"
          >
Följ med mig och upptäck hur konst kan förvandla ett rum och lyfta stämningen.
          </motion.p>

          {/* Signature */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="font-[cursive] text-xl text-black"
          >
AlfJssonart          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

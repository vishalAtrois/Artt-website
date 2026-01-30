'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";


const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const router = useRouter();

  const faqs = [
    {
      question: "Do you accept commissions or custom sizes?",
      answer: "Yes. Share your space, preferred colors, and size and I'll propose a sketch and quote. A small deposit starts the project; most commissions take 3-6 weeks, with progress updates and a final approval before varnish and shipping."
    },
    {
      question: "How are artworks shipped and how long does delivery take?",
      answer: "Artworks are carefully packed in custom crates or heavy-duty tubes. Shipping usually takes 5-10 business days depending on your location."
    },
    {
      question: "Do the paintings come framed?",
      answer: "Most original paintings come with a gallery wrap or a floating frame. Specific details are mentioned on each artwork page."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 14-day satisfaction guarantee. If the artwork doesn't fit your space as expected, you can return it in its original packaging."
    },
    {
      question: "What materials do you use and how should I care for the artwork?",
      answer: "I use professional-grade oils and canvases. Keep away from direct sunlight and dust lightly with a dry microfibre cloth."
    }
  ];

  // Animation Variants for reusability
  const smoothTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] // Custom "Apple-style" cubic bezier
  };

  return (
    <section className="bg-[#f2f0ea] py-16 md:py-24 px-6 md:px-20 lg:px-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Animation */}
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={smoothTransition}
          className="text-[36px] md:text-[48px] font-medium leading-tight mb-12 text-[#1a1a1a]"
        >
          Not sure about <br /> something?
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-24">
          
          {/* Left Side: Image with Contact Button */}
          <motion.div 
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="lg:w-1/3 w-full"
          >
            <div className="relative rounded-[24px] overflow-hidden shadow-sm h-full min-h-[500px] lg:min-h-full">
              <Image 
                src="/Images/teyrion.jpg"
                alt="Artist Portrait" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              <div
                      onClick={() => router.push("/Contact")}

              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]">
                <button className="w-full bg-white rounded-full py-3 px-6 flex items-center justify-between group hover:bg-black hover:text-white transition-all duration-500">
                  <span className="font-medium text-[#1a1a1a] group-hover:text-white">Contact me</span>
                  <div className="bg-[#2c2c2c] text-white rounded-full p-1.5 group-hover:bg-white group-hover:text-black transition-colors duration-500">
                  <ArrowRight
                className="
                  text-black
                  transition-transform duration-500
                  rotate-[-45deg]
                  group-hover:rotate-0
                "
              />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Side: FAQ Accordion */}
          <div className="lg:w-2/3 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ ...smoothTransition, delay: 0.1 * index }}
                className="flex flex-col"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full text-left p-6 rounded-[16px] flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    openIndex === index ? 'bg-[#d9d5c7]' : 'bg-[#e2dfd4] hover:bg-[#d9d5c7]'
                  }`}
                >
                  <span className="text-[17px] md:text-[19px] font-medium text-[#333]">
                    {faq.question}
                  </span>
                  <motion.div 
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={smoothTransition}
                    className="bg-[#d1cdbd] p-2 rounded-full"
                  >
                    {openIndex === index ? (
                      <Minus size={20} className="text-[#333]" />
                    ) : (
                      <Plus size={20} className="text-[#333]" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        height: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.4, delay: 0.1 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white rounded-[24px] p-8 mt-3 shadow-sm border border-black/5">
                        <p className="text-[16px] md:text-[17px] leading-relaxed text-[#555]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { AdminStorage } from "@/lib/adminStorage";

export default function StartConversation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    painting: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminStorage.addContact(formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      painting: "",
      subject: "",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative w-full bg-[#f6f4ef] py-28 px-6 overflow-hidden">
      
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-4xl md:text-5xl font-normal text-black mb-4"
      >
        Start the Conversation
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center text-gray-600 max-w-xl mx-auto mb-20"
      >
        Interested in a painting? Have a question? Just fill out the form or
        contact me via{" "}
        <span className="underline">example@example.com</span>
      </motion.p>

      {/* right floating dot */}
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute right-20 top-40 w-3 h-3 rounded-full bg-white"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white rounded-2xl p-10 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        
        {/* Left image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full h-full rounded-xl overflow-hidden"
        >
          <Image
            src="/Images/teyrion.jpg"
            alt="Contact"
            fill
            sizes="(max-width: 768px) 200px, 
            (max-width: 1024px) 300px, 
            400px"
            className="object-cover"
          />
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
            >
              <label className="text-sm text-black block mb-2">Name</label>
              <input
                type="text"
                placeholder="Jane Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.15 }}
            >
              <label className="text-sm text-black block mb-2">Email</label>
              <input
                type="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
                required
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            <label className="text-sm text-black block mb-2">
              Painting <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Time Won't Wait"
              value={formData.painting}
              onChange={(e) => setFormData({ ...formData, painting: e.target.value })}
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.25 }}
          >
            <label className="text-sm text-black block mb-2">Subject</label>
            <input
              type="text"
              placeholder="Painting Order"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-sm text-black block mb-2">Message</label>
            <textarea
              rows="4"
              placeholder='I would like to purchase the "Time Won't Wait" painting...'
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black resize-none"
            />
          </motion.div>

          {/* Button */}   
          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-green-100 text-green-800 rounded-lg text-sm text-center"
            >
              Message sent successfully!
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#4b463f] text-white py-4 rounded-full flex items-center justify-center gap-3 hover:bg-black transition"
          >
            Send message

            <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-black stroke-[3]" />
            </span>
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}

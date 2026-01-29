"use client";

import { useState } from "react";
import Link from "next/link";
import { FaTiktok, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="h-[90px] bg-[#f7f5ef] flex items-center justify-between px-[20px] md:px-[80px] relative z-50">
      
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2"
      >
        <span className="w-[10px] h-[10px] rounded-full bg-white" />
        <span className="text-[16px] font-medium text-black">
        AlfJssonart
        </span>
      </motion.div>

      {/* Desktop Menu */}
      <motion.ul
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
        className="hidden md:flex gap-[40px]"
      >
        {["Homepage", "Paintings", "About", "Contact"].map((item, i) => (
          <motion.li
            key={item}
            variants={{
              hidden: { opacity: 0, y: -10 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={item === "Homepage" ? "/" : `/${item}`}
              className="text-[15px] text-black"
            >
              {item}
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* Desktop Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="hidden md:flex gap-[18px]"
      >
        <motion.span whileHover={{ y: -3 }}>
          <FaTiktok className="text-[16px] text-black" />
        </motion.span>
        <motion.span whileHover={{ y: -3 }}>
          <FaXTwitter className="text-[16px] text-black" />
        </motion.span>
        <motion.span whileHover={{ y: -3 }}>
          <FaInstagram className="text-[16px] text-black" />
        </motion.span>
      </motion.div>

      {/* Hamburger */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="md:hidden text-black text-[26px]"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <HiOutlineX />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <HiOutlineMenu />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-[90px] left-0 w-full bg-[#f7f5ef] md:hidden z-50"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
              className="flex flex-col items-center gap-6 py-6"
            >
              {["Homepage", "Paintings", "About", "Contact"].map((item) => (
                <motion.div
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={item === "Homepage" ? "/" : `/${item}`}
                    onClick={() => setOpen(false)}
                    className="text-[15px] text-black"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-[18px] pt-2"
              >
                <FaTiktok className="text-[16px] text-black" />
                <FaXTwitter className="text-[16px] text-black" />
                <FaInstagram className="text-[16px] text-black" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;

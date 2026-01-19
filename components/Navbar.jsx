"use client";

import { useState } from "react";
import Link from "next/link";
import { FaTiktok, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="h-[90px] bg-[#f7f5ef] flex items-center justify-between px-[20px] md:px-[80px] relative z-50">
      
      {/* Left */}
      <div className="flex items-center gap-2">
        <span className="w-[10px] h-[10px] rounded-full bg-white" />
        <span className="text-[16px] font-medium text-black">
          Christina
        </span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-[40px]">
        <li><Link href="/" className="text-[15px] text-black">Homepage</Link></li>
        <li><Link href="/Paintings" className="text-[15px] text-black">Paintings</Link></li>
        <li><Link href="/About" className="text-[15px] text-black">About</Link></li>
        <li><Link href="/Contact" className="text-[15px] text-black">Contact</Link></li>
      </ul>

      {/* Desktop Icons */}
      <div className="hidden md:flex gap-[18px]">
        <FaTiktok className="text-[16px] text-black" />
        <FaXTwitter className="text-[16px] text-black" />
        <FaInstagram className="text-[16px] text-black" />
      </div>

      {/* Hamburger */}
      <button
        className="md:hidden text-black text-[26px]"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        {open ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-[90px] left-0 w-full bg-[#f7f5ef] md:hidden transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } z-50`}
      >
        <div className="flex flex-col items-center gap-6 py-6">
          <Link href="/" onClick={() => setOpen(false)} className="text-[15px] text-black">
            Homepage
          </Link>
          <Link href="/Paintings" onClick={() => setOpen(false)} className="text-[15px] text-black">
            Paintings
          </Link>
          <Link href="/About" onClick={() => setOpen(false)} className="text-[15px] text-black">
            About
          </Link>
          <Link href="/Contact" onClick={() => setOpen(false)} className="text-[15px] text-black">
            Contact
          </Link>

          <div className="flex gap-[18px] pt-2">
            <FaTiktok className="text-[16px] text-black" />
            <FaXTwitter className="text-[16px] text-black" />
            <FaInstagram className="text-[16px] text-black" />
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;

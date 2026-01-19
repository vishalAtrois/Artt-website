import Link from "next/link";
import { FaTiktok, FaXTwitter, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-[#FAF8F3] px-4 sm:px-6 md:px-36 pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
          
          {/* LEFT */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-medium mb-3">Christina</h3>
            <p className="text-sm text-gray-600 mb-4 sm:mb-6">
              christina@example.com
            </p>

            <div className="flex justify-center md:justify-start gap-5 text-lg text-black">
              <FaTiktok />
              <FaXTwitter />
              <FaInstagram />
            </div>
          </div>

          {/* MIDDLE */}
          <div className="text-center md:text-left mt-8 md:mt-0">
            <h4 className="text-sm font-medium mb-4 sm:mb-6">Pages</h4>
            <ul className="space-y-2 sm:space-y-4 text-sm text-gray-700">
              <li><Link href="/">Homepage</Link></li>
              <li><Link href="/Paintings">Paintings</Link></li>
              <li><Link href="/About">About</Link></li>
              <li><Link href="/Contact">Contact</Link></li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="text-center md:text-left mt-8 md:mt-0">
            <h4 className="text-sm font-medium mb-4 sm:mb-6">Paintings for sale</h4>
            <ul className="space-y-2 sm:space-y-4 text-sm text-gray-700">
              <li>Obsidian Tide</li>
              <li>Crimson Horizon</li>
              <li>Golden Veins</li>
              <li>Azure Fragments</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

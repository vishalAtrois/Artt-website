"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const ContactSection = () => {
  const router = useRouter();

  return (
    <section className="w-full px-4 sm:px-6 md:px-32 py-8 sm:py-10">
      <div
        onClick={() => router.push("/Contact")}
        className="max-w-7xl mx-auto bg-gradient-to-b from-[#f3efe6] via-[#ded7c9] to-[#cfc7b6] rounded-[32px] px-6 sm:px-12 py-12 sm:py-16 flex flex-col md:flex-row items-center md:justify-between overflow-hidden"
      >
        {/* LEFT CONTENT */}
        <div className="max-w-full md:max-w-xl text-center md:text-left mb-8 md:mb-0">
          
          {/* Badge */}
          <span className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-2 text-sm bg-white rounded-full text-gray-700">
            100+ Custom paintings made
          </span>

          {/* Heading */}
          <h1 className="text-[32px] sm:text-[38px] md:text-[44px] leading-[1.15] font-medium text-black mb-6 sm:mb-8">
            Only your imagination <br />
            limits you
          </h1>

          {/* Button */}
          <button
            onClick={() => router.push("/Contact")}
            className="flex items-center gap-3 bg-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition"
          >
            Contact me
            <span className="w-9 h-9 flex items-center justify-center bg-black text-white rounded-full">
              ↗
            </span>
          </button>
        </div>

        {/* RIGHT IMAGE STACK */}
        <div className="relative w-full sm:w-[360px] h-[320px] sm:h-[520px]">
          
          {/* BACK IMAGE 2 */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-full h-full rounded-[28px] overflow-hidden rotate-[6deg] opacity-30">
            <Image
              src="/Images/art1.jpeg"
              alt="Artwork shadow 2"
              fill
              className="object-cover"
            />
          </div>

          {/* BACK IMAGE 1 */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-full h-full rounded-[28px] overflow-hidden rotate-[3deg] opacity-50">
            <Image
              src="/Images/art1.jpeg"
              alt="Artwork shadow 1"
              fill
              className="object-cover"
            />
          </div>

          {/* MAIN IMAGE */}
          <div className="relative w-full h-full rounded-[28px] overflow-hidden">
            <Image
              src="/Images/art1.jpeg"
              alt="Artwork"
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;

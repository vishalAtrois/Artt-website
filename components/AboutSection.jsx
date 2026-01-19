import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="bg-[#f7f5ef] px-6 sm:px-10 md:px-[130px] py-[80px] md:py-[120px]">
      <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-[120px]">

        {/* LEFT */}
        <div className="flex-shrink-0 text-center md:text-left">
          <h2 className="text-[36px] md:text-[48px] font-medium text-black mb-6 md:mb-8">
            About
          </h2>

          <button className="mx-auto md:mx-0 flex items-center gap-3 bg-[#e8e2d6] px-6 py-3 rounded-full text-[15px] text-black">
            More about me
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <ArrowUpRight size={16} />
            </span>
          </button>
        </div>

        {/* RIGHT */}
        <div className="max-w-full md:max-w-[560px] text-[15px] md:text-[16px] leading-relaxed text-black/70 space-y-5 md:space-y-6">
          <p>
            I am a visual artist with over ten years of experience in painting
            and visual communication. In my work, I combine delicate
            brushstrokes with minimalist compositions to create emotional
            visual stories.
          </p>

          <p>
            I collaborate with galleries and private collectors and participate
            in exhibitions both at home and abroad. My approach combines
            traditional techniques with modern methods, giving each work a
            unique depth and precision.
          </p>

          {/* SIGNATURE */}
          <div className="flex items-center justify-center md:justify-start gap-3 pt-4 md:pt-6">
            <div className="rotate-[-6deg] bg-[#e8e4d7] p-1 rounded-md shadow-sm">
              <Image
                src="/Images/LadyPhoto.jpg"
                alt="Christina Vale"
                width={36}
                height={36}
                className="rounded-md object-cover"
              />
            </div>

            <span className="font-[cursive] text-[18px] md:text-[20px] text-black">
              Christina Vale
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;

import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative bg-[#f7f5ef] py-[80px] sm:py-[100px] md:py-[120px] overflow-hidden">
      
      {/* Background Text */}
      <h1 className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[180px] md:text-[220px] font-semibold text-black/5 select-none">
        Christina
      </h1>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-0">
        
        {/* Name Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <h2 className="text-[40px] sm:text-[52px] md:text-[64px] font-medium text-black">
            Christina
          </h2>

          {/* Image */}
          <div className="rotate-[-6deg] bg-white p-1 rounded-md shadow-md">
            <Image
              src="/Images/LadyPhoto.jpg"
              alt="Christina"
              width={60}
              height={60}
              className="sm:w-20 sm:h-20 rounded-md object-cover"
            />
          </div>

          <h2 className="text-[40px] sm:text-[52px] md:text-[64px] font-medium text-black">
            Vale
          </h2>
        </div>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 max-w-[320px] sm:max-w-[440px] md:max-w-[520px] text-[14px] sm:text-[15px] text-black/70 leading-relaxed">
          Calm, thoughtful art made to settle a room <br />
          and leave a lasting presence in every space.
        </p>
      </div>

    </section>
  );
};

export default Hero;

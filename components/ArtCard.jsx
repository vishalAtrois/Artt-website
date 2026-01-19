import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ArtCard = ({ art }) => {
  return (
    <div className="bg-[#e8e4d7] hover:bg-[#dcd6c8] rounded-[32px] px-4 sm:px-6 md:px-8 relative max-w-full font-sans">

      {/* 1. For Sale Badge (Top Right) */}
      {art.forSale && (
        <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-10 bg-white/80 backdrop-blur-sm text-[12px] sm:text-[14px] py-1 px-3 sm:py-1.5 sm:px-4 rounded-full flex items-center gap-1 shadow-sm">
          <span className="text-gray-500">$</span>
          <span className="text-black">For sale</span>
        </div>
      )}

      {/* 3. Image Container */}
      <div className="p-8 sm:p-16">
        <div className="relative rounded-[12px] overflow-hidden bg-white shadow-sm">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[8px]">
            <Image
              src={art.image}
              alt={art.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 4. Bottom Content Section */}
      <div className="mt-4 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-[20px] sm:text-[24px] font-semibold text-[#1a1a1a] tracking-tight">
            {art.title}
          </h3>
          <p className="text-[14px] sm:text-[16px] text-gray-600 font-normal">
            {art.category}
          </p>
        </div>

        {/* See Details Button */}
        <button className="bg-white hover:bg-gray-50 transition-colors py-2.5 sm:py-3 px-4 sm:px-6 rounded-full flex items-center justify-center sm:justify-start gap-2 sm:gap-3 shadow-sm text-[14px] sm:text-[16px]">
          <span className="font-medium text-black">See details</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>  
  );
};

export default ArtCard;

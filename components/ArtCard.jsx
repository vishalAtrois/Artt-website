import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ArtCard = ({ art }) => {
  return (
    <Link href={`/Paintings/${art.id}`} className="block">
      <div className="bg-[#e8e4d7] hover:bg-[#dcd6c8] transition rounded-[32px] px-4 sm:px-6 md:px-8 relative font-sans">

        {art.forSale && (
          <div className="absolute top-4 right-6 z-10 bg-white/80 backdrop-blur-sm text-[14px] py-1.5 px-4 rounded-full shadow-sm">
            <span className="text-gray-500 mr-1">$</span>
            <span className="text-black">For sale</span>
          </div>
        )}

        <div className="p-8 sm:p-16">
          <div className="relative rounded-[12px] overflow-hidden bg-white shadow-sm">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={art.image}
                alt={art.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="pb-6 flex items-center justify-between">
          <div>
            <h3 className="text-[22px] font-semibold">{art.title}</h3>
            <p className="text-gray-600">{art.category}</p>
          </div>

          <div className="bg-white rounded-full p-3 shadow-sm">
            <ArrowRight />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtCard;

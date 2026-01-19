import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artworks } from "@/data/artworks";

const LatestPaintings = () => {
  const latestArtworks = artworks.slice(0, 2);

  return (
    <section className="bg-[#f7f5ef] px-4 sm:px-6 md:px-[80px] py-14 md:py-20">
      {/* Section Title */}
      <h2 className="text-[28px] sm:text-[34px] md:text-[42px] font-semibold mb-10 md:mb-14">
        Latest paintings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {latestArtworks.map((art) => (
          <Link key={art.id} href={`/Paintings/${art.id}`} className="block">
            <div className="bg-[#e8e4d7] rounded-3xl p-5 sm:p-8 md:p-10 relative hover:bg-[#ddd7c9] transition">

              {/* For Sale Badge */}
              {art.forSale && (
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/80 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full shadow-sm z-50">
                  $ For sale
                </div>
              )}

              {/* Image */}
              <div className="flex justify-center mb-8 md:mb-10">
  <div
    className={`relative
      ${art.layout === "vertical"
        ? "w-[200px] sm:w-[230px] md:w-[260px]"
        : "w-[260px] sm:w-[300px] md:w-[360px]"
      }
      h-[300px] sm:h-[340px] md:h-[380px]
      bg-white rounded-xl overflow-hidden shadow-md`}
  >
    <Image
      src={art.image}
      alt={art.title}
      fill
      className="object-cover"
    />
  </div>
</div>


              {/* Bottom Content */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-medium">
                    {art.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {art.category}
                  </p>
                </div>

                <div className="bg-white p-2.5 sm:p-3 rounded-full shadow-sm flex-shrink-0">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestPaintings;

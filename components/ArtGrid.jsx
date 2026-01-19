import ArtCard from "./ArtCard";
import { artworks } from "@/data/artworks";

const ArtGrid = () => {
  return (
    <section className="bg-[#f7f5ef] px-4 sm:px-6 md:px-[50px] py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        {artworks.map((art) => (
          <ArtCard key={art.id} art={art} />
        ))}
      </div>
    </section>
  );
};

export default ArtGrid;
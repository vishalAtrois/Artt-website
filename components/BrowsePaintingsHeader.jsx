export default function BrowsePaintingsHeader() {
    return (
      <section className="relative w-full bg-[#f6f4ef] py-24 flex items-center justify-center">
        
        {/* top small dot */}
        <span className="absolute top-8 w-3 h-3 rounded-full bg-white"></span>
  
        {/* heading */}
        <h1 className="text-4xl md:text-5xl font-normal text-black tracking-tight">
          Browse All Paintings
        </h1>
      </section>
    );
  }
  
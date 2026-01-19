import Image from "next/image";

export default function InAboutSection() {
  return (
    <section className="relative w-full bg-[#f6f4ef] py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-36">
      
      {/* Top center heading */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-normal text-black mb-12 sm:mb-16 md:mb-20">
        About
      </h2>

      {/* right floating dot */}
      <span className="absolute right-4 sm:right-10 md:right-20 top-10 sm:top-20 md:top-40 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-white"></span>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 md:gap-20 items-center">
        
        {/* Image section */}
        <div className="relative w-full sm:w-auto">
          {/* background offset card */}
          <div className="absolute -left-2 sm:-left-4 md:-left-6 -top-2 sm:-top-4 md:-top-6 w-full h-full bg-[#edeae3] rounded-2xl"></div>

          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/Images/LadyPhoto.jpg"   // image public folder me honi chahiye
              alt="Artist"
              width={600}
              height={750}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* Text content */}
        <div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-black mb-4 sm:mb-6 md:mb-6">
            Art is my passion
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6">
            I channel over a decade of artistic exploration into each composition,
            blending expressive brushwork with harmonious palettes. My work invites
            viewers to pause and engage with subtle nuances of light and form.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6">
            Exhibited across Europe—in both intimate galleries and large-scale art
            fairs—I strive to connect spaces with meaningful visual narratives.
            Whether through bold abstracts or delicate studies, every painting
            reflects my commitment to craftsmanship and storytelling.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 sm:mb-10">
            Join me in discovering how art can transform a room and uplift the spirit.
          </p>

          {/* Signature */}
          <p className="font-[cursive] text-xl text-black">
            Christina Vale
          </p>
        </div>
      </div>
    </section>
  );
}

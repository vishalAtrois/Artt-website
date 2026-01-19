import Image from "next/image";

export default function StartConversation() {
  return (
    <section className="relative w-full bg-[#f6f4ef] py-28 px-6">
      
      {/* Heading */}
      <h2 className="text-center text-4xl md:text-5xl font-normal text-black mb-4">
        Start the Conversation
      </h2>

      <p className="text-center text-gray-600 max-w-xl mx-auto mb-20">
        Interested in a painting? Have a question? Just fill out the form or
        contact me via{" "}
        <span className="underline">example@example.com</span>
      </p>

      {/* right floating dot */}
      <span className="absolute right-20 top-40 w-3 h-3 rounded-full bg-white"></span>

      {/* Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-10 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left image */}
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src="/Images/teyrion.jpg"
            alt="Contact"
            fill
            className="object-cover"
          />
        </div>

        {/* Form */}
        <form className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-black block mb-2">Name</label>
              <input
                type="text"
                placeholder="Jane Smith"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="text-sm text-black block mb-2">Email</label>
              <input
                type="email"
                placeholder="example@example.com"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-black block mb-2">
              Painting <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Time Won’t Wait"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="text-sm text-black block mb-2">Subject</label>
            <input
              type="text"
              placeholder="Painting Order"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="text-sm text-black block mb-2">Message</label>
            <textarea
              rows="4"
              placeholder='I would like to purchase the "Time Won’t Wait" painting...'
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black resize-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#4b463f] text-white py-4 rounded-full flex items-center justify-center gap-3 hover:bg-black transition"
          >
            Send message
            <span className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center">
              →
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}

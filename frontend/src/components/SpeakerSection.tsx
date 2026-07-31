"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const speakers = [
  {
    name: "Tony Tsai",
    origin: "Taiwan",
    role: "Color Expert",
    image: "/images/speaker-tony.png",
    description:
      "Pelopor teknik pewarnaan modern dan Balayage presisi. Dengan pengalaman 15+ tahun, ia merancang formulasi warna vibran berstandar global.",
    skills: ["Creative Color", "Balayage", "Color Correction"],
    imageStyle: "object-cover object-top",
  },
  {
    name: "Shinichi Takahashi",
    origin: "Japan",
    role: "Cutting Master",
    image: "/images/speaker-shinichi.png",
    description:
      "Spesialis potongan presisi arsitektural. Memadukan struktur geometris dengan kontur alami untuk menciptakan desain rambut yang berkarakter.",
    skills: ["Precision Cut", "Asian Texture", "Live Styling"],
    imageStyle: "object-contain object-bottom",
  },
];

export default function SpeakerSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-[#FAFAFA] overflow-hidden font-sans select-none" id="speakers">
      {/* Simple & Clean Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[#FAFAFA]" />
        {/* Soft accent gradient blur at top right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(219,169,169,0.06),transparent_70%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Minimalist Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16 md:mb-24"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#D86B6B] uppercase mb-3">
            World-Class Instructors
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tight uppercase">
            Guest Speakers
          </h2>
          <div className="w-10 h-0.5 bg-[#EB9999] mt-6" />
        </motion.div>

        {/* Modern, Fresh Portrait Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500"
            >
              {/* Top Image Section */}
              <div className="relative w-full h-[380px] md:h-[420px] bg-gradient-to-b from-gray-50 to-gray-200/50 overflow-hidden flex items-end justify-center px-8">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#D86B6B]/10 rounded-full blur-3xl -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                
                {/* Origin Tag Overlay */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black tracking-widest text-[#111111] uppercase shadow-[0_4px_10px_rgb(0,0,0,0.05)] border border-white/50">
                    {speaker.origin}
                  </span>
                </div>

                {/* Speaker Image */}
                <div className="relative w-full h-[90%] z-10 mt-auto">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`${speaker.imageStyle || "object-contain object-bottom"} drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-transform duration-700 group-hover:scale-[1.03] group-hover:-translate-y-2`}
                  />
                </div>
              </div>
              <div className="relative flex flex-col flex-1 p-8 lg:p-10 bg-white">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-md bg-[#111111] text-white text-[10px] font-bold tracking-widest uppercase mb-5 transition-colors duration-300 group-hover:bg-[#D86B6B]">
                    {speaker.role}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-black text-[#111111] tracking-tight mb-4 group-hover:text-[#D86B6B] transition-colors duration-300">
                    {speaker.name}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-500 leading-relaxed font-medium">
                    {speaker.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
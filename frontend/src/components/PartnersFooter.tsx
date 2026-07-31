"use client";

import Image from "next/image";

const partners = [
  {
    name: "Alfa Beauty",
    logo: "/images/logo-alfa-beauty.png",
    width: 130,
    height: 45,
  },
  {
    name: "EPOCH",
    logo: "/images/logo-epoch.png",
    width: 95,
    height: 38,
  },
  {
    name: "Hikari",
    logo: "/images/logo-hikari.jpeg",
    width: 48,
    height: 55,
  },
  {
    name: "Gamma+",
    logo: "/images/logo-gamma.png",
    width: 110,
    height: 32,
  },
];

export default function PartnersFooter() {
  return (
    <footer className="relative py-20 px-6 border-t border-gray-200 bg-[#F9F9FA] overflow-hidden">
      <div className="relative max-w-6xl mx-auto z-10">
        {/* Partners Showcase Section */}
        <div className="mb-24 text-center">
          <span className="inline-block px-3 py-1 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-12">
            Official Sponsors & Brand Partners
          </span>

          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="relative group p-4 transition-all duration-300 hover:-translate-y-1"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300 filter grayscale"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-px w-full bg-gray-200 mb-12" />

        {/* Contact & Copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Brand Info */}
          <div>
            <h4 className="text-2xl font-black tracking-tighter text-[#111111]">
              AIR <span className="text-[#D86B6B]">&</span> EDGE 2026
            </h4>
            <p className="text-xs text-gray-500 mt-2 font-medium tracking-wide uppercase">
              Hair Show & Workshop Masterclass by Epoch Academy × Hikari
            </p>
          </div>

          {/* Direct Contact */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+6281511688745"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white text-[10px] font-bold text-[#111111] tracking-widest uppercase hover:border-[#111111] transition-all duration-300"
            >
              <span>+62 815 1168 8745</span>
            </a>

            <a
              href="https://wa.me/6281511688745"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white text-[10px] font-bold tracking-widest uppercase hover:bg-[#D86B6B] transition-all duration-300"
            >
              <span>WhatsApp Admin</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
            © 2026 AIR & EDGE. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

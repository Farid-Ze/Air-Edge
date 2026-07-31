"use client";

import Image from "next/image";

const partners = [
  {
    name: "Alfa Beauty",
    logo: "/images/logo-alfa-beauty.png",
    width: 300,
    height: 100,
    maxHeight: "76px",
  },
  {
    name: "EPOCH",
    logo: "/images/logo-epoch.png",
    width: 160,
    height: 60,
    maxHeight: "45px",
  },
  {
    name: "Hikari",
    logo: "/images/logo-hikari.jpeg",
    width: 80,
    height: 80,
    maxHeight: "55px",
  },
  {
    name: "Gamma+",
    logo: "/images/logo-gamma.png",
    width: 180,
    height: 50,
    maxHeight: "42px",
  },
];

export default function PartnersFooter() {
  return (
    <footer className="relative py-20 px-6 border-t border-gray-200 bg-[#F9F9FA] overflow-hidden">
      <div className="relative max-w-6xl mx-auto z-10">
        {/* Partners Showcase Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#EB9999]/15 text-[#D86B6B] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-3">
              Official Partnerships
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight">
              Sponsors & Brand Partners
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group relative flex items-center justify-center p-4 sm:p-6 bg-white rounded-2xl border border-gray-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(219,169,169,0.15)] hover:border-[#DBA9A9] hover:-translate-y-1 transition-all duration-300 h-[120px]"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  style={{ width: "auto", maxHeight: partner.maxHeight }}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
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

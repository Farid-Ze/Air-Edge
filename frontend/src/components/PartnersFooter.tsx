"use client";

import Image from "next/image";

const partners = [
  {
    name: "Alfaparf Milano",
    logo: "/images/logo-alfaparf.png",
    width: 280,
    height: 90,
    // Alfaparf Milano clean typography logo
    sizeClass: "h-6 sm:h-10 md:h-13 lg:h-16",
  },
  {
    name: "EPOCH",
    logo: "/images/logo-epoch.png",
    width: 160,
    height: 60,
    // EPOCH text logo: reference baseline height
    sizeClass: "h-6 sm:h-9 md:h-12 lg:h-14",
  },
  {
    name: "Hikari",
    logo: "/images/logo-hikari.jpeg",
    width: 80,
    height: 80,
    // Hikari is a solid square block: tuned so it doesn't overpower text logos
    sizeClass: "h-7 sm:h-10 md:h-13 lg:h-15 rounded-md shadow-2xs",
  },
  {
    name: "Gamma+",
    logo: "/images/logo-gamma.png",
    width: 180,
    height: 50,
    // Gamma+ is ultra wide: tuned so its lettering matches EPOCH font height
    sizeClass: "h-4 sm:h-6 md:h-7.5 lg:h-9",
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
              Sponsors &amp; Brand Partners
            </h3>
          </div>

          {/* Optically Balanced Pure Horizontal Alignment of Logos across Mobile, Tablet, and Desktop */}
          <div className="flex flex-row items-center justify-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 max-w-6xl mx-auto py-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group relative flex items-center justify-center p-1 hover:-translate-y-1 transition-transform duration-300 shrink-0"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  style={{ width: "auto" }}
                  className={`w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${partner.sizeClass}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-px w-full bg-gray-200 mb-12" />

        {/* Contact & Copyright Footer Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-center lg:text-left">
          {/* Brand Info */}
          <div className="max-w-md">
            <h4 className="text-2xl font-black tracking-tight text-[#111111]">
              AIR <span className="text-[#D86B6B]">&amp;</span> EDGE 2026
            </h4>
            <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide uppercase">
              Hair Show &amp; Workshop Masterclass by Epoch Academy × Hikari
            </p>
          </div>

          {/* Direct Contact & Social CTAs: 100% Single Horizontal Row across all screens */}
          <div className="flex flex-row items-center justify-center lg:justify-end gap-1.5 sm:gap-2.5 w-full sm:w-auto overflow-x-auto py-1 no-scrollbar shrink-0">
            <a
              href="tel:+6281511688745"
              className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-3 border border-gray-300 bg-white text-[9px] sm:text-[10px] font-bold text-[#111111] tracking-wider sm:tracking-widest uppercase hover:border-[#111111] hover:bg-gray-50 rounded-xl transition-all duration-300 shadow-xs whitespace-nowrap shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-gray-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+62 815 1168 8745</span>
            </a>

            <a
              href="https://wa.me/6281511688745"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[9px] sm:text-[10px] font-bold tracking-wider sm:tracking-widest uppercase rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(37,211,102,0.25)] hover:scale-102 whitespace-nowrap shrink-0"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp Admin</span>
            </a>

            <a
              href="https://www.tiktok.com/@alfabeautycosmetica"
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok @alfabeautycosmetica"
              className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-3 bg-black hover:bg-gray-800 text-white text-[9px] sm:text-[10px] font-bold tracking-wider sm:tracking-widest uppercase rounded-xl transition-all duration-300 shadow-md hover:scale-102 whitespace-nowrap shrink-0"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.32 6.32 0 006.31 6.32 6.32 6.32 0 006.3-6.32V10.6a8.21 8.21 0 004.3 1.22V8.37a5.44 5.44 0 01-2.32-.49A5.33 5.33 0 0119.59 6.69z"/></svg>
              <span>TikTok</span>
            </a>
          </div>
        </div>

        {/* Sub-Footer Copyright Line */}
        <div className="mt-8 pt-6 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-gray-400 font-semibold tracking-widest uppercase">
          <div>© 2026 AIR &amp; EDGE. All Rights Reserved.</div>
          <div>Alfa Beauty Cosmetic Official Event</div>
        </div>
      </div>
    </footer>
  );
}

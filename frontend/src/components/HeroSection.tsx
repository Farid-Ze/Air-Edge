"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#F5F5F7] overflow-hidden flex flex-col justify-between font-sans select-none">
      
      {/* 100% Lightweight CSS Radial Gradient Background & Grid (Zero-blur for maximum scroll performance) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 5% 0%, rgba(219, 169, 169, 0.5) 0%, transparent 45%),
            radial-gradient(circle at 95% 15%, rgba(184, 124, 124, 0.35) 0%, transparent 45%),
            radial-gradient(circle at 35% 85%, rgba(240, 213, 213, 0.4) 0%, transparent 50%)
          `
        }}
      >
        {/* Modern Grid overlay with mask */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_30%,#000_40%,transparent_100%)]" />
      </div>

      {/* Top Header (UX Best Practice: Clean Centered Logo on Mobile, Full 3-Column on Desktop) */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-12 pt-2 md:pt-3 pb-2 w-full max-w-[1600px] mx-auto text-xs font-semibold tracking-wider text-black">
        {/* Socials & Contact CTAs (Desktop Only) */}
        <div className="hidden md:flex items-center gap-3 w-1/3">
          <div className="flex items-center gap-2">
            {/* WhatsApp CTA Icon */}
            <a
              href="https://wa.me/6281511688745"
              target="_blank"
              rel="noopener noreferrer"
              title="Chat WhatsApp Admin"
              className="w-8 h-8 bg-[#25D366] text-white rounded-lg flex items-center justify-center shadow-md hover:scale-110 hover:bg-[#20bd5a] transition-all duration-300"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>

            {/* TikTok CTA Icon */}
            <a
              href="https://www.tiktok.com/@alfabeautycosmetica"
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok @alfabeautycosmetica"
              className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center shadow-md hover:scale-110 hover:bg-gray-800 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.32 6.32 0 006.31 6.32 6.32 6.32 0 006.3-6.32V10.6a8.21 8.21 0 004.3 1.22V8.37a5.44 5.44 0 01-2.32-.49A5.33 5.33 0 0119.59 6.69z"/></svg>
            </a>

            {/* Instagram CTA Icon */}
            <a
              href="https://instagram.com/alfabeauty_id"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram @alfabeauty_id"
              className="w-8 h-8 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
          <a href="https://instagram.com/alfabeauty_id" target="_blank" rel="noopener noreferrer" className="font-bold text-xs hover:text-[#D86B6B] transition-colors">
            @alfabeauty_id
          </a>
        </div>

        {/* Logo (Centered on Mobile & Desktop - +100% Size) */}
        <div className="w-full md:w-1/3 flex justify-center py-1">
          <Image 
            src="/images/logo-alfa-beauty.png" 
            alt="Alfa Beauty" 
            width={600} 
            height={200} 
            className="h-20 sm:h-24 md:h-36 lg:h-44 w-auto object-contain drop-shadow-md hover:scale-105 transition-all duration-300" 
            priority 
          />
        </div>

        {/* Tagline (Desktop Only) */}
        <div className="hidden md:block w-1/3 text-right">
          <span className="italic text-gray-500 font-medium text-[10px] md:text-[11px]">
            Inspiration. Collaboration. Elevation.
          </span>
        </div>
      </header>

      {/* Hero Canvas Stage (Shared Boundary for Central Text & Side Characters) */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start pt-2 md:pt-4 px-4 w-full max-w-[1600px] mx-auto min-h-[420px] sm:min-h-[500px] md:min-h-[620px] lg:min-h-[720px]">
        
        {/* Central Content Column */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto pointer-events-none">
          {/* Pre-title */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] md:text-[12px] font-bold tracking-[0.3em] md:tracking-[0.4em] text-gray-700 uppercase mb-3 text-center"
          >
            COLLABORATION WITH <br className="md:hidden" /> EPOCH ACADEMY &amp; HIKARI SCISSORS
          </motion.p>

          {/* Giant Title */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative text-center leading-[0.85] font-black text-[11vw] sm:text-[12vw] md:text-[95px] lg:text-[120px] font-[var(--font-alfa)] text-[#111]"
          >
            <div className="relative z-20 tracking-tight drop-shadow-2xl flex items-center justify-center gap-2 md:gap-4">
              <span>AIR</span>
              <span className="text-[#EB9999] italic font-serif text-[0.65em] font-normal leading-none">
                &amp;
              </span>
            </div>
            <div className="relative z-20 tracking-tight drop-shadow-2xl">EDGE</div>
          </motion.div>

          {/* Subtitle & Desc */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-40 flex flex-col items-center mt-3 md:mt-5 max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl text-center px-2"
          >
            <p className="text-[10px] sm:text-xs md:text-sm font-extrabold italic tracking-[0.18em] sm:tracking-[0.2em] md:tracking-widest uppercase mb-2 text-[#111111] drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
              UNLEASH MOVEMENT. DEFINE IDENTITY.
            </p>
            <p className="text-[11px] sm:text-xs md:text-sm text-[#111111] leading-relaxed font-semibold drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] max-w-md">
              Sebuah kolaborasi eksklusif yang menghadirkan teknik cutting &amp; coloring modern untuk menciptakan karakter dan keunikan tanpa batas.
            </p>
          </motion.div>
        </div>

        {/* Side Models (Natural Aspect Ratio Locking - Zero Stretching, Smooth Vignette Bottom Mask) */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10 flex justify-between items-end px-0 sm:px-4 md:px-8 max-w-[1600px] mx-auto overflow-hidden h-[85%] sm:h-[90%] md:h-[95%] max-h-[750px]">
          {/* Left Model (Peach Hair) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-[38%] sm:w-[32%] md:w-[27%] lg:w-[24%] xl:w-[22%] h-full max-h-[750px] left-[-8%] sm:left-[-2%] md:left-[1%] lg:left-[4%] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
          >
            <Image 
              src="/images/hero-model-right-clean.png" 
              alt="Model Left" 
              fill 
              sizes="(max-width: 768px) 40vw, 25vw"
              className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]" 
              priority 
            />
          </motion.div>

          {/* Right Model (Silver Hair) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-[38%] sm:w-[32%] md:w-[27%] lg:w-[24%] xl:w-[22%] h-full max-h-[750px] right-[-8%] sm:right-[-2%] md:right-[1%] lg:right-[4%] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
          >
            <Image 
              src="/images/hero-model-left.png" 
              alt="Model Right" 
              fill 
              sizes="(max-width: 768px) 40vw, 25vw"
              className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] opacity-95" 
              priority 
            />
          </motion.div>
        </div>

      </div>

      {/* Bottom Guest Speakers & Black Wave Layer (Integrated Ambient Stage Lighting & Vignette Blending) */}
      <div className="relative z-30 w-full flex flex-col items-center justify-end -mt-12 sm:-mt-16 md:-mt-24 lg:-mt-32">
        
        {/* Black Wave Background */}
        <div className="w-full bg-[#111] relative text-white pt-24 sm:pt-32 md:pt-48 pb-8">
          {/* SVG Wave at the top */}
          <div className="absolute top-[-30px] sm:top-[-45px] md:top-[-95px] left-0 w-full overflow-hidden leading-none z-0">
            <svg className="relative block w-full h-[45px] sm:h-[65px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,60 C200,100 400,0 600,60 C800,120 1000,20 1200,60 L1200,120 L0,120 Z" fill="#111111" />
            </svg>
          </div>

          {/* Ambient Spotlight Glow Behind Duo Speakers */}
          <div className="absolute -top-[120px] sm:-top-[180px] md:-top-[260px] left-1/2 -translate-x-1/2 w-[85%] max-w-[900px] h-[300px] sm:h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(235,153,153,0.3)_0%,rgba(216,107,107,0.1)_45%,transparent_70%)] blur-3xl pointer-events-none z-10" />

          {/* Guest Speakers Image (Seamless Vignette Masking + Deep Shadow Integration) */}
          <div className="absolute -top-[95px] sm:-top-[140px] md:-top-[200px] lg:-top-[240px] left-1/2 -translate-x-1/2 w-[72%] sm:w-[62%] md:w-[580px] lg:w-[720px] xl:w-[800px] h-[260px] sm:h-[350px] md:h-[450px] lg:h-[500px] pointer-events-auto z-20 hover:scale-[1.03] transition-transform duration-700 [mask-image:linear-gradient(to_bottom,black_80%,transparent_98%)]">
            <Image src="/images/speakers-duo.png" alt="Guest Speakers" fill className="object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]" priority />
          </div>

          {/* Speaker Info Layout */}
          <div className="relative z-30 flex justify-between w-full max-w-[1100px] mx-auto px-3 sm:px-6 md:px-12 mb-12 sm:mb-16 md:mb-24 mt-12 md:mt-8">
            {/* Left Speaker Info */}
            <div className="text-left w-[48%] sm:w-[45%] md:w-[40%]">
              <p className="italic text-[#EB9999] font-serif text-[10px] md:text-base mb-1">Guest Speaker</p>
              <p className="font-black text-base sm:text-xl md:text-4xl tracking-tight uppercase leading-tight text-white whitespace-nowrap">TONY TSAI</p>
              <p className="text-[8px] sm:text-[9px] md:text-xs text-gray-400 tracking-[0.2em] uppercase mt-1 sm:mt-2 font-semibold">COLOR EXPERT</p>
            </div>
            
            {/* Right Speaker Info */}
            <div className="text-right w-[48%] sm:w-[45%] md:w-[40%]">
              <p className="italic text-[#EB9999] font-serif text-[10px] md:text-base mb-1">Guest Speaker</p>
              <p className="font-black text-base sm:text-xl md:text-4xl tracking-tight uppercase leading-tight text-white whitespace-nowrap">SHINICHI TAKAHASHI</p>
              <p className="text-[8px] sm:text-[9px] md:text-xs text-gray-400 tracking-[0.2em] uppercase mt-1 sm:mt-2 font-semibold">CUTTING EXPERT</p>
            </div>
          </div>
          
          {/* Seamless SVG Wave Transition to Next Section */}
          <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-10 scale-x-[-1]">
            <svg className="relative block w-full h-[60px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,60 C200,100 400,0 600,60 C800,120 1000,20 1200,60 L1200,120 L0,120 Z" fill="#F9F9FA" />
            </svg>
          </div>
        </div>
      </div>

    </section>
  );
}

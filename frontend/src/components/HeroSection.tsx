"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#F5F5F7] overflow-hidden flex flex-col justify-between font-sans select-none">
      
      {/* Dynamic Background with Animated Glow Blobs and Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#DBA9A9] rounded-full blur-[100px] md:blur-[150px] mix-blend-multiply opacity-50" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#B87C7C] rounded-full blur-[100px] md:blur-[150px] mix-blend-multiply opacity-40" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#F0D5D5] rounded-full blur-[100px] md:blur-[130px] mix-blend-multiply opacity-40" 
        />
        
        {/* Modern Grid overlay with mask */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_30%,#000_40%,transparent_100%)]" />
      </div>

      {/* Top Header (UX Best Practice: Clean Centered Logo on Mobile, Full 3-Column on Desktop) */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-12 pt-2 md:pt-3 pb-2 w-full max-w-[1600px] mx-auto text-xs font-semibold tracking-wider text-black">
        {/* Socials (Desktop Only) */}
        <div className="hidden md:flex items-center gap-3 w-1/3">
          <div className="flex gap-1.5">
            {/* Insta */}
            <div className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center shadow-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </div>
            {/* Tiktok */}
            <div className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center shadow-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.32 6.32 0 006.31 6.32 6.32 6.32 0 006.3-6.32V10.6a8.21 8.21 0 004.3 1.22V8.37a5.44 5.44 0 01-2.32-.49A5.33 5.33 0 0119.59 6.69z"/></svg>
            </div>
            {/* YouTube */}
            <div className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center shadow-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </div>
          </div>
          <span className="font-bold text-xs">@alfabeauty.id</span>
        </div>

        {/* Logo (Centered on Mobile & Desktop) */}
        <div className="w-full md:w-1/3 flex justify-center py-1">
          <Image src="/images/logo-alfa-beauty.png" alt="Alfa Beauty" width={300} height={100} className="h-12 sm:h-14 md:h-20 lg:h-24 w-auto object-contain drop-shadow-sm" priority />
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

        {/* Side Models (768px Tablet: Hair top lowered to be parallel with "EDGE" + Bottom anchored behind black wave) */}
        <div className="absolute inset-x-0 bottom-0 top-[6%] sm:top-[4%] md:top-[24%] lg:top-[3%] xl:top-[4%] pointer-events-none z-10 flex justify-between items-end px-0 sm:px-4 md:px-8 max-w-[1600px] mx-auto overflow-hidden">
          {/* Left Model (Peach Hair) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-[36%] sm:w-[30%] md:w-[26%] lg:w-[23%] xl:w-[22%] h-[96%] sm:h-full md:h-full lg:h-full max-h-[780px] left-[-10%] sm:left-[-3%] md:left-[1%] lg:left-[4%]"
          >
            <Image 
              src="/images/hero-model-right-clean.png" 
              alt="Model Left" 
              fill 
              className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]" 
              priority 
            />
          </motion.div>

          {/* Right Model (Silver Hair) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-[36%] sm:w-[30%] md:w-[26%] lg:w-[23%] xl:w-[22%] h-[96%] sm:h-full md:h-full lg:h-full max-h-[780px] right-[-10%] sm:right-[-3%] md:right-[1%] lg:right-[4%]"
          >
            <Image 
              src="/images/hero-model-left.png" 
              alt="Model Right" 
              fill 
              className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] opacity-95" 
              priority 
            />
          </motion.div>
        </div>

      </div>

      {/* Bottom Guest Speakers & Black Wave Layer (Consistently Clipping Bottom of Hero Canvas Stage) */}
      <div className="relative z-30 w-full flex flex-col items-center justify-end -mt-12 sm:-mt-16 md:-mt-24 lg:-mt-32">
        
        {/* Black Wave Background */}
        <div className="w-full bg-[#111] relative text-white pt-24 sm:pt-32 md:pt-48 pb-8">
          {/* SVG Wave at the top */}
          <div className="absolute top-[-30px] sm:top-[-45px] md:top-[-95px] left-0 w-full overflow-hidden leading-none z-0">
            <svg className="relative block w-full h-[45px] sm:h-[65px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,60 C200,100 400,0 600,60 C800,120 1000,20 1200,60 L1200,120 L0,120 Z" fill="#111111" />
            </svg>
          </div>

          {/* Guest Speakers Image (Elevated Above Black Wave Curve into White Canvas) */}
          <div className="absolute -top-[95px] sm:-top-[140px] md:-top-[200px] lg:-top-[240px] left-1/2 -translate-x-1/2 w-[72%] sm:w-[62%] md:w-[580px] lg:w-[720px] xl:w-[800px] h-[260px] sm:h-[350px] md:h-[450px] lg:h-[500px] pointer-events-auto z-20 hover:scale-105 transition-transform duration-700">
            <Image src="/images/speakers-duo.png" alt="Guest Speakers" fill className="object-contain object-bottom drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)]" priority />
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

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#F5F5F7] overflow-hidden flex flex-col font-sans select-none">
      
      {/* Subtle Background Waves/Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-[#E2E2E2] to-transparent rounded-full blur-[120px] mix-blend-multiply opacity-60" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-bl from-[#E2E2E2] to-transparent rounded-full blur-[120px] mix-blend-multiply opacity-60" />
        
        {/* Super subtle grid overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Top Header */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-12 pt-1 md:pt-2 pb-2 w-full max-w-[1600px] mx-auto text-xs font-semibold tracking-wider text-black">
        {/* Socials */}
        <div className="flex items-center gap-3 w-1/3">
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
          <span className="hidden md:inline font-bold mt-0.5 text-[11px] md:text-xs">@alfabeauty.id</span>
        </div>

        {/* Logo */}
        <div className="w-1/3 flex justify-center">
          <Image src="/images/logo-alfa-beauty.png" alt="Alfa Beauty" width={300} height={100} className="h-14 md:h-20 lg:h-24 w-auto object-contain drop-shadow-sm" priority />
        </div>

        {/* Tagline */}
        <div className="w-1/3 text-right">
          <span className="hidden md:inline-block italic text-gray-500 font-medium text-[10px] md:text-[11px]">
            Inspiration. Collaboration. Elevation.
          </span>
        </div>
      </header>

      {/* Main Content Area (Text) */}
      <div className="relative z-20 flex-1 flex flex-col items-center pt-0 md:pt-1 px-4 w-full max-w-[1400px] mx-auto pointer-events-none">
        
        {/* Pre-title */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] md:text-[12px] font-bold tracking-[0.3em] md:tracking-[0.4em] text-gray-700 uppercase mb-4 text-center"
        >
          COLLABORATION WITH <br className="md:hidden" /> EPOCH ACADEMY & HIKARI SCISSORS
        </motion.p>

        {/* Giant Title */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative text-center leading-[0.85] font-black text-[16vw] md:text-[95px] lg:text-[120px] font-[var(--font-alfa)] text-[#111]"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-30 flex flex-col items-center mt-6 max-w-2xl text-center"
        >
          <p className="text-[10px] md:text-sm font-bold italic tracking-[0.2em] md:tracking-widest uppercase mb-4 text-[#222]">
            UNLEASH MOVEMENT. DEFINE IDENTITY.
          </p>
          <p className="text-[11px] md:text-sm text-gray-600 leading-relaxed font-medium px-4 max-w-lg">
            Sebuah kolaborasi eksklusif yang menghadirkan teknik cutting & coloring modern untuk menciptakan karakter dan keunikan tanpa batas.
          </p>
        </motion.div>
      </div>

      {/* Models Layer (Absolute positioned) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden w-full max-w-[1600px] mx-auto">
        {/* Left Model (Peach Hair) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute left-[-15%] md:left-[-5%] lg:left-[5%] top-[15%] md:top-[12%] lg:top-[10%] w-[60%] md:w-[35%] lg:w-[28%] aspect-[3/4] z-20"
        >
          <Image src="/images/hero-model-right-clean.png" alt="Model Left" fill className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]" priority />
        </motion.div>

        {/* Right Model (Silver Hair) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute right-[-15%] md:right-[-5%] lg:right-[5%] top-[15%] md:top-[12%] lg:top-[10%] w-[60%] md:w-[35%] lg:w-[28%] aspect-[3/4] z-0"
        >
          <Image src="/images/hero-model-left.png" alt="Model Right" fill className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] opacity-95" priority />
        </motion.div>
      </div>

      {/* Bottom Guest Speakers & Black Wave Layer */}
      <div className="relative z-30 mt-auto w-full flex flex-col items-center justify-end">
        
        {/* Black Wave Background */}
        <div className="w-full bg-[#111] relative text-white pt-32 md:pt-48 pb-8 mt-[150px] md:mt-[250px]">
          {/* SVG Wave at the top */}
          <div className="absolute top-[-40px] md:top-[-100px] left-0 w-full overflow-hidden leading-none z-0">
            <svg className="relative block w-full h-[60px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,60 C200,100 400,0 600,60 C800,120 1000,20 1200,60 L1200,120 L0,120 Z" fill="#111111" />
            </svg>
          </div>

          {/* Guest Speakers Image */}
          <div className="absolute bottom-[25%] md:bottom-[20%] left-1/2 -translate-x-1/2 w-[95%] md:w-[700px] lg:w-[800px] h-[350px] md:h-[500px] pointer-events-auto z-20 hover:scale-105 transition-transform duration-700">
            <Image src="/images/speakers-duo.png" alt="Guest Speakers" fill className="object-contain object-bottom drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)]" priority />
          </div>

          {/* Speaker Info Layout */}
          <div className="relative z-30 flex justify-between w-full max-w-[1100px] mx-auto px-6 md:px-12 mb-16 md:mb-24 mt-16 md:mt-8">
            {/* Left Speaker Info */}
            <div className="text-left w-[45%] md:w-[40%]">
              <p className="italic text-[#EB9999] font-serif text-[10px] md:text-base mb-1">Guest Speaker</p>
              <p className="font-black text-xl md:text-4xl tracking-tight uppercase leading-[0.9] text-white">TONY<br/>TSAI</p>
              <p className="text-[9px] md:text-xs text-gray-400 tracking-[0.2em] uppercase mt-2 font-semibold">COLOR EXPERT</p>
            </div>
            
            {/* Right Speaker Info */}
            <div className="text-right w-[45%] md:w-[40%]">
              <p className="italic text-[#EB9999] font-serif text-[10px] md:text-base mb-1">Guest Speaker</p>
              <p className="font-black text-xl md:text-4xl tracking-tight uppercase leading-[0.9] text-white">SHINICHI<br/>TAKAHASHI</p>
              <p className="text-[9px] md:text-xs text-gray-400 tracking-[0.2em] uppercase mt-2 font-semibold">CUTTING EXPERT</p>
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

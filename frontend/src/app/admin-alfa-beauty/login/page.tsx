"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PartnersFooter from "@/components/PartnersFooter";
import { loginAdmin, isAuthed } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect to /admin-alfa-beauty
  useEffect(() => {
    if (isAuthed()) {
      router.replace("/admin-alfa-beauty");
    }
  }, [router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = loginAdmin(username, password);

      if (result.success) {
        router.push("/admin-alfa-beauty");
      } else {
        setError(result.message);
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col font-sans select-none relative overflow-hidden">
      {/* 100% Lightweight CSS Radial Gradient Background & Grid */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 5% 0%, rgba(219, 169, 169, 0.4) 0%, transparent 45%),
            radial-gradient(circle at 95% 15%, rgba(184, 124, 124, 0.3) 0%, transparent 45%),
            radial-gradient(circle at 35% 85%, rgba(240, 213, 213, 0.35) 0%, transparent 50%)
          `
        }}
      >
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_30%,#000_40%,transparent_100%)]" />
      </div>

      {/* Signature Brand Header */}
      <header className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-2 sm:py-3 w-full max-w-[1600px] mx-auto text-xs font-semibold tracking-wider text-black">
        {/* Socials & Contact CTAs (Desktop Only) */}
        <div className="hidden md:flex items-center gap-3 w-1/3">
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/6281511688745"
              target="_blank"
              rel="noopener noreferrer"
              title="Chat WhatsApp Admin"
              className="w-8 h-8 bg-[#25D366] text-white rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@alfabeautycosmetica"
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok @alfabeautycosmetica"
              className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.32 6.32 0 006.31 6.32 6.32 6.32 0 006.3-6.32V10.6a8.21 8.21 0 004.3 1.22V8.37a5.44 5.44 0 01-2.32-.49A5.33 5.33 0 0119.59 6.69z"/></svg>
            </a>

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
          <span className="font-bold text-[11px] md:text-xs">@alfabeauty_id</span>
        </div>

        {/* Logo (Centered on Mobile & Desktop - Large Signature Size) */}
        <div className="w-full md:w-1/3 flex justify-center py-0">
          <Link href="/">
            <Image
              src="/images/logo-alfa-beauty.png"
              alt="Alfa Beauty"
              width={600}
              height={200}
              className="h-20 sm:h-24 md:h-36 lg:h-44 w-auto object-contain drop-shadow-md hover:scale-105 transition-all duration-300"
              priority
            />
          </Link>
        </div>

        {/* Tagline (Desktop Only) */}
        <div className="hidden md:block w-1/3 text-right">
          <span className="italic text-gray-500 font-medium text-[10px] md:text-[11px]">
            Inspiration. Collaboration. Elevation.
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 md:px-8 pt-0 -mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16 pb-12 max-w-6xl w-full mx-auto flex items-center justify-center">
        
        <div className="w-full max-w-md">
          {/* Card Box */}
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 sm:p-10 transition-all">
            
            {/* Header Text */}
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-[#111111] text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-md mb-3">
                SECURE ADMIN PORTAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight">
                LOGIN PORTAL ADMIN
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wider uppercase mt-1.5">
                AIR <span className="text-[#D86B6B]">&amp;</span> EDGE 2026 • ALFA BEAUTY
              </p>
            </div>

            {/* Error Notification Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-600 animate-fadeIn">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <p className="text-xs font-semibold leading-relaxed">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Username Admin <span className="text-[#D86B6B]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username..."
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm font-medium text-[#111111] placeholder-gray-400 focus:bg-white focus:border-[#111111] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Password <span className="text-[#D86B6B]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password..."
                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm font-medium text-[#111111] placeholder-gray-400 focus:bg-white focus:border-[#111111] focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.274 4.057 5.065 7 9.542 7 4.477 0 8.268-2.943 9.542-7-1.274-4.057-5.065-7-9.542-7-4.477 0-8.268 2.943-9.542 7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <span>Masuk Portal Admin →</span>
                )}
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-8 text-center pt-6 border-t border-gray-100">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#111111] transition-colors"
              >
                <span>← Kembali ke Beranda Utama</span>
              </Link>
            </div>

          </div>
        </div>

      </main>

      {/* Official Partners & Brand Footer */}
      <PartnersFooter />
    </div>
  );
}

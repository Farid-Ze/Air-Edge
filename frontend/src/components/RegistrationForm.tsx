"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { registerParticipant } from "@/lib/api";

export default function RegistrationForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await registerParticipant({
        name: formData.name,
        email: formData.email,
        institution: formData.institution || undefined,
      });

      if (response.success) {
        router.push(
          `/success?ticket_id=${response.data.ticket_id}&name=${encodeURIComponent(response.data.name)}`
        );
      }
    } catch (err: unknown) {
      const apiError = err as { status?: number; message?: string; data?: { ticket_id?: string } };
      if (apiError.status === 409 && apiError.data?.ticket_id) {
        router.push(
          `/success?ticket_id=${apiError.data.ticket_id}&name=${encodeURIComponent(formData.name)}&existing=true`
        );
      } else {
        setError(apiError.message || "Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-28 px-3 sm:px-6 bg-[#F9F9FA] overflow-hidden"
      id="registration"
    >
      {/* Simple & Clean Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[#F9F9FA]" />
        {/* Soft bottom glow to transition to footer */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(219,169,169,0.08),transparent_70%)]" />
      </div>

      <div className="relative max-w-xl mx-auto z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-10 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-3 py-1 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4">
            Pass & Registration
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#111111] font-heading tracking-tight">
            DAFTAR SEKARANG
          </h2>
          <p className="text-gray-500 mt-2 sm:mt-4 text-xs sm:text-sm max-w-md mx-auto font-medium px-2">
            Isi formulir di bawah ini untuk mengamankan tiket Anda. QR Code tiket resmi akan langsung dikirimkan ke email Anda.
          </p>
        </div>

        {/* Editorial Form Card Container */}
        <div
          className={`bg-white rounded-2xl p-5 sm:p-12 border border-gray-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {/* Form Step Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span>Pendaftaran Resmi AIR &amp; EDGE</span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-white px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#D86B6B] uppercase tracking-widest rounded-sm">
              FREE ACCESS
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Lengkap */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2"
              >
                Nama Lengkap <span className="text-[#D86B6B]">*</span>
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Masukkan nama lengkap sesuai identitas"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#111111]/10 focus:border-[#111111] outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2"
              >
                Alamat Email <span className="text-[#D86B6B]">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="contoh@email.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#111111]/10 focus:border-[#111111] outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Instansi / Salon */}
            <div>
              <label
                htmlFor="institution"
                className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2"
              >
                Salon / Akademi / Instansi <span className="text-[10px] text-gray-400 font-medium tracking-normal normal-case">(Opsional)</span>
              </label>
              <div className="relative">
                <input
                  id="institution"
                  type="text"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      institution: e.target.value,
                    }))
                  }
                  placeholder="Nama salon, bisnis, atau akademi Anda"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#111111]/10 focus:border-[#111111] outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeWidth="2" d="M12 8v4m0 4h.01" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full inline-flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-[#D86B6B] to-[#B85C5C] hover:from-[#c55a5a] hover:to-[#a74c4c] text-white font-bold text-sm tracking-wide shadow-[0_10px_25px_rgba(216,107,107,0.35)] overflow-hidden transition-all duration-300 active:scale-[0.98] disabled:opacity-60 mt-4"
            >
              {isLoading ? (
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  MENDAFTARKAN...
                </span>
              ) : (
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-[11px]">
                  Dapatkan Tiket Sekarang
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Security & Privacy note */}
          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 text-center mt-6 pt-4 border-t border-gray-100">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="1.5"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="1.5"/>
            </svg>
            <span>Data Anda aman & terenkripsi secara otomatis.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

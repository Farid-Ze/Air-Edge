"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import PartnersFooter from "@/components/PartnersFooter";
import {
  getParticipants,
  type Participant,
  type ParticipantsResponse,
} from "@/lib/api";

export default function AdminDashboard() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [stats, setStats] = useState({
    total_registered: 0,
    total_attended: 0,
    attendance_rate: 0,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: ParticipantsResponse = await getParticipants(
        page,
        search
      );
      setParticipants(response.data.data);
      setStats(response.stats);
      setTotalPages(response.data.last_page);
    } catch {
      setError("Gagal memuat data. Pastikan backend Laravel berjalan.");
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const exportToCSV = () => {
    if (participants.length === 0) return;
    const headers = ["No", "Ticket ID", "Nama", "Email", "Instansi", "Status", "Waktu Hadir"];
    const rows = participants.map((p, idx) => [
      idx + 1,
      `"${p.ticket_id}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.email}"`,
      `"${(p.institution || "—").replace(/"/g, '""')}"`,
      p.is_attended ? "Hadir" : "Belum Hadir",
      `"${p.attended_at || "—"}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AIR_EDGE_Peserta_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col font-sans select-none relative overflow-hidden">
      {/* Subtle Background Lighting & Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-[#E2E2E2] to-transparent rounded-full blur-[140px] opacity-60" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-bl from-[#EB9999]/15 to-transparent rounded-full blur-[140px]" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Signature Brand Header */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 pt-4 pb-4 w-full max-w-[1600px] mx-auto text-xs font-semibold tracking-wider text-black border-b border-gray-200/50">
        {/* Socials */}
        <div className="flex items-center gap-3 w-1/3">
          <div className="flex gap-1.5">
            <div className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center shadow-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </div>
            <div className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center shadow-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.32 6.32 0 006.31 6.32 6.32 6.32 0 006.3-6.32V10.6a8.21 8.21 0 004.3 1.22V8.37a5.44 5.44 0 01-2.32-.49A5.33 5.33 0 0119.59 6.69z"/></svg>
            </div>
            <div className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center shadow-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </div>
          </div>
          <span className="hidden md:inline font-bold text-[11px] md:text-xs">@alfabeauty.id</span>
        </div>

        {/* Logo */}
        <div className="w-1/3 flex justify-center">
          <Link href="/">
            <Image
              src="/images/logo-alfa-beauty.png"
              alt="Alfa Beauty"
              width={240}
              height={80}
              style={{ width: "auto", height: "auto" }}
              className="h-10 md:h-16 w-auto object-contain drop-shadow-sm hover:opacity-90 transition-opacity"
              priority
            />
          </Link>
        </div>

        {/* Tagline */}
        <div className="w-1/3 text-right">
          <span className="hidden md:inline-block italic text-gray-500 font-medium text-[10px] md:text-[11px]">
            Inspiration. Collaboration. Elevation.
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 px-4 md:px-8 py-10 max-w-6xl w-full mx-auto">
        
        {/* Title & Action Buttons Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-block px-3 py-1 bg-[#111111] text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-md mb-2">
              ADMIN DASHBOARD
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-[#111111] uppercase tracking-tight">
              DATA PESERTA &amp; KEHADIRAN
            </h1>
            <p className="text-xs text-gray-500 font-medium tracking-wider uppercase mt-1">
              AIR <span className="text-[#D86B6B]">&amp;</span> EDGE 2026 • MANAJEMEN EVENT
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportToCSV}
              disabled={participants.length === 0}
              className="inline-flex items-center gap-2 px-5 py-3 border border-gray-200/90 bg-white hover:border-[#111111] text-[#111111] text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-2xs disabled:opacity-40 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>

            <Link
              href="/admin/scanner"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#111111] hover:bg-[#D86B6B] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.008v.008H6.75V6.75zM6.75 16.5h.008v.008H6.75V16.5zM16.5 6.75h.008v.008H16.5V6.75zM13.5 13.5h3v3h-3v-3zM16.5 16.5h3v3h-3v-3z" />
              </svg>
              Buka Scanner
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-200 bg-white hover:border-[#111111] text-[#111111] text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              ← Beranda
            </Link>
          </div>
        </div>

        {/* Editorial Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              TOTAL PENDAFTAR
            </p>
            <p className="text-3xl md:text-4xl font-black text-[#111111] mt-2">
              {stats.total_registered}
            </p>
            <p className="text-[11px] text-gray-400 mt-1 font-medium">Peserta terkonfirmasi</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              SUDAH HADIR
            </p>
            <p className="text-3xl md:text-4xl font-black text-emerald-600 mt-2">
              {stats.total_attended}
            </p>
            <p className="text-[11px] text-gray-400 mt-1 font-medium">Sudah scan wristband</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              TINGKAT KEHADIRAN
            </p>
            <p className="text-3xl md:text-4xl font-black text-[#D86B6B] mt-2">
              {stats.attendance_rate}%
            </p>
            {/* Sleek Progress Bar */}
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D86B6B] rounded-full transition-all duration-700"
                style={{ width: `${stats.attendance_rate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Table & Search Container */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden">
          
          {/* Search Bar */}
          <div className="p-4 md:p-6 border-b border-gray-100 bg-[#FAFAFA]">
            <div className="relative max-w-md">
              <svg
                className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama, email, atau instansi..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-medium text-[#111111] placeholder-gray-400 focus:border-[#111111] focus:outline-none transition-colors shadow-2xs"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {error ? (
              <div className="p-12 text-center">
                <p className="text-red-500 text-xs font-semibold">{error}</p>
                <button
                  onClick={fetchData}
                  className="mt-4 px-5 py-2.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#D86B6B] transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            ) : isLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin h-8 w-8 border-2 border-[#111111] border-t-transparent rounded-full mx-auto" />
                <p className="text-gray-400 text-xs mt-3 font-medium">
                  Memuat data peserta...
                </p>
              </div>
            ) : participants.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-400 text-xs font-medium">
                  {search
                    ? "Tidak ada hasil untuk pencarian tersebut."
                    : "Belum ada peserta terdaftar."}
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-gray-100 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                    <th className="px-6 py-4">NO</th>
                    <th className="px-6 py-4">NAMA PESERTA</th>
                    <th className="px-6 py-4">EMAIL</th>
                    <th className="px-6 py-4 hidden md:table-cell">INSTANSI</th>
                    <th className="px-6 py-4 text-center">STATUS</th>
                    <th className="px-6 py-4 hidden lg:table-cell">WAKTU HADIR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-medium text-[#111111]">
                  {participants.map((p, idx) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-400 font-mono">
                        {(page - 1) * 20 + idx + 1}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#111111]">
                        {p.name}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {p.email}
                      </td>
                      <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                        {p.institution || "—"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {p.is_attended ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Hadir
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gray-100 text-gray-500 border border-gray-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                            Belum
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-mono text-[11px] hidden lg:table-cell">
                        {p.attended_at || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 bg-[#FAFAFA] border-t border-gray-100 text-xs">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-200 bg-white rounded-xl text-xs font-bold uppercase tracking-wider text-[#111111] hover:border-[#111111] transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <span className="text-gray-400 font-medium">
                Halaman <strong className="text-[#111111]">{page}</strong> dari <strong className="text-[#111111]">{totalPages}</strong>
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-200 bg-white rounded-xl text-xs font-bold uppercase tracking-wider text-[#111111] hover:border-[#111111] transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          )}
        </div>

      </main>

      {/* Official Partners & Brand Footer */}
      <PartnersFooter />
    </div>
  );
}

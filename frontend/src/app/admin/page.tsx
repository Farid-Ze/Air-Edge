"use client";

import { useEffect, useState, useCallback, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import PartnersFooter from "@/components/PartnersFooter";
import {
  getParticipants,
  createParticipant,
  updateParticipant,
  deleteParticipant,
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

  // CRUD Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [deletingParticipant, setDeletingParticipant] = useState<Participant | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Modal Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    is_attended: false,
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

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
    fetchData();
  }, [fetchData]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Handle Open Create Modal
  const openAddModal = () => {
    setFormData({ name: "", email: "", institution: "", is_attended: false });
    setModalError(null);
    setIsAddOpen(true);
  };

  // Handle Open Edit Modal
  const openEditModal = (p: Participant) => {
    setEditingParticipant(p);
    setFormData({
      name: p.name,
      email: p.email,
      institution: p.institution || "",
      is_attended: p.is_attended,
    });
    setModalError(null);
  };

  // Handle Submit Create
  const handleAddSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setModalError(null);
    setModalLoading(true);

    try {
      await createParticipant(formData);
      setIsAddOpen(false);
      fetchData();
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      setModalError(apiErr.message || "Gagal menambahkan peserta.");
    } finally {
      setModalLoading(false);
    }
  };

  // Handle Submit Update
  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingParticipant) return;
    setModalError(null);
    setModalLoading(true);

    try {
      await updateParticipant(editingParticipant.id, formData);
      setEditingParticipant(null);
      fetchData();
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      setModalError(apiErr.message || "Gagal memperbarui peserta.");
    } finally {
      setModalLoading(false);
    }
  };

  // Handle Confirm Delete
  const handleDeleteConfirm = async () => {
    if (!deletingParticipant) return;
    setModalLoading(true);

    try {
      await deleteParticipant(deletingParticipant.id);
      setDeletingParticipant(null);
      fetchData();
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      alert(apiErr.message || "Gagal menghapus peserta.");
    } finally {
      setModalLoading(false);
    }
  };

  // Quick Toggle Attendance Status directly from table
  const handleToggleAttendance = async (p: Participant) => {
    try {
      await updateParticipant(p.id, {
        is_attended: !p.is_attended,
      });
      fetchData();
    } catch {
      alert("Gagal memperbarui status kehadiran.");
    }
  };

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

      {/* Signature Brand Header (Exact match with main site header) */}
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
          <span className="font-bold text-[11px] md:text-xs">@alfabeauty_id</span>
        </div>

        {/* Logo (Centered on Mobile & Desktop - +100% Size) */}
        <div className="w-full md:w-1/3 flex justify-center py-1">
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
      <main className="relative z-10 flex-1 px-4 md:px-8 py-8 md:py-10 max-w-[1600px] w-full mx-auto">
        
        {/* Title & Action Buttons Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8 pb-6 border-b border-gray-200/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-3 py-1 bg-[#111111] text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-md">
                ADMIN DASHBOARD
              </span>
              <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest hidden sm:inline">
                AIR &amp; EDGE 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] uppercase tracking-tight">
              DATA PESERTA &amp; KEHADIRAN
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium tracking-wider uppercase mt-1">
              SISTEM MANAJEMEN EVENT &amp; REGISTRASI RESMI ALFA BEAUTY
            </p>
          </div>

          {/* Action Buttons: Pure Single-Row Horizontal Alignment across all screens */}
          <div className="flex flex-row items-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-1.5 w-full sm:w-auto shrink-0 no-scrollbar">
            <button
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#111111] hover:bg-black text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>+ Tambah Peserta</span>
            </button>

            <button
              onClick={exportToCSV}
              disabled={participants.length === 0}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-200/90 bg-white hover:border-[#111111] text-[#111111] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-2xs disabled:opacity-40 cursor-pointer whitespace-nowrap shrink-0"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export CSV</span>
            </button>

            <Link
              href="/admin/scanner"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-white border border-gray-200/90 hover:border-[#111111] text-[#111111] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-2xs transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.008v.008H6.75V6.75zM6.75 16.5h.008v.008H6.75V16.5zM16.5 6.75h.008v.008H16.5V6.75zM13.5 13.5h3v3h-3v-3zM16.5 16.5h3v3h-3v-3z" />
              </svg>
              <span>Scanner</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-200 bg-white hover:border-[#111111] text-[#111111] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap shrink-0"
            >
              <span>← Beranda</span>
            </Link>
          </div>
        </div>

        {/* Editorial Stat Cards Grid: 100% Horizontal Row on Mobile (3 Columns) */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-5 mb-8">
          <div className="bg-white rounded-2xl p-3 sm:p-6 border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:tracking-widest">
              TOTAL PENDAFTAR
            </p>
            <p className="text-xl sm:text-3xl md:text-4xl font-black text-[#111111] mt-1 sm:mt-2">
              {stats.total_registered}
            </p>
            <p className="text-[9px] sm:text-[11px] text-gray-400 mt-1 font-medium hidden sm:block">Peserta terkonfirmasi</p>
          </div>

          <div className="bg-white rounded-2xl p-3 sm:p-6 border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:tracking-widest">
              SUDAH HADIR
            </p>
            <p className="text-xl sm:text-3xl md:text-4xl font-black text-emerald-600 mt-1 sm:mt-2">
              {stats.total_attended}
            </p>
            <p className="text-[9px] sm:text-[11px] text-gray-400 mt-1 font-medium hidden sm:block">Sudah scan wristband</p>
          </div>

          <div className="bg-white rounded-2xl p-3 sm:p-6 border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:tracking-widest">
              TINGKAT HADIR
            </p>
            <p className="text-xl sm:text-3xl md:text-4xl font-black text-[#D86B6B] mt-1 sm:mt-2">
              {stats.attendance_rate}%
            </p>
            {/* Sleek Progress Bar */}
            <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
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
                  className="mt-4 px-5 py-2.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#D86B6B] transition-colors cursor-pointer"
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
                    <th className="px-6 py-4 text-right">AKSI</th>
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
                        <div>{p.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono font-normal flex items-center gap-1.5 mt-0.5">
                          <span>ID: {p.ticket_id.slice(0, 8)}...</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {p.email}
                      </td>
                      <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                        {p.institution || "—"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleToggleAttendance(p)}
                          title="Klik untuk ubah status kehadiran"
                          className="cursor-pointer transition-transform active:scale-95 inline-block"
                        >
                          {p.is_attended ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Hadir
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                              Belum
                            </span>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-mono text-[11px] hidden lg:table-cell">
                        {p.attended_at || "—"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Copy Ticket ID Button */}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(p.ticket_id);
                              setCopiedId(p.id);
                              setTimeout(() => setCopiedId(null), 2000);
                            }}
                            title="Salin Kode Tiket (UUID)"
                            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer relative"
                          >
                            {copiedId === p.id ? (
                              <span className="text-emerald-600 font-bold text-[11px]">✓</span>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5" />
                              </svg>
                            )}
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => openEditModal(p)}
                            title="Edit Peserta"
                            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => setDeletingParticipant(p)}
                            title="Hapus Peserta"
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
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

      {/* ============================================ */}
      {/* MODAL: TAMBAH PESERTA */}
      {/* ============================================ */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-2xl p-6 sm:p-8 relative">
            <h3 className="text-xl font-black text-[#111111] uppercase tracking-tight mb-1">
              TAMBAH PESERTA BARU
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Masukkan data peserta baru secara manual ke sistem.
            </p>

            {modalError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
                {modalError}
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama Peserta"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:border-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contoh@email.com"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:border-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  Salon / Instansi (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="Nama Salon / Instansi"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:border-[#111111] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="add_is_attended"
                  checked={formData.is_attended}
                  onChange={(e) => setFormData({ ...formData, is_attended: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#111111] focus:ring-[#111111]"
                />
                <label htmlFor="add_is_attended" className="text-xs font-semibold text-[#111111] cursor-pointer">
                  Tandai Langsung Hadir (Attended)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2.5 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="px-5 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md cursor-pointer disabled:opacity-50"
                >
                  {modalLoading ? "Menyimpan..." : "Simpan Peserta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* MODAL: EDIT PESERTA */}
      {/* ============================================ */}
      {editingParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-2xl p-6 sm:p-8 relative">
            <h3 className="text-xl font-black text-[#111111] uppercase tracking-tight mb-1">
              EDIT DATA PESERTA
            </h3>
            <p className="text-xs text-gray-500 mb-6 font-mono">
              Ticket ID: {editingParticipant.ticket_id}
            </p>

            {modalError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
                {modalError}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:border-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:border-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  Salon / Instansi
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:border-[#111111] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="edit_is_attended"
                  checked={formData.is_attended}
                  onChange={(e) => setFormData({ ...formData, is_attended: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#111111] focus:ring-[#111111]"
                />
                <label htmlFor="edit_is_attended" className="text-xs font-semibold text-[#111111] cursor-pointer">
                  Status Kehadiran: {formData.is_attended ? "Hadir" : "Belum Hadir"}
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingParticipant(null)}
                  className="px-4 py-2.5 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="px-5 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md cursor-pointer disabled:opacity-50"
                >
                  {modalLoading ? "Perbarui..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* MODAL: KONFIRMASI HAPUS PESERTA */}
      {/* ============================================ */}
      {deletingParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-2xl border border-gray-200 shadow-2xl p-6 relative text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            <h3 className="text-lg font-black text-[#111111] uppercase tracking-tight mb-2">
              HAPUS PESERTA?
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Apakah Anda yakin ingin menghapus data peserta <strong className="text-[#111111]">{deletingParticipant.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingParticipant(null)}
                className="w-1/2 py-2.5 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={modalLoading}
                className="w-1/2 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md cursor-pointer disabled:opacity-50"
              >
                {modalLoading ? "Mendukung..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

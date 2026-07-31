"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
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

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              AIR & EDGE — Data Peserta & Kehadiran
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/scanner"
              className="btn-primary text-sm px-5 py-2.5"
            >
              📷 Buka Scanner
            </Link>
            <Link
              href="/"
              className="glass px-4 py-2.5 rounded-xl text-sm text-muted hover:text-foreground transition-colors"
            >
              ← Beranda
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-light rounded-2xl p-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Total Pendaftar
            </p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {stats.total_registered}
            </p>
          </div>
          <div className="glass-light rounded-2xl p-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Sudah Hadir
            </p>
            <p className="text-3xl font-bold text-success mt-2">
              {stats.total_attended}
            </p>
          </div>
          <div className="glass-light rounded-2xl p-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Tingkat Kehadiran
            </p>
            <p className="text-3xl font-bold text-accent mt-2">
              {stats.attendance_rate}%
            </p>
            {/* Progress Bar */}
            <div className="mt-3 h-2 bg-black/5 rounded-full overflow-hidden">
              <div
                className="h-full gradient-accent rounded-full transition-all duration-700"
                style={{ width: `${stats.attendance_rate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Search & Table */}
        <div className="glass-light rounded-2xl overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-black/5">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama, email, atau instansi..."
                className="w-full pl-11 pr-4 py-3 bg-white/80 border border-black/10 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:border-accent/30 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {error ? (
              <div className="p-12 text-center">
                <p className="text-error text-sm">{error}</p>
                <button
                  onClick={fetchData}
                  className="btn-primary text-xs px-4 py-2 mt-4"
                >
                  Coba Lagi
                </button>
              </div>
            ) : isLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full mx-auto" />
                <p className="text-muted-foreground text-sm mt-3">
                  Memuat data...
                </p>
              </div>
            ) : participants.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground text-sm">
                  {search
                    ? "Tidak ada hasil untuk pencarian tersebut."
                    : "Belum ada peserta terdaftar."}
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                      No
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                      Nama
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                      Email
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                      Instansi
                    </th>
                    <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                      Waktu Hadir
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p, idx) => (
                    <tr
                      key={p.id}
                      className="border-b border-black/5 hover:bg-black/3 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {(page - 1) * 20 + idx + 1}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-foreground">
                          {p.name}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {p.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">
                        {p.institution || "—"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {p.is_attended ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                            ✅ Hadir
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                            ⏳ Belum
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground hidden lg:table-cell">
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
            <div className="flex items-center justify-between px-6 py-4 border-t border-black/5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm glass rounded-lg disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:bg-black/10 transition-colors"
              >
                ← Prev
              </button>
              <span className="text-xs text-muted-foreground">
                Halaman {page} dari {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm glass rounded-lg disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:bg-black/10 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PartnersFooter from "@/components/PartnersFooter";
import { scanTicket, formatDateTime, type ScanResponse } from "@/lib/api";
import { isAuthed, logoutAdmin } from "@/lib/auth";

interface ScanResult {
  type: "success" | "error" | "warning";
  message: string;
  data?: ScanResponse["data"];
  timestamp: string;
}

export default function ScannerPage() {
  const router = useRouter();
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<unknown>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualTicketId, setManualTicketId] = useState("");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const lastScannedRef = useRef<string>("");

  // 🔒 Auth Guard: Check if admin is authenticated
  useEffect(() => {
    if (!isAuthed()) {
      router.replace("/admin-alfa-beauty/login");
    }
  }, [router]);

  // Safeguard Node.prototype.removeChild for html5-qrcode DOM manipulation
  useEffect(() => {
    if (typeof window === "undefined") return;
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      if (child.parentNode !== this) {
        if (child.parentNode) {
          return child.parentNode.removeChild(child) as T;
        }
        return child;
      }
      return originalRemoveChild.call(this, child) as T;
    };
    return () => {
      Node.prototype.removeChild = originalRemoveChild;
    };
  }, []);

  const handleScan = useCallback(
    async (decodedText: string) => {
      if (isProcessing || decodedText === lastScannedRef.current) return;
      lastScannedRef.current = decodedText;
      setIsProcessing(true);

      // Play beep sound
      try {
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.frequency.value = 880;
        oscillator.type = "sine";
        gainNode.gain.value = 0.3;
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.15);
      } catch {
        // Audio not available
      }

      const timestamp = formatDateTime(new Date().toISOString());

      try {
        const response = await scanTicket({ ticket_id: decodedText });
        const result: ScanResult = {
          type: "success",
          message: response.message,
          data: response.data,
          timestamp,
        };
        setScanResult(result);
        setScanHistory((prev) => [result, ...prev].slice(0, 10));
      } catch (err: unknown) {
        const apiError = err as {
          status?: number;
          message?: string;
          data?: ScanResponse["data"];
        };
        const result: ScanResult = {
          type: apiError.status === 409 ? "warning" : "error",
          message: apiError.message || "Terjadi kesalahan.",
          data: apiError.data || undefined,
          timestamp,
        };
        setScanResult(result);
        setScanHistory((prev) => [result, ...prev].slice(0, 10));
      } finally {
        setIsProcessing(false);
        setTimeout(() => {
          lastScannedRef.current = "";
        }, 3000);
      }
    },
    [isProcessing]
  );

  const startScanner = useCallback(async () => {
    if (!scannerRef.current) return;

    if (html5QrCodeRef.current) {
      try {
        const prev = html5QrCodeRef.current as { stop: () => Promise<void>; clear: () => void };
        await prev.stop();
        prev.clear();
      } catch {
        // Ignore previous instance cleanup errors
      }
      html5QrCodeRef.current = null;
    }

    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCodeRef.current = html5QrCode;

      const boxSize = typeof window !== "undefined" && window.innerWidth < 640 ? 220 : 250;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
            const minDim = Math.min(viewfinderWidth, viewfinderHeight);
            return { width: Math.min(boxSize, minDim), height: Math.min(boxSize, minDim) };
          },
        },
        (decodedText: string) => {
          handleScan(decodedText);
        },
        () => {
          // QR not found - ignore
        }
      );

      setIsScanning(true);
    } catch (error) {
      console.error("Scanner error:", error);
      setScanResult({
        type: "error",
        message: "Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.",
        timestamp: formatDateTime(new Date().toISOString()),
      });
    }
  }, [handleScan]);

  const stopScanner = useCallback(async () => {
    const scanner = html5QrCodeRef.current as {
      stop: () => Promise<void>;
      clear: () => void;
      isScanning?: boolean;
    } | null;

    if (scanner) {
      try {
        await scanner.stop().catch(() => {});
        scanner.clear();
      } catch {
        // Ignore stop error
      }
      html5QrCodeRef.current = null;
    }

    setIsScanning(false);
  }, []);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col font-sans select-none relative overflow-hidden">
      {/* Background radial gradient */}
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
      <header className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-1.5 sm:py-2.5 w-full max-w-[1600px] mx-auto text-xs font-semibold tracking-wider text-black">
        <div className="hidden md:flex items-center gap-3 w-1/3">
          <div className="flex items-center gap-2">
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

            <a
              href="https://www.tiktok.com/@alfabeautycosmetica"
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok @alfabeautycosmetica"
              className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center shadow-md hover:scale-110 hover:bg-gray-800 transition-all duration-300"
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

        <div className="hidden md:block w-1/3 text-right">
          <span className="italic text-gray-500 font-medium text-[10px] md:text-[11px]">
            Inspiration. Collaboration. Elevation.
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 px-3 sm:px-6 md:px-8 pt-0 -mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16 pb-8 md:pb-10 max-w-3xl w-full mx-auto">
        
        {/* Title & Nav Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-gray-200/60">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block px-2.5 py-0.5 bg-[#111111] text-white text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase rounded-md">
                ATTENDANCE SCANNER
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold uppercase tracking-widest hidden sm:inline">
                AIR &amp; EDGE 2026
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-[#111111] uppercase tracking-tight">
              QR CODE SCANNER
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wider uppercase mt-0.5 sm:mt-1">
              SCAN WRISTBAND PESERTA / MASUKKAN KODE TIKET
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:items-center sm:gap-2.5 w-full sm:w-auto shrink-0">
            <Link
              href="/admin-alfa-beauty"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#111111] hover:bg-black text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md transition-all whitespace-nowrap"
            >
              <span>← Dashboard</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-200 bg-white hover:border-[#111111] text-[#111111] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap"
            >
              <span>Beranda</span>
            </Link>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Logout 🚪</span>
            </button>
          </div>
        </div>

        {/* Scanner Enclosure Card */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.05)] p-6 mb-6">
          <style jsx global>{`
            #qr-reader {
              border: none !important;
              background: #111111 !important;
            }
            #qr-reader video {
              object-fit: cover !important;
              width: 100% !important;
              height: 100% !important;
              max-height: 420px !important;
              border-radius: 1rem !important;
            }
            #qr-reader__scan_region {
              background: transparent !important;
            }
            #qr-reader img[alt="Info icon"],
            #qr-reader__dashboard {
              display: none !important;
            }
          `}</style>
          <div
            ref={scannerRef}
            id="qr-reader"
            className="w-full rounded-2xl overflow-hidden bg-[#111111] min-h-[300px] flex items-center justify-center relative"
          >
            {!isScanning && (
              <div className="text-center p-8 text-white">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0c-.693.047-1.32.443-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  Kamera Belum Aktif
                </p>
                <p className="text-gray-400 text-xs max-w-xs mx-auto">
                  Klik tombol di bawah untuk memulai pemindaian QR Code peserta.
                </p>
              </div>
            )}
          </div>

          {/* Scanner Controls */}
          <div className="mt-4">
            {!isScanning ? (
              <button
                onClick={startScanner}
                className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[#111111] hover:bg-[#D86B6B] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0c-.693.047-1.32.443-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
                Mulai Scan Kamera
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="w-full inline-flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md transition-all cursor-pointer"
              >
                Hentikan Scanner
              </button>
            )}
          </div>
        </div>

        {/* Manual Input Fallback */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-6 mb-6">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#111111] mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
              INPUT MANUAL KODE TIKET (ALTERNATIF ABSENSI)
            </span>
            <span className="text-[10px] font-semibold text-gray-400 normal-case hidden sm:inline">
              Alternatif jika kamera/QR bermasalah
            </span>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (manualTicketId.trim()) {
                handleScan(manualTicketId.trim());
                setManualTicketId("");
              }
            }}
            className="flex gap-2 sm:gap-3"
          >
            <input
              type="text"
              value={manualTicketId}
              onChange={(e) => setManualTicketId(e.target.value)}
              placeholder="Tempel atau ketik ID Tiket (contoh: UUID)..."
              className="flex-1 px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-xl text-xs font-medium text-[#111111] placeholder-gray-400 outline-none focus:border-[#111111] transition-colors"
            />

            <button
              type="button"
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  if (text) setManualTicketId(text.trim());
                } catch {
                  // Clipboard access fallback
                }
              }}
              title="Tempel Kode Tiket dari Clipboard"
              className="px-3.5 py-3 border border-gray-200 bg-[#FAFAFA] hover:border-[#111111] text-[#111111] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5" />
              </svg>
              <span>Tempel</span>
            </button>

            <button
              type="submit"
              disabled={!manualTicketId.trim() || isProcessing}
              className="px-5 sm:px-6 py-3 bg-[#111111] hover:bg-[#D86B6B] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-40 cursor-pointer whitespace-nowrap"
            >
              Check-In
            </button>
          </form>
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="bg-white border border-[#D86B6B]/40 rounded-2xl p-4 mb-6 flex items-center gap-3 animate-pulse shadow-sm">
            <div className="animate-spin h-5 w-5 border-2 border-[#D86B6B] border-t-transparent rounded-full" />
            <p className="text-xs font-bold text-[#D86B6B] uppercase tracking-wider">Memproses ID Tiket...</p>
          </div>
        )}

        {/* Latest Scan Result */}
        {scanResult && !isProcessing && (
          <div
            className={`rounded-2xl p-6 mb-6 border ${
              scanResult.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : scanResult.type === "warning"
                ? "bg-amber-50 border-amber-200 text-amber-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {scanResult.type === "success" ? (
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ) : scanResult.type === "warning" ? (
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                ) : (
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )}
              </div>
              <div className="flex-1">
                <p className="font-extrabold text-sm uppercase tracking-wide">
                  {scanResult.message}
                </p>
                {scanResult.data && (
                  <div className="mt-3 p-4 bg-white/80 rounded-xl border border-black/5 space-y-1 text-xs text-gray-700 font-medium">
                    <p><span className="text-gray-400 font-bold uppercase text-[10px]">Nama:</span> <strong className="text-[#111111]">{scanResult.data.name}</strong></p>
                    <p><span className="text-gray-400 font-bold uppercase text-[10px]">Email:</span> {scanResult.data.email}</p>
                    {scanResult.data.institution && (
                      <p><span className="text-gray-400 font-bold uppercase text-[10px]">Instansi:</span> {scanResult.data.institution}</p>
                    )}
                    <p><span className="text-gray-400 font-bold uppercase text-[10px]">Waktu:</span> {formatDateTime(scanResult.data.attended_at)}</p>
                  </div>
                )}
                <p className="text-[10px] text-gray-400 font-mono mt-2">
                  Timestamp: {scanResult.timestamp}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Scan History */}
        {scanHistory.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-[#FAFAFA]">
              <h3 className="text-xs font-bold text-[#111111] uppercase tracking-widest">
                Riwayat Scan ({scanHistory.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {scanHistory.map((result, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-xs"
                >
                  {result.type === "success" ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  ) : result.type === "warning" ? (
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#111111] truncate">
                      {result.data?.name || result.message}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">
                      {result.message}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap">
                    {result.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Official Partners & Brand Footer */}
      <PartnersFooter />
    </div>
  );
}

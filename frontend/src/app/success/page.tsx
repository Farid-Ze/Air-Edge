"use client";

import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useCallback, Suspense } from "react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticket_id") || "";
  const name = searchParams.get("name") || "Peserta";
  const isExisting = searchParams.get("existing") === "true";
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = useCallback(() => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      const a = document.createElement("a");
      a.download = `ticket-air-edge-${ticketId.slice(0, 8)}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  }, [ticketId]);

  if (!ticketId) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Tiket tidak ditemukan.
          </p>
          <Link href="/" className="btn-primary">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      {/* Background glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] z-0" />

      <div className="relative z-10 max-w-md w-full">
        {/* Success Card */}
        <div className="glass-light rounded-3xl p-8 sm:p-10 text-center animate-scale-in">
          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-accent flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {isExisting ? "Tiket Anda" : "Registrasi Berhasil!"}
          </h1>
          <p className="text-muted-foreground text-sm mb-1">
            Halo, <span className="text-accent font-medium">{name}</span>
          </p>

          {isExisting && (
            <p className="text-xs text-warning bg-warning/10 px-3 py-1.5 rounded-lg inline-block mt-2 mb-4">
              Email sudah terdaftar sebelumnya
            </p>
          )}

          {/* QR Code */}
          <div className="my-8">
            <div
              ref={qrRef}
              className="inline-block p-6 bg-white rounded-2xl shadow-lg"
            >
              <QRCodeSVG
                value={ticketId}
                size={200}
                level="H"
                bgColor="#ffffff"
                fgColor="#1A1A1A"
                includeMargin={false}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 font-mono tracking-wide">
              {ticketId}
            </p>
          </div>

          {/* Instructions */}
          <div className="glass rounded-xl p-4 mb-6 text-left">
            <div className="flex items-start gap-3">
              <span className="text-lg">📱</span>
              <div>
                <p className="text-sm text-foreground font-medium">
                  Tunjukkan QR Code ini
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Saat registrasi ulang di venue untuk proses absensi melalui
                  wristband.
                </p>
              </div>
            </div>
          </div>

          {/* Email Notice */}
          {!isExisting && (
            <div className="glass rounded-xl p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <span className="text-lg">📧</span>
                <div>
                  <p className="text-sm text-foreground font-medium">
                    Email Konfirmasi
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Email konfirmasi beserta QR Code cadangan telah dikirim ke
                    alamat email Anda.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadQR}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 glass hover:bg-black/5 rounded-xl text-sm text-foreground font-medium transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download QR
            </button>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 glass hover:bg-black/5 rounded-xl text-sm text-foreground font-medium transition-all"
            >
              ← Kembali
            </Link>
          </div>
        </div>

        {/* Event Reminder */}
        <div className="glass rounded-2xl p-6 mt-6 text-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
            Sampai jumpa di
          </p>
          <p
            className="text-xl font-bold text-foreground"
            style={{ fontFamily: "'Alfa Slab One', serif" }}
          >
            AIR <span className="text-accent">&</span> EDGE
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            18 — 19 August 2026 • EPISODE, Gading Serpong
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

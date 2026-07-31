"use client";

import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useCallback, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

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
    const img = new window.Image();

    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      const a = document.createElement("a");
      a.download = `AIR_EDGE_Ticket_${ticketId.slice(0, 8)}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  }, [ticketId]);

  if (!ticketId) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-[#F9F9FA] font-sans">
        <div className="text-center bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-md">
          <h2 className="text-xl font-black text-[#111111] mb-2 uppercase">TIKET TIDAK DITEMUKAN</h2>
          <p className="text-gray-500 text-xs mb-6">
            Silakan mendaftar terlebih dahulu untuk mendapatkan pass resmi AIR &amp; EDGE.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#D86B6B] transition-colors rounded-xl"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen h-screen w-full bg-[#F5F5F7] flex items-center justify-center font-sans select-none relative overflow-hidden p-4 md:p-8">

      {/* Subtle Background Lighting & Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-15%] w-[60%] h-[60%] bg-gradient-to-br from-[#E5E5E8] to-transparent rounded-full blur-[140px] opacity-70" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[60%] h-[60%] bg-gradient-to-bl from-[#EB9999]/25 to-transparent rounded-full blur-[140px]" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Standalone Integrated VIP Pass Card (Generous Airy Spacing & Slim Header) */}
      <div className="relative z-10 max-w-4xl w-full bg-white rounded-[2rem] border border-gray-200/90 shadow-[0_24px_70px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row min-h-[500px]">

        {/* Left Main Section: Slim Brand Header, Participant Specs & Action Buttons */}
        <div className="flex-1 p-6 md:p-9 flex flex-col justify-between bg-white relative">

          {/* Slim Compact Brand Top Row (Reduced Height for Maximum Breathing Room Below) */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100/80">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image
                src="/images/logo-alfa-beauty.png"
                alt="Alfa Beauty"
                width={130}
                height={35}
                style={{ width: "auto", height: "auto" }}
                className="h-6 md:h-7 w-auto object-contain"
                priority
              />
            </Link>

            <div className="flex items-center gap-1.5 bg-[#111111] text-white px-3 py-1 rounded-full shadow-2xs">
              <span className="text-[9px] font-extrabold tracking-widest uppercase">
                AIR &amp; EDGE 2026
              </span>
              <span className="text-[9px] font-bold text-[#D86B6B]">
                • VIP PASS
              </span>
            </div>
          </div>

          {/* Participant Hero Details (Expanded Vertical Breathing Room) */}
          <div className="my-auto py-3">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111111] text-white text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isExisting ? "TIKET RESMI TERDAFTAR" : "REGISTRASI BERHASIL"}
              </span>
              <span className="text-[9px] md:text-[10px] font-extrabold text-[#D86B6B] uppercase tracking-wider">
                • ALL ACCESS
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-[#111111] tracking-tight uppercase leading-none my-1">
              {name}
            </h1>

            <p className="text-xs text-gray-400 font-semibold tracking-[0.15em] uppercase mt-2">
              HAIR SHOW &amp; WORKSHOP MASTERCLASS
            </p>
          </div>

          {/* Existing Warning Alert if applicable (Clean SVG Alert Icon) */}
          {isExisting && (
            <div className="my-2 bg-amber-50 border border-amber-200/80 rounded-xl px-4 py-2.5 text-left flex items-center gap-2.5">
              <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-[11px] text-amber-800 font-semibold">
                Email Anda telah terdaftar sebelumnya. Berikut pass QR resmi Anda.
              </p>
            </div>
          )}

          {/* Spec Box: Event Date & Venue (Generous Airy Spacing & Clean Icons) */}
          <div className="my-3 bg-[#FAFAFA] rounded-2xl p-4 border border-gray-200/60 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center shrink-0 shadow-2xs text-[#111111]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider">TANGGAL</p>
                <p className="text-xs font-extrabold text-[#111111]">18 — 19 Aug 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center shrink-0 shadow-2xs text-[#111111]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider">LOKASI</p>
                <p className="text-xs font-extrabold text-[#111111] truncate">Episode Hotel, Serpong</p>
              </div>
            </div>
          </div>

          {/* Action Buttons (Matching Height & Generous Spacing) */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={downloadQR}
              className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-5 bg-[#111111] hover:bg-[#D86B6B] text-white text-xs font-bold tracking-widest uppercase rounded-xl shadow-md transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Pass QR
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center h-12 px-6 border border-gray-200/90 bg-gray-50 hover:bg-gray-100 hover:border-[#111111] text-[#111111] text-xs font-bold tracking-widest uppercase rounded-xl transition-all"
            >
              ← Beranda
            </Link>
          </div>

        </div>

        {/* Vertical / Horizontal Perforated Line */}
        <div className="relative flex md:flex-col items-center justify-between my-0">
          {/* Top / Left Cutout Notch */}
          <div className="w-6 h-6 rounded-full bg-[#F5F5F7] -mt-3 md:mt-0 md:-mt-3 -ml-3 md:ml-0 border border-gray-200/90 z-20" />

          {/* Dashed Line */}
          <div className="flex-1 border-t-2 md:border-t-0 md:border-l-2 border-dashed border-gray-200 w-full md:w-0 h-0 md:h-full my-2 md:my-4" />

          {/* Bottom / Right Cutout Notch */}
          <div className="w-6 h-6 rounded-full bg-[#F5F5F7] -mb-3 md:mb-0 md:-mb-3 -mr-3 md:mr-0 border border-gray-200/90 z-20" />
        </div>

        {/* Right Stub Section: Ticket Stub (QR Code & Scan Info) */}
        <div className="w-full md:w-[320px] lg:w-[350px] bg-[#FAFAFA] p-6 md:p-8 flex flex-col items-center justify-between text-center shrink-0 border-t md:border-t-0 border-gray-100">

          {/* Stub Top Badge */}
          <div className="text-center w-full pb-1">
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
              SCAN AT VENUE
            </span>
          </div>

          {/* QR Code Container */}
          <div
            ref={qrRef}
            className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-md relative group hover:scale-[1.03] transition-transform duration-300 my-auto"
          >
            <QRCodeSVG
              value={ticketId}
              size={175}
              level="H"
              bgColor="#ffffff"
              fgColor="#111111"
              includeMargin={false}
            />
          </div>

          {/* Stub Bottom Info (Vector Phone/Scan Icon) */}
          <div className="w-full pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-full border border-gray-200 shadow-2xs mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-[#111111]">
                {ticketId}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-semibold tracking-wide uppercase">
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
              Tunjukkan QR Code ini saat check-in
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
          <div className="animate-spin h-8 w-8 border-2 border-[#111111] border-t-transparent rounded-full" />
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

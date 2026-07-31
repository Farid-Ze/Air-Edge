"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { scanTicket, type ScanResponse } from "@/lib/api";

interface ScanResult {
  type: "success" | "error" | "warning";
  message: string;
  data?: ScanResponse["data"];
  timestamp: string;
}

export default function ScannerPage() {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<unknown>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const lastScannedRef = useRef<string>("");

  const handleScan = useCallback(
    async (decodedText: string) => {
      // Prevent duplicate scans within 3 seconds
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

      const timestamp = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

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
        // Reset after 3 seconds to allow re-scan
        setTimeout(() => {
          lastScannedRef.current = "";
        }, 3000);
      }
    },
    [isProcessing]
  );

  const startScanner = useCallback(async () => {
    if (!scannerRef.current) return;

    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const scanner = new Html5Qrcode("qr-reader");
      html5QrCodeRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        },
        (decodedText: string) => {
          handleScan(decodedText);
        },
        () => {
          // QR not found — ignore
        }
      );

      setIsScanning(true);
    } catch (error) {
      console.error("Scanner error:", error);
      setScanResult({
        type: "error",
        message:
          "Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.",
        timestamp: new Date().toLocaleTimeString("id-ID"),
      });
    }
  }, [handleScan]);

  const stopScanner = useCallback(async () => {
    const scanner = html5QrCodeRef.current as {
      stop: () => Promise<void>;
      clear: () => void;
    } | null;
    if (scanner) {
      try {
        await scanner.stop();
        scanner.clear();
      } catch {
        // Ignore
      }
    }
    setIsScanning(false);
  }, []);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  const resultStyles = {
    success: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5",
    error: "border-error/30 bg-error/5",
  };

  const resultIcons = {
    success: "✅",
    warning: "⚠️",
    error: "❌",
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">QR Scanner</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Scan QR Code peserta untuk absensi
            </p>
          </div>
          <Link
            href="/admin"
            className="glass px-4 py-2.5 rounded-xl text-sm text-muted hover:text-foreground transition-colors"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Scanner Area */}
        <div className="glass-light rounded-2xl p-6 mb-6">
          <div
            ref={scannerRef}
            id="qr-reader"
            className="w-full rounded-2xl overflow-hidden bg-charcoal min-h-[300px] flex items-center justify-center"
          >
            {!isScanning && (
              <div className="text-center p-8">
                <div className="text-5xl mb-4">📷</div>
                <p className="text-muted-foreground text-sm mb-4">
                  Klik tombol di bawah untuk memulai scanner
                </p>
              </div>
            )}
          </div>

          {/* Scanner Controls */}
          <div className="flex gap-3 mt-4">
            {!isScanning ? (
              <button
                onClick={startScanner}
                className="btn-primary flex-1 py-3"
              >
                📷 Mulai Scan
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="flex-1 py-3 glass rounded-xl text-sm font-medium text-error hover:bg-error/10 transition-colors cursor-pointer"
              >
                ⬛ Hentikan Scanner
              </button>
            )}
          </div>
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="glass-accent rounded-2xl p-4 mb-6 flex items-center gap-3 animate-pulse">
            <div className="animate-spin h-5 w-5 border-2 border-accent border-t-transparent rounded-full" />
            <p className="text-sm text-accent">Memproses QR Code...</p>
          </div>
        )}

        {/* Latest Scan Result */}
        {scanResult && !isProcessing && (
          <div
            className={`rounded-2xl p-6 mb-6 border ${
              resultStyles[scanResult.type]
            } animate-scale-in`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">
                {resultIcons[scanResult.type]}
              </span>
              <div className="flex-1">
                <p className="text-foreground font-medium">
                  {scanResult.message}
                </p>
                {scanResult.data && (
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-muted">
                      <span className="text-muted-foreground">Nama:</span>{" "}
                      <span className="text-foreground font-medium">
                        {scanResult.data.name}
                      </span>
                    </p>
                    <p className="text-sm text-muted">
                      <span className="text-muted-foreground">Email:</span>{" "}
                      {scanResult.data.email}
                    </p>
                    {scanResult.data.institution && (
                      <p className="text-sm text-muted">
                        <span className="text-muted-foreground">
                          Instansi:
                        </span>{" "}
                        {scanResult.data.institution}
                      </p>
                    )}
                    <p className="text-sm text-muted">
                      <span className="text-muted-foreground">Waktu:</span>{" "}
                      {scanResult.data.attended_at}
                    </p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Scan: {scanResult.timestamp}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Scan History */}
        {scanHistory.length > 0 && (
          <div className="glass-light rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h3 className="text-sm font-medium text-foreground">
                Riwayat Scan ({scanHistory.length})
              </h3>
            </div>
            <div className="divide-y divide-black/5 max-h-[400px] overflow-y-auto">
              {scanHistory.map((result, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 flex items-center gap-3 hover:bg-black/3 transition-colors"
                >
                  <span className="text-sm">
                    {resultIcons[result.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      {result.data?.name || result.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {result.message}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {result.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

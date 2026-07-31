<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    /**
     * POST /api/scan
     * 
     * Scan QR Code untuk absensi.
     * - Menerima ticket_id (UUID) dari QR Code yang di-scan
     * - Mencari peserta berdasarkan ticket_id
     * - Jika valid dan belum hadir: update is_attended + catat timestamp
     * - Jika sudah hadir: kembalikan pesan sudah check-in
     * - Jika tidak ditemukan: kembalikan error 404
     */
    public function scan(Request $request): JsonResponse
    {
        // Validasi input
        $validated = $request->validate([
            'ticket_id' => 'required|uuid',
        ]);

        // Cari peserta berdasarkan ticket_id
        $participant = Participant::where('ticket_id', $validated['ticket_id'])->first();

        // Jika ticket_id tidak ditemukan
        if (!$participant) {
            return response()->json([
                'success' => false,
                'message' => 'QR Code tidak valid. Tiket tidak ditemukan.',
            ], 404);
        }

        // Jika peserta sudah check-in sebelumnya
        if ($participant->is_attended) {
            return response()->json([
                'success' => false,
                'message' => 'Peserta sudah melakukan check-in sebelumnya.',
                'data' => [
                    'name' => $participant->name,
                    'email' => $participant->email,
                    'institution' => $participant->institution,
                    'attended_at' => $participant->attended_at->format('d M Y, H:i'),
                ],
            ], 409);
        }

        // Tandai sebagai hadir
        $participant->markAsAttended();

        return response()->json([
            'success' => true,
            'message' => 'Check-in berhasil!',
            'data' => [
                'name' => $participant->name,
                'email' => $participant->email,
                'institution' => $participant->institution,
                'attended_at' => $participant->attended_at->format('d M Y, H:i'),
            ],
        ]);
    }
}

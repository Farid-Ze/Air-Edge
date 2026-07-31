<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\SendTicketEmail;
use App\Models\Participant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RegistrationController extends Controller
{
    /**
     * GET /api/participants
     * 
     * Menampilkan daftar semua peserta (untuk Admin Dashboard).
     * Mendukung pencarian berdasarkan nama/email dan pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Participant::query();

        // Pencarian berdasarkan nama atau email
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('institution', 'like', "%{$search}%");
            });
        }

        // Statistik kehadiran
        $totalRegistered = Participant::count();
        $totalAttended = Participant::attended()->count();

        // Ambil data dengan pagination
        $participants = $query->orderBy('created_at', 'desc')
                             ->paginate($request->input('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $participants,
            'stats' => [
                'total_registered' => $totalRegistered,
                'total_attended' => $totalAttended,
                'attendance_rate' => $totalRegistered > 0
                    ? round(($totalAttended / $totalRegistered) * 100, 1)
                    : 0,
            ],
        ]);
    }

    /**
     * POST /api/register
     * 
     * Mendaftarkan peserta baru.
     * - Validasi input (nama, email, instansi)
     * - Generate UUID unik sebagai ticket_id
     * - Simpan ke database
     * - Dispatch job untuk mengirim email konfirmasi
     * - Return data peserta + ticket_id
     */
    public function register(Request $request): JsonResponse
    {
        // Validasi input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'institution' => 'nullable|string|max:255',
        ]);

        // Cek apakah email sudah terdaftar
        $existing = Participant::where('email', $validated['email'])->first();
        if ($existing) {
            return response()->json([
                'success' => false,
                'message' => 'Email sudah terdaftar. Silakan gunakan email lain.',
                'data' => [
                    'ticket_id' => $existing->ticket_id,
                    'name' => $existing->name,
                ],
            ], 409);
        }

        // Buat peserta baru (UUID auto-generated di model)
        $participant = Participant::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'institution' => $validated['institution'] ?? null,
        ]);

        // Dispatch background job untuk kirim email konfirmasi
        SendTicketEmail::dispatch($participant);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil! Cek email Anda untuk konfirmasi.',
            'data' => [
                'id' => $participant->id,
                'ticket_id' => $participant->ticket_id,
                'name' => $participant->name,
                'email' => $participant->email,
                'institution' => $participant->institution,
            ],
        ], 201);
    }
}

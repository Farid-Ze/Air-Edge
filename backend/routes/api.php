<?php

use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\RegistrationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — AIR & EDGE Event System
|--------------------------------------------------------------------------
|
| Endpoint utama:
| POST /api/register      — Registrasi peserta baru
| GET  /api/participants   — Daftar semua peserta (admin)
| POST /api/scan           — Scan QR Code untuk absensi
|
*/

// Registrasi peserta
Route::post('/register', [RegistrationController::class, 'register']);

// Daftar peserta (admin)
Route::get('/participants', [RegistrationController::class, 'index']);

// Scan QR Code (absensi)
Route::post('/scan', [AttendanceController::class, 'scan']);

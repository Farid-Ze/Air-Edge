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

// Registrasi peserta (Public)
Route::post('/register', [RegistrationController::class, 'register']);

// Participant CRUD & Admin Management
Route::get('/participants', [RegistrationController::class, 'index']);
Route::post('/participants', [RegistrationController::class, 'store']);
Route::get('/participants/{id}', [RegistrationController::class, 'show']);
Route::put('/participants/{id}', [RegistrationController::class, 'update']);
Route::delete('/participants/{id}', [RegistrationController::class, 'destroy']);

// Scan QR Code (absensi)
Route::post('/scan', [AttendanceController::class, 'scan']);

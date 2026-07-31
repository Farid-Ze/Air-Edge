<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Table: participants
     * Menyimpan data peserta yang mendaftar untuk acara AIR & EDGE.
     * Setiap peserta mendapat UUID unik (ticket_id) yang akan di-encode
     * menjadi QR Code untuk absensi via wristband.
     */
    public function up(): void
    {
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            $table->uuid('ticket_id')->unique()->comment('UUID unik untuk QR Code tiket');
            $table->string('name', 255)->comment('Nama lengkap peserta');
            $table->string('email', 255)->comment('Alamat email peserta');
            $table->string('institution', 255)->nullable()->comment('Instansi atau asal peserta');
            $table->boolean('is_attended')->default(false)->comment('Status kehadiran');
            $table->timestamp('attended_at')->nullable()->comment('Waktu check-in saat scan QR');
            $table->timestamps();

            // Index untuk pencarian cepat saat scan
            $table->index('ticket_id');
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};

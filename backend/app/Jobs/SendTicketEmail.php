<?php

namespace App\Jobs;

use App\Mail\TicketConfirmation;
use App\Models\Participant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendTicketEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Jumlah percobaan maksimum jika gagal.
     */
    public int $tries = 3;

    /**
     * Waktu tunggu antar retry (detik).
     */
    public array $backoff = [10, 30, 60];

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Participant $participant
    ) {}

    /**
     * Execute the job.
     * 
     * Mengirim email konfirmasi tiket dengan QR Code ke peserta.
     */
    public function handle(): void
    {
        Mail::to($this->participant->email)
            ->send(new TicketConfirmation($this->participant));

        Log::info('Ticket confirmation email sent', [
            'participant_id' => $this->participant->id,
            'email' => $this->participant->email,
            'ticket_id' => $this->participant->ticket_id,
        ]);
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('Failed to send ticket confirmation email', [
            'participant_id' => $this->participant->id,
            'email' => $this->participant->email,
            'error' => $exception->getMessage(),
        ]);
    }
}

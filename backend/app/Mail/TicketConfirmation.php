<?php

namespace App\Mail;

use App\Models\Participant;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class TicketConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public Participant $participant
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Konfirmasi Tiket — AIR & EDGE Hair Show & Workshop',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        // Generate QR Code sebagai base64 SVG untuk ditampilkan di email
        $qrCodeSvg = QrCode::format('svg')
            ->size(250)
            ->margin(1)
            ->generate($this->participant->ticket_id);

        $qrCodeBase64 = base64_encode($qrCodeSvg);

        return new Content(
            view: 'emails.ticket-confirmation',
            with: [
                'participant' => $this->participant,
                'qrCodeBase64' => $qrCodeBase64,
                'eventDetails' => [
                    'name' => 'AIR & EDGE',
                    'hairShow' => [
                        'date' => '18 August 2026',
                        'time' => '16:00 - 21:30',
                    ],
                    'workshop' => [
                        'date' => '19 August 2026',
                        'time' => '09:00 - 18:00',
                    ],
                    'venue' => 'EPISODE — Gading Serpong',
                    'address' => 'Jl. Gading Serpong Boulevard Barat Blok S No. 6-7, Pakulonan Barat, Banten 15810',
                    'contact' => '+62 815 1168 8745',
                ],
            ],
        );
    }
}

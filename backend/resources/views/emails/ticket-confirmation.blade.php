<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Konfirmasi Tiket — AIR & EDGE</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f0eb; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f0eb; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
                    
                    {{-- Header --}}
                    <tr>
                        <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 40px 30px; text-align: center;">
                            <h1 style="margin: 0; font-size: 36px; font-weight: 900; color: #ffffff; letter-spacing: 4px;">
                                AIR <span style="color: #DBA9A9;">&</span> EDGE
                            </h1>
                            <p style="margin: 8px 0 0; font-size: 14px; color: #cccccc; letter-spacing: 2px; text-transform: uppercase;">
                                Hair Show & Workshop
                            </p>
                        </td>
                    </tr>

                    {{-- Greeting --}}
                    <tr>
                        <td style="padding: 32px 40px 16px;">
                            <h2 style="margin: 0; font-size: 22px; color: #1a1a1a;">
                                Halo, {{ $participant->name }}! 👋
                            </h2>
                            <p style="margin: 12px 0 0; font-size: 15px; color: #555555; line-height: 1.6;">
                                Terima kasih telah mendaftar untuk acara <strong>AIR & EDGE</strong>. 
                                Tiket Anda telah dikonfirmasi. Berikut adalah QR Code tiket Anda:
                            </p>
                        </td>
                    </tr>

                    {{-- QR Code --}}
                    <tr>
                        <td style="padding: 16px 40px; text-align: center;">
                            <div style="display: inline-block; padding: 20px; background-color: #ffffff; border: 2px solid #e8e0d8; border-radius: 12px;">
                                <img src="data:image/svg+xml;base64,{{ $qrCodeBase64 }}" 
                                     alt="QR Code Tiket" 
                                     width="200" height="200"
                                     style="display: block;">
                            </div>
                            <p style="margin: 12px 0 0; font-size: 12px; color: #999999; font-family: monospace;">
                                Ticket ID: {{ $participant->ticket_id }}
                            </p>
                        </td>
                    </tr>

                    {{-- Instruksi --}}
                    <tr>
                        <td style="padding: 16px 40px;">
                            <div style="background-color: #faf7f4; border-left: 4px solid #DBA9A9; padding: 16px 20px; border-radius: 0 8px 8px 0;">
                                <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.6;">
                                    📱 <strong>Tunjukkan QR Code ini</strong> saat registrasi ulang di venue untuk proses absensi.
                                    QR Code juga tersedia di halaman konfirmasi website.
                                </p>
                            </div>
                        </td>
                    </tr>

                    {{-- Event Details --}}
                    <tr>
                        <td style="padding: 24px 40px;">
                            <h3 style="margin: 0 0 16px; font-size: 16px; color: #1a1a1a; text-transform: uppercase; letter-spacing: 1px;">
                                📋 Detail Acara
                            </h3>
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="50%" style="padding: 12px; background-color: #faf7f4; border-radius: 8px; vertical-align: top;">
                                        <strong style="font-size: 14px; color: #1a1a1a;">🎭 HAIR SHOW</strong><br>
                                        <span style="font-size: 13px; color: #666;">📅 {{ $eventDetails['hairShow']['date'] }}</span><br>
                                        <span style="font-size: 13px; color: #666;">⏰ {{ $eventDetails['hairShow']['time'] }}</span>
                                    </td>
                                    <td width="8"></td>
                                    <td width="50%" style="padding: 12px; background-color: #faf7f4; border-radius: 8px; vertical-align: top;">
                                        <strong style="font-size: 14px; color: #1a1a1a;">✂️ WORKSHOP</strong><br>
                                        <span style="font-size: 13px; color: #666;">📅 {{ $eventDetails['workshop']['date'] }}</span><br>
                                        <span style="font-size: 13px; color: #666;">⏰ {{ $eventDetails['workshop']['time'] }}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Venue --}}
                    <tr>
                        <td style="padding: 0 40px 24px;">
                            <div style="padding: 16px; background-color: #1a1a1a; border-radius: 8px; color: #ffffff;">
                                <strong style="font-size: 14px;">📍 {{ $eventDetails['venue'] }}</strong><br>
                                <span style="font-size: 12px; color: #cccccc;">{{ $eventDetails['address'] }}</span>
                            </div>
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="background-color: #faf7f4; padding: 24px 40px; text-align: center; border-top: 1px solid #e8e0d8;">
                            <p style="margin: 0; font-size: 13px; color: #999999;">
                                Untuk informasi lebih lanjut, hubungi: 
                                <strong style="color: #555555;">{{ $eventDetails['contact'] }}</strong>
                            </p>
                            <p style="margin: 12px 0 0; font-size: 11px; color: #cccccc;">
                                Collaboration with Epoch Academy & Hikari Scissors
                            </p>
                            <p style="margin: 8px 0 0; font-size: 11px; color: #cccccc;">
                                © 2026 AIR & EDGE. All Rights Reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>

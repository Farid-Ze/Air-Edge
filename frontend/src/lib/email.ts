import nodemailer from "nodemailer";
import QRCode from "qrcode";

interface SendTicketEmailParams {
  toEmail: string;
  participantName: string;
  ticketId: string;
  institution?: string | null;
}

/**
 * Creates nodemailer SMTP Transport instance using environment variables.
 */
function getSmtpTransporter() {
  const host = process.env.SMTP_HOST || process.env.MAIL_HOST || "";
  const port = parseInt(process.env.SMTP_PORT || process.env.MAIL_PORT || "587", 10);
  const secure = (process.env.SMTP_SECURE || "false").toLowerCase() === "true" || port === 465;
  const user = process.env.SMTP_USER || process.env.SMTP_USERNAME || process.env.MAIL_USERNAME || "";
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.MAIL_PASSWORD || "";

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    // Optional TLS settings for self-signed or custom SMTP servers
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });
}

/**
 * Generates responsive luxury HTML Email Template for AIR & EDGE 2026 Ticket
 */
export function generateTicketEmailHtml({
  participantName,
  ticketId,
  institution,
  siteUrl,
  qrCid = "qrcode_ticket",
}: SendTicketEmailParams & { siteUrl: string; qrCid?: string }): string {
  const ticketPassUrl = `${siteUrl}/success?ticket_id=${encodeURIComponent(ticketId)}&name=${encodeURIComponent(participantName)}`;
  
  // Use inline CID attachment if available, or fallback to reliable QR API
  const qrSrc = qrCid ? `cid:${qrCid}` : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(ticketId)}`;

  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tiket Resmi AIR & EDGE 2026</title>
</head>
<body style="margin:0; padding:0; background-color:#F5F5F7; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#111111;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#F5F5F7; padding:20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#FFFFFF; border-radius:16px; overflow:hidden; border:1px solid #E5E7EB; box-shadow:0 10px 25px rgba(0,0,0,0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color:#111111; padding:32px 24px; text-align:center;">
              <h1 style="margin:0; font-size:26px; font-weight:900; letter-spacing:-0.5px; color:#FFFFFF; text-transform:uppercase;">
                AIR <span style="color:#D86B6B;">&amp;</span> EDGE 2026
              </h1>
              <p style="margin:6px 0 0 0; font-size:11px; font-weight:700; letter-spacing:2px; color:#EB9999; text-transform:uppercase;">
                Official E-Ticket Pass
              </p>
            </td>
          </tr>

          <!-- Welcome & Confirmation -->
          <tr>
            <td style="padding:32px 28px 20px 28px; text-align:center;">
              <p style="margin:0 0 8px 0; font-size:12px; font-weight:700; color:#D86B6B; letter-spacing:1px; text-transform:uppercase;">
                Registrasi Berhasil
              </p>
              <h2 style="margin:0 0 12px 0; font-size:22px; font-weight:800; color:#111111;">
                Halo, ${escapeHtml(participantName)}!
              </h2>
              <p style="margin:0; font-size:14px; line-height:1.6; color:#4B5563;">
                Terima kasih telah mendaftar di <strong>AIR &amp; EDGE 2026</strong>. Tiket pass resmi Anda telah terbit dan siap digunakan saat check-in di venue acara.
              </p>
            </td>
          </tr>

          <!-- Ticket Card Box -->
          <tr>
            <td style="padding:0 28px 24px 28px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#F9FAFB; border:1px border-solid #E5E7EB; border-radius:12px; padding:20px;">
                <tr>
                  <td align="center">
                    <!-- QR Code (Embedded Inline Image) -->
                    <img src="${qrSrc}" alt="QR Code Ticket" width="180" height="180" style="display:block; width:180px; height:180px; border-radius:8px; border:4px solid #FFFFFF; box-shadow:0 4px 12px rgba(0,0,0,0.08); margin-bottom:16px;" />
                    
                    <p style="margin:0 0 4px 0; font-size:10px; font-weight:700; color:#6B7280; letter-spacing:1px; text-transform:uppercase;">
                      TICKET ID
                    </p>
                    <p style="margin:0 0 16px 0; font-family:monospace; font-size:13px; font-weight:700; color:#111111; background-color:#E5E7EB; padding:6px 12px; border-radius:6px; display:inline-block; letter-spacing:0.5px;">
                      ${escapeHtml(ticketId)}
                    </p>

                    <!-- Details Table -->
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="6" style="border-top:1px solid #E5E7EB; margin-top:12px; text-align:left; font-size:13px;">
                      <tr>
                        <td style="color:#6B7280; font-weight:600; width:35%;">Nama Peserta:</td>
                        <td style="color:#111111; font-weight:700;">${escapeHtml(participantName)}</td>
                      </tr>
                      ${institution ? `
                      <tr>
                        <td style="color:#6B7280; font-weight:600;">Instansi / Salon:</td>
                        <td style="color:#111111; font-weight:600;">${escapeHtml(institution)}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="color:#6B7280; font-weight:600;">Tanggal Event:</td>
                        <td style="color:#111111; font-weight:600;">18 &amp; 19 Agustus 2026</td>
                      </tr>
                      <tr>
                        <td style="color:#6B7280; font-weight:600;">Lokasi Venue:</td>
                        <td style="color:#D86B6B; font-weight:700;">Episode Hotel Gading Serpong</td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:0 28px 32px 28px; text-align:center;">
              <a href="${ticketPassUrl}" target="_blank" style="display:inline-block; background-color:#111111; color:#FFFFFF; font-size:13px; font-weight:800; text-decoration:none; padding:14px 28px; border-radius:10px; text-transform:uppercase; letter-spacing:1px; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
                Tampilkan E-Pass Resmi
              </a>
            </td>
          </tr>

          <!-- Event Schedule Summary -->
          <tr>
            <td style="background-color:#F9FAFB; padding:24px 28px; border-top:1px solid #E5E7EB;">
              <h3 style="margin:0 0 12px 0; font-size:14px; font-weight:800; color:#111111; text-transform:uppercase; letter-spacing:0.5px;">
                Rangkaian Acara:
              </h3>
              <p style="margin:0 0 8px 0; font-size:12px; color:#374151; line-height:1.5;">
                <strong>Day 1 — Hair Show:</strong> 18 Agustus 2026 (16:00 — 21:30 WIB) @ Episode Hotel
              </p>
              <p style="margin:0; font-size:12px; color:#374151; line-height:1.5;">
                <strong>Day 2 — Workshop Masterclass:</strong> 19 Agustus 2026 (09:00 — 18:00 WIB) @ Episode Hotel
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#111111; padding:24px; text-align:center; color:#9CA3AF; font-size:11px;">
              <p style="margin:0 0 6px 0; font-weight:700; color:#FFFFFF; text-transform:uppercase; letter-spacing:1px;">
                Alfa Beauty × Epoch Academy × Hikari Scissors
              </p>
              <p style="margin:0 0 12px 0;">
                Tunjukkan QR Code ini di meja registrasi saat kedatangan.
              </p>
              <p style="margin:0; color:#6B7280;">
                &copy; 2026 AIR &amp; EDGE. All Rights Reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sends official ticket email to participant with embedded QR Code image attachment.
 */
export async function sendTicketEmail(params: SendTicketEmailParams): Promise<{ success: boolean; message: string }> {
  const transporter = getSmtpTransporter();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const fromAddress =
    process.env.SMTP_FROM_ADDRESS ||
    process.env.MAIL_FROM_ADDRESS ||
    `"AIR & EDGE 2026" <noreply@alfabeauty.id>`;

  // Generate QR Code PNG Buffer for Inline Attachment
  let qrBuffer: Buffer | null = null;
  try {
    qrBuffer = await QRCode.toBuffer(params.ticketId, {
      width: 400,
      margin: 2,
      color: {
        dark: "#111111",
        light: "#FFFFFF",
      },
    });
  } catch (qrErr) {
    console.error("[QR Code Generation Error]", qrErr);
  }

  const qrCid = qrBuffer ? "qrcode_ticket" : undefined;
  const htmlContent = generateTicketEmailHtml({
    ...params,
    siteUrl,
    qrCid,
  });

  if (!transporter) {
    console.log("[SMTP Email Service - Development Mode]");
    console.log(`To: ${params.toEmail}`);
    console.log(`Subject: Tiket Resmi AIR & EDGE 2026 - ${params.participantName}`);
    console.log(`Ticket ID: ${params.ticketId}`);
    console.log("Note: SMTP credentials not set in env variables. Email simulated in logs.");
    return {
      success: true,
      message: "SMTP belum dikonfigurasi di .env, email disimulasikan di log server.",
    };
  }

  try {
    const attachments: any[] = [];
    if (qrBuffer) {
      attachments.push({
        filename: "qrcode.png",
        content: qrBuffer,
        cid: "qrcode_ticket", // Inline CID attachment
      });
    }

    const info = await transporter.sendMail({
      from: fromAddress,
      to: params.toEmail,
      subject: `Tiket Resmi AIR & EDGE 2026 — ${params.participantName}`,
      html: htmlContent,
      attachments,
    });

    console.log(`[SMTP Email Success] Sent to ${params.toEmail}, Message ID: ${info.messageId}`);
    return {
      success: true,
      message: `Email tiket berhasil dikirim ke ${params.toEmail}`,
    };
  } catch (error: any) {
    console.error("[SMTP Email Error]", error);
    return {
      success: false,
      message: error?.message || "Gagal mengirim email via SMTP.",
    };
  }
}

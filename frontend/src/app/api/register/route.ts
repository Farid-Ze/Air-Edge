import { NextResponse } from "next/server";
import { supabaseAdminFetch } from "@/lib/supabase";
import { sendTicketEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, institution } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Nama dan email wajib diisi." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanName = String(name).trim();
    const cleanInstitution = institution ? String(institution).trim() : null;

    // 1. Check existing email in Supabase
    const { data: existing } = await supabaseAdminFetch<any[]>(
      `/participants?email=eq.${encodeURIComponent(cleanEmail)}&select=*`
    );

    if (existing && existing.length > 0) {
      const participant = existing[0];
      return NextResponse.json(
        {
          success: false,
          message: "Email ini sudah terdaftar sebelumnya.",
          data: {
            id: participant.id,
            ticket_id: participant.ticket_id,
            name: participant.name,
            email: participant.email,
            institution: participant.institution,
          },
        },
        { status: 409 }
      );
    }

    // 2. Insert new participant into Supabase
    const newTicketId = crypto.randomUUID();
    const { data: inserted, error } = await supabaseAdminFetch<any[]>("/participants", {
      method: "POST",
      body: JSON.stringify({
        ticket_id: newTicketId,
        name: cleanName,
        email: cleanEmail,
        institution: cleanInstitution,
        is_attended: false,
        attended_at: null,
      }),
    });

    if (error || !inserted || inserted.length === 0) {
      return NextResponse.json(
        { success: false, message: error?.message || "Gagal menyimpan data peserta." },
        { status: 500 }
      );
    }

    const created = inserted[0];

    // 3. Send Ticket Pass Email via SMTP
    sendTicketEmail({
      toEmail: created.email,
      participantName: created.name,
      ticketId: created.ticket_id,
      institution: created.institution,
    }).catch((emailErr) => {
      console.error("Async ticket email error:", emailErr);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil! Tiket Anda telah diterbitkan dan dikirimkan ke email.",
        data: {
          id: created.id,
          ticket_id: created.ticket_id,
          name: created.name,
          email: created.email,
          institution: created.institution,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

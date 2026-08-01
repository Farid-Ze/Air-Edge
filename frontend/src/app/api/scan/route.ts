import { NextResponse } from "next/server";
import { supabaseFetch } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticket_id } = body;

    if (!ticket_id) {
      return NextResponse.json(
        { success: false, message: "Kode tiket (UUID) wajib diisi." },
        { status: 400 }
      );
    }

    const cleanTicketId = String(ticket_id).trim();

    // 1. Find participant by ticket_id in Supabase
    const { data: participants } = await supabaseFetch<any[]>(
      `/participants?ticket_id=eq.${encodeURIComponent(cleanTicketId)}&select=*`
    );

    if (!participants || participants.length === 0) {
      return NextResponse.json(
        { success: false, message: "Tiket tidak ditemukan atau tidak valid." },
        { status: 404 }
      );
    }

    const participant = participants[0];

    // 2. Check if already attended
    if (participant.is_attended) {
      const formattedTime = participant.attended_at
        ? new Date(participant.attended_at).toLocaleString("id-ID")
        : "Waktu tidak tercatat";

      return NextResponse.json(
        {
          success: false,
          message: `Peserta atas nama ${participant.name} SUDAH pernah melakukan check-in sebelumnya pada ${formattedTime}.`,
          data: {
            name: participant.name,
            email: participant.email,
            institution: participant.institution,
            attended_at: participant.attended_at,
          },
        },
        { status: 400 }
      );
    }

    // 3. Mark attendance
    const now = new Date().toISOString();
    const { data: updated, error } = await supabaseFetch<any[]>(
      `/participants?id=eq.${participant.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          is_attended: true,
          attended_at: now,
        }),
      }
    );

    if (error || !updated || updated.length === 0) {
      return NextResponse.json(
        { success: false, message: "Gagal memperbarui status kehadiran." },
        { status: 500 }
      );
    }

    const result = updated[0];
    return NextResponse.json(
      {
        success: true,
        message: `Check-in BERHASIL! Selamat datang, ${result.name}.`,
        data: {
          name: result.name,
          email: result.email,
          institution: result.institution,
          attended_at: result.attended_at,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { sendTicketEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, ticket_id, institution } = body;

    if (!email || !name || !ticket_id) {
      return NextResponse.json(
        { success: false, message: "Field 'email', 'name', dan 'ticket_id' wajib diisi." },
        { status: 400 }
      );
    }

    const result = await sendTicketEmail({
      toEmail: String(email).trim().toLowerCase(),
      participantName: String(name).trim(),
      ticketId: String(ticket_id).trim(),
      institution: institution ? String(institution).trim() : null,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: result.message }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Gagal mengirim email tiket." },
      { status: 500 }
    );
  }
}

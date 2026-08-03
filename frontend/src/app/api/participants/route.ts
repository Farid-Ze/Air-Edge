import { NextResponse } from "next/server";
import { supabaseAdminFetch } from "@/lib/supabase";
import crypto from "crypto";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 15;
    const offset = (page - 1) * limit;

    // 1. Fetch participants with filter
    let query = `/participants?select=*&order=id.desc`;
    if (search) {
      const q = encodeURIComponent(`%${search.trim()}%`);
      query += `&or=(name.ilike.${q},email.ilike.${q},institution.ilike.${q})`;
    }

    const { data: allData, error } = await supabaseAdminFetch<any[]>(query, {
      headers: { Prefer: "count=exact" },
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message || "Gagal mengambil data peserta." },
        { status: 500 }
      );
    }

    const total = allData ? allData.length : 0;
    const paginatedData = allData ? allData.slice(offset, offset + limit) : [];

    // 2. Fetch stats
    const { data: totalRegistered } = await supabaseAdminFetch<any[]>("/participants?select=id");
    const { data: totalAttended } = await supabaseAdminFetch<any[]>("/participants?is_attended=eq.true&select=id");

    const totalRegCount = totalRegistered ? totalRegistered.length : 0;
    const totalAttCount = totalAttended ? totalAttended.length : 0;
    const attendanceRate = totalRegCount > 0 ? Math.round((totalAttCount / totalRegCount) * 100) : 0;

    return NextResponse.json({
      success: true,
      data: {
        data: paginatedData,
        current_page: page,
        last_page: Math.ceil(total / limit) || 1,
        total: total,
      },
      stats: {
        total_registered: totalRegCount,
        total_attended: totalAttCount,
        attendance_rate: attendanceRate,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, institution, is_attended } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Nama dan email wajib diisi." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanName = String(name).trim();
    const cleanInstitution = institution ? String(institution).trim() : null;

    // Check existing email
    const { data: existing } = await supabaseAdminFetch<any[]>(
      `/participants?email=eq.${encodeURIComponent(cleanEmail)}&select=*`
    );

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email ini sudah terdaftar sebelumnya." },
        { status: 409 }
      );
    }

    const newTicketId = crypto.randomUUID();
    const attended = Boolean(is_attended);
    const now = attended ? new Date().toISOString() : null;

    const { data: inserted, error } = await supabaseAdminFetch<any[]>("/participants", {
      method: "POST",
      body: JSON.stringify({
        ticket_id: newTicketId,
        name: cleanName,
        email: cleanEmail,
        institution: cleanInstitution,
        is_attended: attended,
        attended_at: now,
      }),
    });

    if (error || !inserted || inserted.length === 0) {
      return NextResponse.json(
        { success: false, message: error?.message || "Gagal membuat peserta." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Peserta berhasil ditambahkan.",
        data: inserted[0],
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

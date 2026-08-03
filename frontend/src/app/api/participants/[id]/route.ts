import { NextResponse } from "next/server";
import { supabaseAdminFetch } from "@/lib/supabase";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, institution, is_attended } = body;

    // 1. Fetch existing participant
    const { data: existing } = await supabaseAdminFetch<any[]>(
      `/participants?id=eq.${id}&select=*`
    );

    if (!existing || existing.length === 0) {
      return NextResponse.json(
        { success: false, message: "Peserta tidak ditemukan." },
        { status: 404 }
      );
    }

    const current = existing[0];
    const updateData: any = {};

    if (name !== undefined) updateData.name = String(name).trim();
    if (email !== undefined) updateData.email = String(email).trim().toLowerCase();
    if (institution !== undefined) updateData.institution = institution ? String(institution).trim() : null;

    if (is_attended !== undefined) {
      const newAttended = Boolean(is_attended);
      updateData.is_attended = newAttended;
      if (newAttended && !current.is_attended) {
        updateData.attended_at = new Date().toISOString();
      } else if (!newAttended) {
        updateData.attended_at = null;
      }
    }

    updateData.updated_at = new Date().toISOString();

    const { data: updated, error } = await supabaseAdminFetch<any[]>(
      `/participants?id=eq.${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updateData),
      }
    );

    if (error || !updated || updated.length === 0) {
      return NextResponse.json(
        { success: false, message: error?.message || "Gagal memperbarui data peserta." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data peserta berhasil diperbarui.",
      data: updated[0],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdminFetch<any[]>(`/participants?id=eq.${id}`, {
      method: "DELETE",
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message || "Gagal menghapus peserta." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Peserta berhasil dihapus.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

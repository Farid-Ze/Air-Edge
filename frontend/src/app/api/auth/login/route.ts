import { NextResponse } from "next/server";
import { signJwtToken } from "@/lib/jwt";
import { getAdminCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const creds = getAdminCredentials();

    if (username === creds.username && password === creds.pass) {
      const token = await signJwtToken({ username });

      const response = NextResponse.json({ success: true, message: "Login berhasil!" });
      
      response.cookies.set({
        name: "air_edge_admin_session",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8, // 8 hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Username atau password yang Anda masukkan salah." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan sistem." },
      { status: 500 }
    );
  }
}

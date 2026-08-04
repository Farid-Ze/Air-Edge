import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define protected paths
  const isApiRoute = pathname.startsWith("/api/participants");
  const isAdminUiRoute = pathname.startsWith("/admin-alfa-beauty") && !pathname.includes("/login");

  if (isApiRoute || isAdminUiRoute) {
    const token = request.cookies.get("air_edge_admin_session")?.value;
    
    if (!token) {
      if (isApiRoute) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin-alfa-beauty/login", request.url));
    }

    try {
      const secret = process.env.JWT_SECRET_KEY || "air-and-edge-super-secret-fallback-2026";
      await jwtVerify(token, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch (error) {
      if (isApiRoute) {
        return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin-alfa-beauty/login", request.url));
    }
  }
  
  return NextResponse.next();
}

// Ensure the middleware runs only for relevant paths
export const config = {
  matcher: [
    "/api/participants/:path*",
    "/admin-alfa-beauty/:path*",
  ],
};

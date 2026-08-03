/**
 * Admin Authentication Helper for AIR & EDGE 2026
 */

export interface AdminCredentials {
  username: string;
  pass: string;
}

/**
 * Gets configured admin credentials from environment or defaults (Used only Server-Side)
 */
export function getAdminCredentials(): AdminCredentials {
  return {
    username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin",
    pass: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "alfabeauty2026",
  };
}

/**
 * Checks if admin is currently authenticated in client session
 * (Relies on a non-HttpOnly flag cookie if we want synchronous client check, 
 * but for true security we should rely on server-side checks. For now, we fetch a check route 
 * or let middleware handle the redirect. For client-side UI state, we can use a basic flag).
 */
export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  // This is a naive client-side check just for UI rendering. 
  // The REAL security is in the middleware which checks the HttpOnly cookie.
  return document.cookie.includes("admin_logged_in=1");
}

/**
 * Authenticates admin credentials via API
 */
export async function loginAdmin(usernameInput: string, passwordInput: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameInput, password: passwordInput }),
    });
    
    const data = await res.json();
    
    if (data.success) {
      // Set a dummy cookie for client-side UI checks (not used for security)
      document.cookie = "admin_logged_in=1; path=/; max-age=" + 60 * 60 * 8; // 8 hours
    }
    
    return data;
  } catch (error) {
    return { success: false, message: "Terjadi kesalahan jaringan." };
  }
}

/**
 * Logs out admin and clears session via API
 */
export async function logoutAdmin(): Promise<void> {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
    document.cookie = "admin_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/admin-alfa-beauty/login";
  } catch (error) {
    console.error("Logout failed", error);
  }
}

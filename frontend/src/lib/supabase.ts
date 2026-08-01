/**
 * Supabase Client Config — AIR & EDGE Event System
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rxuczvpcwrenxxllugrw.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4dWN6dnBjd3Jlbnh4bGx1Z3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MzEyNDYsImV4cCI6MjEwMTEwNzI0Nn0.yVptvNkVdpXeohdzoJEp-dP-yOiP-gBQoYul_zkYdlM";

/**
 * Direct REST fetch wrapper for Supabase PostgreSQL tables
 */
export async function supabaseFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: any; count?: number }> {
  const url = `${SUPABASE_URL}/rest/v1${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
        ...options.headers,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errText = await response.text();
      try {
        const errJson = JSON.parse(errText);
        return { data: null, error: errJson };
      } catch {
        return { data: null, error: { message: errText || `Error ${response.status}` } };
      }
    }

    const contentRange = response.headers.get("content-range");
    let count: number | undefined;
    if (contentRange) {
      const parts = contentRange.split("/");
      if (parts[1] && parts[1] !== "*") {
        count = parseInt(parts[1], 10);
      }
    }

    const data = await response.json();
    return { data, error: null, count };
  } catch (err: any) {
    return { data: null, error: { message: err.message || "Network error" } };
  }
}

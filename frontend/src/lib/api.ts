/**
 * API Client — AIR & EDGE Event System
 *
 * Helper functions untuk komunikasi dengan Laravel Backend API.
 * Base URL dikonfigurasi via environment variable.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Generic fetch wrapper dengan error handling.
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      message: data.message || "Terjadi kesalahan. Silakan coba lagi.",
      data: data.data || null,
    };
  }

  return data;
}

// ============================================
// Types
// ============================================

export interface Participant {
  id: number;
  ticket_id: string;
  name: string;
  email: string;
  institution: string | null;
  is_attended: boolean;
  attended_at: string | null;
  created_at: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  institution?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    ticket_id: string;
    name: string;
    email: string;
    institution: string | null;
  };
}

export interface ScanPayload {
  ticket_id: string;
}

export interface ScanResponse {
  success: boolean;
  message: string;
  data?: {
    name: string;
    email: string;
    institution: string | null;
    attended_at: string;
  };
}

export interface ParticipantsResponse {
  success: boolean;
  data: {
    data: Participant[];
    current_page: number;
    last_page: number;
    total: number;
  };
  stats: {
    total_registered: number;
    total_attended: number;
    attendance_rate: number;
  };
}

// ============================================
// API Functions
// ============================================

/**
 * POST /api/register — Registrasi peserta baru.
 */
export async function registerParticipant(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/scan — Scan QR Code untuk absensi.
 */
export async function scanTicket(
  payload: ScanPayload
): Promise<ScanResponse> {
  return apiFetch<ScanResponse>("/scan", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * GET /api/participants — Ambil daftar peserta (admin).
 */
export async function getParticipants(
  page: number = 1,
  search: string = ""
): Promise<ParticipantsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    ...(search && { search }),
  });

  return apiFetch<ParticipantsResponse>(`/participants?${params}`);
}

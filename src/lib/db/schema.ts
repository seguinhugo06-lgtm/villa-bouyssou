// ── Reservation ──────────────────────────────────────────────────────────────

export type ReservationStatus = "pending" | "confirmed" | "cancelled";
export type PaymentStatus = "pending" | "partial" | "paid";
export type DepositStatus = "pending" | "authorized" | "released";

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string; // ISO date string YYYY-MM-DD
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  depositStatus: DepositStatus;
  notes: string;
  createdAt: string; // ISO datetime string
}

// ── Blocked dates ────────────────────────────────────────────────────────────

export type BlockedReason = "maintenance" | "personal" | "other";

export interface BlockedDate {
  id: string;
  date: string; // YYYY-MM-DD
  reason: BlockedReason;
}

// ── Seasons / Pricing ────────────────────────────────────────────────────────

export interface Season {
  id: string;
  name: string;
  startDate: string; // MM-DD  (month-day, recurs yearly)
  endDate: string;   // MM-DD
  nightlyRate: number;
  weeklyRate: number;
  monthlyRate: number;
}

// ── Reviews ──────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  author: string;
  country: string;
  rating: number;
  date: string;
  text: string;
  approved: boolean;
}

import { NextRequest, NextResponse } from "next/server";
import { readReservations, readBlockedDates, addBlockedDate, removeBlockedDate } from "@/lib/storage";
import { mergeAvailabilityFromFeeds } from "@/lib/ical";
import { calculatePrice } from "@/lib/pricing";
import type { BlockedReason } from "@/lib/db/schema";

// iCal feed URLs for external platforms (set in env vars)
const ICAL_FEEDS = [
  process.env.AIRBNB_ICAL_URL,
  process.env.ABRITEL_ICAL_URL,
].filter(Boolean) as string[];

/**
 * GET /api/availability?month=2026-07
 * Returns unavailable dates for the given month (or current + next 3 months).
 * Optionally: ?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD for pricing.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // ── Price calculation mode ───────────────────────────────────────────────
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");
  const guestsParam = searchParams.get("guests");

  if (checkInParam && checkOutParam) {
    const checkIn = new Date(checkInParam);
    const checkOut = new Date(checkOutParam);
    const guests = guestsParam ? parseInt(guestsParam, 10) : 1;

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
    }

    const priceBreakdown = calculatePrice(checkIn, checkOut, guests);
    return NextResponse.json({ price: priceBreakdown });
  }

  // ── Availability mode ────────────────────────────────────────────────────
  try {
    // 1. Get our own reservations
    const reservations = await readReservations();
    const reservationDates = new Set<string>();
    for (const r of reservations) {
      if (r.status === "cancelled") continue;
      const start = new Date(r.checkIn);
      const end = new Date(r.checkOut);
      const current = new Date(start);
      while (current < end) {
        reservationDates.add(current.toISOString().slice(0, 10));
        current.setDate(current.getDate() + 1);
      }
    }

    // 2. Get blocked dates
    const blockedDates = await readBlockedDates();
    const blockedSet = new Set(blockedDates.map((b) => b.date));

    // 3. Get external iCal feeds
    let externalDates: string[] = [];
    if (ICAL_FEEDS.length > 0) {
      try {
        externalDates = await mergeAvailabilityFromFeeds(ICAL_FEEDS);
      } catch (err) {
        console.error("Failed to fetch iCal feeds:", err);
      }
    }

    // Merge all unavailable dates
    const unavailable = new Set([
      ...reservationDates,
      ...blockedSet,
      ...externalDates,
    ]);

    return NextResponse.json({
      unavailableDates: Array.from(unavailable).sort(),
    });
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/availability
 * Block or unblock a date. Body: { date, reason, action: "block" | "unblock" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, reason, action } = body as {
      date: string;
      reason?: BlockedReason;
      action: "block" | "unblock";
    };

    if (!date || !action) {
      return NextResponse.json(
        { error: "Missing required fields: date, action" },
        { status: 400 }
      );
    }

    if (action === "block") {
      await addBlockedDate({
        id: `blocked-${date}`,
        date,
        reason: reason || "other",
      });
      return NextResponse.json({ success: true, message: `${date} blocked` });
    }

    if (action === "unblock") {
      await removeBlockedDate(date);
      return NextResponse.json({ success: true, message: `${date} unblocked` });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Block/unblock error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

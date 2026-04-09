import { NextRequest, NextResponse } from "next/server";
import { readReservations, addReservation, readBlockedDates } from "@/lib/storage";
import { calculatePrice, validateStay } from "@/lib/pricing";
import { sendEmail, guestConfirmationEmail, ownerNotificationEmail } from "@/lib/email";
import type { Reservation } from "@/lib/db/schema";

/**
 * GET /api/reservations
 * List all reservations (for admin use).
 */
export async function GET() {
  try {
    const reservations = await readReservations();
    return NextResponse.json({ reservations });
  } catch (error) {
    console.error("Read reservations error:", error);
    return NextResponse.json(
      { error: "Failed to read reservations" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reservations
 * Create a new reservation.
 * Body: { guestName, guestEmail, guestPhone, checkIn, checkOut, guests, notes? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guestName, guestEmail, guestPhone, checkIn, checkOut, guests, notes } =
      body as {
        guestName: string;
        guestEmail: string;
        guestPhone: string;
        checkIn: string;
        checkOut: string;
        guests: number;
        notes?: string;
      };

    // ── Validate required fields ─────────────────────────────────────────
    if (!guestName || !guestEmail || !checkIn || !checkOut || !guests) {
      return NextResponse.json(
        { error: "Missing required fields: guestName, guestEmail, checkIn, checkOut, guests" },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
    }

    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: "Check-out must be after check-in" },
        { status: 400 }
      );
    }

    if (checkInDate < new Date()) {
      return NextResponse.json(
        { error: "Check-in date must be in the future" },
        { status: 400 }
      );
    }

    if (guests < 1 || guests > 9) {
      return NextResponse.json(
        { error: "Guests must be between 1 and 9" },
        { status: 400 }
      );
    }

    // ── Validate minimum stay ────────────────────────────────────────────
    const stayError = validateStay(checkInDate, checkOutDate);
    if (stayError) {
      return NextResponse.json({ error: stayError }, { status: 400 });
    }

    // ── Check date availability ──────────────────────────────────────────
    const existingReservations = await readReservations();
    const blockedDates = await readBlockedDates();
    const blockedSet = new Set(blockedDates.map((b) => b.date));

    // Build set of dates for the requested stay
    const requestedDates: string[] = [];
    const current = new Date(checkInDate);
    while (current < checkOutDate) {
      requestedDates.push(current.toISOString().slice(0, 10));
      current.setDate(current.getDate() + 1);
    }

    // Check against blocked dates
    for (const d of requestedDates) {
      if (blockedSet.has(d)) {
        return NextResponse.json(
          { error: `Date ${d} is not available` },
          { status: 409 }
        );
      }
    }

    // Check against existing reservations
    for (const existing of existingReservations) {
      if (existing.status === "cancelled") continue;
      const exStart = new Date(existing.checkIn);
      const exEnd = new Date(existing.checkOut);
      for (const d of requestedDates) {
        const dd = new Date(d);
        if (dd >= exStart && dd < exEnd) {
          return NextResponse.json(
            { error: `Date ${d} is already booked` },
            { status: 409 }
          );
        }
      }
    }

    // ── Calculate price ──────────────────────────────────────────────────
    const priceBreakdown = calculatePrice(checkInDate, checkOutDate, guests);

    // ── Create reservation ───────────────────────────────────────────────
    const reservation: Reservation = {
      id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      guestName,
      guestEmail,
      guestPhone: guestPhone || "",
      checkIn,
      checkOut,
      guests,
      totalPrice: priceBreakdown.totalPrice,
      status: "pending",
      paymentStatus: "pending",
      depositStatus: "pending",
      notes: notes || "",
      createdAt: new Date().toISOString(),
    };

    await addReservation(reservation);

    // ── Send emails ──────────────────────────────────────────────────────
    const guestEmail_ = guestConfirmationEmail(reservation);
    await sendEmail({
      to: reservation.guestEmail,
      subject: guestEmail_.subject,
      html: guestEmail_.html,
    });

    const ownerEmail = ownerNotificationEmail(reservation);
    await sendEmail({
      to: "lavillabouyssou@gmail.com",
      subject: ownerEmail.subject,
      html: ownerEmail.html,
    });

    return NextResponse.json({
      success: true,
      reservation: {
        id: reservation.id,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        guests: reservation.guests,
        totalPrice: reservation.totalPrice,
        status: reservation.status,
      },
      priceBreakdown,
    });
  } catch (error) {
    console.error("Create reservation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

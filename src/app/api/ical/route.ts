import { NextResponse } from "next/server";
import { readReservations } from "@/lib/storage";
import { generateICalFeed } from "@/lib/ical";

/**
 * GET /api/ical
 * Serves an iCal feed of our reservations for external platforms (Airbnb, Abritel)
 * to consume and block those dates on their side.
 */
export async function GET() {
  try {
    const reservations = await readReservations();
    const ical = generateICalFeed(reservations);

    return new NextResponse(ical, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": "attachment; filename=villa-bouyssou.ics",
        "Cache-Control": "public, max-age=900", // 15 min cache
      },
    });
  } catch (error) {
    console.error("iCal generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate iCal feed" },
      { status: 500 }
    );
  }
}

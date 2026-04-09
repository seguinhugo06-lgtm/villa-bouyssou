import type { Reservation } from "./db/schema";

// ── iCal parsing ─────────────────────────────────────────────────────────────

export interface ICalEvent {
  uid: string;
  summary: string;
  dtStart: string; // YYYY-MM-DD
  dtEnd: string;   // YYYY-MM-DD
}

/**
 * Parse raw iCal text and extract booked date ranges.
 */
export function parseICalData(icalText: string): ICalEvent[] {
  const events: ICalEvent[] = [];
  const blocks = icalText.split("BEGIN:VEVENT");

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].split("END:VEVENT")[0];

    const uid = extractField(block, "UID") ?? `event-${i}`;
    const summary = extractField(block, "SUMMARY") ?? "Blocked";
    const dtStart = extractDateField(block, "DTSTART");
    const dtEnd = extractDateField(block, "DTEND");

    if (dtStart && dtEnd) {
      events.push({ uid, summary, dtStart, dtEnd });
    }
  }

  return events;
}

function extractField(block: string, field: string): string | null {
  // Handles both "FIELD:value" and "FIELD;PARAMS:value"
  const regex = new RegExp(`^${field}[;:](.*)$`, "m");
  const match = block.match(regex);
  if (!match) return null;
  // If the value contains parameters (e.g. VALUE=DATE:20260101), take after last colon
  const raw = match[1].trim();
  const colonIndex = raw.lastIndexOf(":");
  return colonIndex > -1 ? raw.substring(colonIndex + 1) : raw;
}

function extractDateField(block: string, field: string): string | null {
  const raw = extractField(block, field);
  if (!raw) return null;
  // Convert 20260101 or 20260101T120000Z to YYYY-MM-DD
  const cleaned = raw.replace(/[^0-9]/g, "").slice(0, 8);
  if (cleaned.length !== 8) return null;
  return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
}

/**
 * Fetch and parse an iCal feed from a URL.
 */
export async function parseICalFeed(url: string): Promise<ICalEvent[]> {
  const response = await fetch(url, {
    next: { revalidate: 900 }, // cache 15 min
  });

  if (!response.ok) {
    console.error(`Failed to fetch iCal feed: ${url} (${response.status})`);
    return [];
  }

  const text = await response.text();
  return parseICalData(text);
}

// ── iCal generation ──────────────────────────────────────────────────────────

function formatICalDate(dateStr: string): string {
  return dateStr.replace(/-/g, "");
}

/**
 * Generate an iCal feed string from our reservations.
 */
export function generateICalFeed(reservations: Reservation[]): string {
  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d+Z$/, "Z");

  const events = reservations
    .filter((r) => r.status !== "cancelled")
    .map(
      (r) => `BEGIN:VEVENT
DTSTART;VALUE=DATE:${formatICalDate(r.checkIn)}
DTEND;VALUE=DATE:${formatICalDate(r.checkOut)}
SUMMARY:${r.guestName} - Villa Bouyssou
UID:${r.id}@villabouyssou.com
DTSTAMP:${now}
STATUS:CONFIRMED
END:VEVENT`
    )
    .join("\n");

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Villa Bouyssou//Booking System//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Villa Bouyssou Reservations
${events}
END:VCALENDAR`;
}

// ── Merge availability from multiple sources ─────────────────────────────────

/**
 * Given events from multiple iCal feeds, return a sorted list of booked date
 * strings (YYYY-MM-DD). Dates from check-in up to (but not including)
 * check-out are considered booked.
 */
export function getBookedDatesFromEvents(events: ICalEvent[]): string[] {
  const booked = new Set<string>();

  for (const event of events) {
    const start = new Date(event.dtStart);
    const end = new Date(event.dtEnd);

    const current = new Date(start);
    while (current < end) {
      booked.add(current.toISOString().slice(0, 10));
      current.setDate(current.getDate() + 1);
    }
  }

  return Array.from(booked).sort();
}

/**
 * Merge booked dates from multiple iCal feed URLs.
 */
export async function mergeAvailabilityFromFeeds(
  urls: string[]
): Promise<string[]> {
  const allEvents: ICalEvent[] = [];

  const results = await Promise.allSettled(urls.map((u) => parseICalFeed(u)));
  for (const result of results) {
    if (result.status === "fulfilled") {
      allEvents.push(...result.value);
    }
  }

  return getBookedDatesFromEvents(allEvents);
}

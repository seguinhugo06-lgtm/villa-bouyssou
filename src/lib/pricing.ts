import type { Season } from "./db/schema";

// ── Season definitions ───────────────────────────────────────────────────────
// Ordered from most specific to least specific so the first match wins.

export const SEASONS: Season[] = [
  {
    id: "christmas",
    name: "Noel",
    startDate: "12-23",
    endDate: "01-01",
    nightlyRate: 390,
    weeklyRate: 2690,
    monthlyRate: 8608,
  },
  {
    id: "high",
    name: "Haute saison",
    startDate: "07-01",
    endDate: "08-31",
    nightlyRate: 505,
    weeklyRate: 3510,
    monthlyRate: 14040,
  },
  {
    id: "mid-spring",
    name: "Moyenne saison (printemps)",
    startDate: "05-01",
    endDate: "06-30",
    nightlyRate: 405,
    weeklyRate: 2810,
    monthlyRate: 10116,
  },
  {
    id: "mid-autumn",
    name: "Moyenne saison (automne)",
    startDate: "09-01",
    endDate: "09-30",
    nightlyRate: 405,
    weeklyRate: 2810,
    monthlyRate: 10116,
  },
  {
    id: "default",
    name: "Basse saison",
    startDate: "01-01",
    endDate: "12-31",
    nightlyRate: 380,
    weeklyRate: 2535,
    monthlyRate: 8544,
  },
];

// ── Cleaning fee ─────────────────────────────────────────────────────────────

const CLEANING_FEE = 150; // euros

// ── Minimum stay rules ───────────────────────────────────────────────────────

export function getMinimumStay(checkIn: Date): { nights: number; saturdayOnly: boolean } {
  const month = checkIn.getMonth(); // 0-indexed
  if (month === 6 || month === 7) {
    // July or August: 7 nights, Saturday to Saturday
    return { nights: 7, saturdayOnly: true };
  }
  return { nights: 3, saturdayOnly: false };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Parse a "MM-DD" string into month (0-indexed) and day numbers. */
function parseMonthDay(md: string): { month: number; day: number } {
  const [m, d] = md.split("-").map(Number);
  return { month: m - 1, day: d };
}

/** Check whether a date falls within a season range (handles year wrap for Christmas). */
function isDateInSeason(date: Date, season: Season): boolean {
  const start = parseMonthDay(season.startDate);
  const end = parseMonthDay(season.endDate);

  const m = date.getMonth();
  const d = date.getDate();

  // Year-wrapping range (e.g. Dec 23 -> Jan 1)
  if (
    start.month > end.month ||
    (start.month === end.month && start.day > end.day)
  ) {
    return (
      (m > start.month || (m === start.month && d >= start.day)) ||
      (m < end.month || (m === end.month && d <= end.day))
    );
  }

  return (
    (m > start.month || (m === start.month && d >= start.day)) &&
    (m < end.month || (m === end.month && d <= end.day))
  );
}

/** Get the season that applies for a given date. */
export function getSeasonForDate(date: Date): Season {
  for (const season of SEASONS) {
    if (season.id === "default") continue; // check default last
    if (isDateInSeason(date, season)) return season;
  }
  return SEASONS[SEASONS.length - 1]; // default
}

// ── Price calculation ────────────────────────────────────────────────────────

export interface PriceBreakdown {
  nights: number;
  nightlyRates: { date: string; rate: number; season: string }[];
  subtotal: number;
  cleaningFee: number;
  totalPrice: number;
  averageNightlyRate: number;
}

/**
 * Calculate the total price for a stay.
 * Each night is priced according to the season of its check-in date.
 */
export function calculatePrice(
  checkIn: Date,
  checkOut: Date,
  _guests: number = 1
): PriceBreakdown {
  const nights = Math.round(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (nights <= 0) {
    return {
      nights: 0,
      nightlyRates: [],
      subtotal: 0,
      cleaningFee: 0,
      totalPrice: 0,
      averageNightlyRate: 0,
    };
  }

  const nightlyRates: PriceBreakdown["nightlyRates"] = [];
  let subtotal = 0;

  for (let i = 0; i < nights; i++) {
    const d = new Date(checkIn);
    d.setDate(d.getDate() + i);
    const season = getSeasonForDate(d);
    nightlyRates.push({
      date: d.toISOString().slice(0, 10),
      rate: season.nightlyRate,
      season: season.name,
    });
    subtotal += season.nightlyRate;
  }

  return {
    nights,
    nightlyRates,
    subtotal,
    cleaningFee: CLEANING_FEE,
    totalPrice: subtotal + CLEANING_FEE,
    averageNightlyRate: Math.round(subtotal / nights),
  };
}

/**
 * Validate minimum-stay rules and return an error message (or null if valid).
 */
export function validateStay(
  checkIn: Date,
  checkOut: Date
): string | null {
  const nights = Math.round(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );
  const { nights: minNights, saturdayOnly } = getMinimumStay(checkIn);

  if (nights < minNights) {
    return `Minimum stay is ${minNights} nights for this period.`;
  }

  if (saturdayOnly) {
    // Saturday = 6
    if (checkIn.getDay() !== 6) {
      return "High season bookings must start on Saturday.";
    }
    if (checkOut.getDay() !== 6) {
      return "High season bookings must end on Saturday.";
    }
  }

  return null;
}

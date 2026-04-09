import { promises as fs } from "fs";
import path from "path";
import type { Reservation, BlockedDate, Review } from "./db/schema";

// ── Data directory ───────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readJSON<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    // File doesn't exist yet — return fallback and create it
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
}

async function writeJSON<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ── Reservations ─────────────────────────────────────────────────────────────

export async function readReservations(): Promise<Reservation[]> {
  return readJSON<Reservation[]>("reservations.json", []);
}

export async function writeReservations(
  reservations: Reservation[]
): Promise<void> {
  await writeJSON("reservations.json", reservations);
}

export async function addReservation(
  reservation: Reservation
): Promise<void> {
  const list = await readReservations();
  list.push(reservation);
  await writeReservations(list);
}

export async function updateReservation(
  id: string,
  updates: Partial<Reservation>
): Promise<Reservation | null> {
  const list = await readReservations();
  const index = list.findIndex((r) => r.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updates };
  await writeReservations(list);
  return list[index];
}

// ── Blocked dates ────────────────────────────────────────────────────────────

export async function readBlockedDates(): Promise<BlockedDate[]> {
  return readJSON<BlockedDate[]>("blocked-dates.json", []);
}

export async function writeBlockedDates(
  dates: BlockedDate[]
): Promise<void> {
  await writeJSON("blocked-dates.json", dates);
}

export async function addBlockedDate(entry: BlockedDate): Promise<void> {
  const list = await readBlockedDates();
  // Avoid duplicates for the same date
  if (!list.some((d) => d.date === entry.date)) {
    list.push(entry);
    await writeBlockedDates(list);
  }
}

export async function removeBlockedDate(date: string): Promise<void> {
  const list = await readBlockedDates();
  await writeBlockedDates(list.filter((d) => d.date !== date));
}

// ── Reviews ──────────────────────────────────────────────────────────────────

export async function readReviews(): Promise<Review[]> {
  return readJSON<Review[]>("reviews.json", []);
}

export async function writeReviews(reviews: Review[]): Promise<void> {
  await writeJSON("reviews.json", reviews);
}

export async function addReview(review: Review): Promise<void> {
  const list = await readReviews();
  list.push(review);
  await writeReviews(list);
}

export async function approveReview(id: string): Promise<Review | null> {
  const list = await readReviews();
  const index = list.findIndex((r) => r.id === id);
  if (index === -1) return null;
  list[index].approved = true;
  await writeReviews(list);
  return list[index];
}

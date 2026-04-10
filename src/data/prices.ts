export interface PriceSeason {
  id: string;
  nameKey: string;
  period: string;
  nightly: number;
  weekly: number;
  monthly: number;
}

export const prices: PriceSeason[] = [
  {
    id: "default",
    nameKey: "prices.default",
    period: "Oct - Avr (hors Noel)",
    nightly: 380,
    weekly: 2535,
    monthly: 8544,
  },
  {
    id: "christmas",
    nameKey: "prices.christmas",
    period: "23 Dec - 1 Jan",
    nightly: 390,
    weekly: 2690,
    monthly: 8608,
  },
  {
    id: "mid",
    nameKey: "prices.mid",
    period: "Mai - Juin, Septembre",
    nightly: 405,
    weekly: 2810,
    monthly: 10116,
  },
  {
    id: "high",
    nameKey: "prices.high",
    period: "Juillet - Aout",
    nightly: 505,
    weekly: 3510,
    monthly: 14040,
  },
];

export const cleaningFee = 150;

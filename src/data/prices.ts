export interface PriceSeason {
  id: string;
  nameKey: string;
  period: string;
  nightlyMin: number;
  nightlyMax: number;
  weekly: number;
  monthly: number;
}

export const prices: PriceSeason[] = [
  {
    id: "default",
    nameKey: "prices.default",
    period: "Year-round",
    nightlyMin: 380,
    nightlyMax: 385,
    weekly: 2535,
    monthly: 8544,
  },
  {
    id: "christmas",
    nameKey: "prices.christmas",
    period: "Dec 23 - Jan 1",
    nightlyMin: 385,
    nightlyMax: 390,
    weekly: 2690,
    monthly: 8608,
  },
  {
    id: "mid",
    nameKey: "prices.mid",
    period: "May 1 - Jun 30 & Sep 1 - 30",
    nightlyMin: 400,
    nightlyMax: 405,
    weekly: 2810,
    monthly: 10116,
  },
  {
    id: "high",
    nameKey: "prices.high",
    period: "Jul 1 - Aug 31 (Sat to Sat)",
    nightlyMin: 500,
    nightlyMax: 505,
    weekly: 3510,
    monthly: 14040,
  },
];

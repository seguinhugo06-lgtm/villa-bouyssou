export interface Bedroom {
  id: string;
  nameKey: string;
  color: string;
  capacity: number;
  beds: string;
  features: string[];
  imagePlaceholder: string;
}

export const bedrooms: Bedroom[] = [
  {
    id: "bleuNuit",
    nameKey: "bedrooms.bleuNuit",
    color: "#1B2A4A",
    capacity: 2,
    beds: "160x200cm",
    features: [
      "bedrooms.features.bathtubAndItalianShower",
      "bedrooms.features.tv",
      "bedrooms.features.largeDressing",
    ],
    imagePlaceholder: "Chambre Bleu Nuit with deep blue tones, king bed, bathtub and Italian shower",
  },
  {
    id: "terracotta",
    nameKey: "bedrooms.terracotta",
    color: "#CC5A47",
    capacity: 2,
    beds: "160x200cm",
    features: ["bedrooms.features.italianShower"],
    imagePlaceholder: "Chambre Terracotta with warm earthy tones, king bed, Italian shower",
  },
  {
    id: "ocre",
    nameKey: "bedrooms.ocre",
    color: "#C4952B",
    capacity: 3,
    beds: "160x200cm + 90x200cm",
    features: ["bedrooms.features.italianShower"],
    imagePlaceholder: "Chambre Ocre with golden ochre tones, king bed plus single bed, Italian shower",
  },
];

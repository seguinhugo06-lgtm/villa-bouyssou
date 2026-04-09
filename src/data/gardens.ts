export interface Garden {
  id: string;
  name: string;
  distance: number;
  taglineKey: string;
  website?: string;
  imagePlaceholder: string;
}

export const gardens: Garden[] = [
  {
    id: "marqueyssac",
    name: "Marqueyssac",
    distance: 11.2,
    taglineKey: "gardens.marqueyssac.tagline",
    website: "marqueyssac.com",
    imagePlaceholder: "Jardins de Marqueyssac with hand-pruned boxwood and panoramic views",
  },
  {
    id: "eyrignac",
    name: "Eyrignac",
    distance: 13.7,
    taglineKey: "gardens.eyrignac.tagline",
    imagePlaceholder: "Jardins du Manoir d'Eyrignac with sculpted topiaries and green architecture",
  },
  {
    id: "chateau-de-losse",
    name: "Ch\u00e2teau de Losse",
    distance: 21.5,
    taglineKey: "gardens.chateauDeLosse.tagline",
    website: "chateaudelosse.com",
    imagePlaceholder: "Ch\u00e2teau de Losse Renaissance gardens along the V\u00e9z\u00e8re river",
  },
  {
    id: "planbuisson",
    name: "Planbuisson",
    distance: 30.3,
    taglineKey: "gardens.planbuisson.tagline",
    website: "planbuisson.com",
    imagePlaceholder: "Bambouseraie de Planbuisson exotic bamboo garden",
  },
  {
    id: "imaginaire",
    name: "Imaginaire",
    distance: 33.1,
    taglineKey: "gardens.imaginaire.tagline",
    imagePlaceholder: "Jardins de l'Imaginaire terraced gardens with water features and panoramic views",
  },
  {
    id: "limeuil",
    name: "Limeuil",
    distance: 35.7,
    taglineKey: "gardens.limeuil.tagline",
    imagePlaceholder: "Jardins Panoramiques de Limeuil overlooking the confluence of two rivers",
  },
];

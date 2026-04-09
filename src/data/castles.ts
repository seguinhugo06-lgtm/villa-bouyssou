export interface Castle {
  id: string;
  name: string;
  distance: number;
  taglineKey: string;
  website?: string;
  imagePlaceholder: string;
}

export const castles: Castle[] = [
  {
    id: "puymartin",
    name: "Puymartin",
    distance: 7.8,
    taglineKey: "castles.puymartin.tagline",
    website: "chateau-puymartin.com",
    imagePlaceholder: "Ch\u00e2teau de Puymartin surrounded by forest near Sarlat",
  },
  {
    id: "beynac",
    name: "Beynac",
    distance: 12.4,
    taglineKey: "castles.beynac.tagline",
    website: "chateau-beynac.com",
    imagePlaceholder: "Ch\u00e2teau de Beynac perched on a cliff overlooking the Dordogne river",
  },
  {
    id: "castelnaud",
    name: "Castelnaud",
    distance: 13.7,
    taglineKey: "castles.castelnaud.tagline",
    imagePlaceholder: "Ch\u00e2teau de Castelnaud medieval fortress with warfare museum",
  },
  {
    id: "commarque",
    name: "Commarque",
    distance: 15.6,
    taglineKey: "castles.commarque.tagline",
    website: "commarque.com",
    imagePlaceholder: "Ch\u00e2teau de Commarque ruined castle and prehistoric cave site",
  },
  {
    id: "salignac",
    name: "Salignac",
    distance: 17.2,
    taglineKey: "castles.salignac.tagline",
    website: "chateausalignac.com",
    imagePlaceholder: "Ch\u00e2teau de Salignac with its medieval and Renaissance architecture",
  },
  {
    id: "milandes",
    name: "Milandes",
    distance: 18.3,
    taglineKey: "castles.milandes.tagline",
    website: "milandes.com",
    imagePlaceholder: "Ch\u00e2teau des Milandes, former home of Josephine Baker",
  },
  {
    id: "fenelon",
    name: "F\u00e9n\u00e9lon",
    distance: 22.2,
    taglineKey: "castles.fenelon.tagline",
    website: "chateau-fenelon.fr",
    imagePlaceholder: "Ch\u00e2teau de F\u00e9n\u00e9lon with its double enclosure and lauze roofs",
  },
];

export interface Village {
  id: string;
  name: string;
  distance: number;
  taglineKey: string;
  website?: string;
  imagePlaceholder: string;
}

export const villages: Village[] = [
  {
    id: "beynac-et-cazenac",
    name: "Beynac-et-Cazenac",
    distance: 11.7,
    taglineKey: "villages.beynacEtCazenac.tagline",
    website: "beynac-et-cazenac.fr",
    imagePlaceholder: "Beynac-et-Cazenac village perched above the Dordogne river with its medieval castle",
  },
  {
    id: "domme",
    name: "Domme",
    distance: 12.9,
    taglineKey: "villages.domme.tagline",
    imagePlaceholder: "Domme bastide town with panoramic views over the Dordogne valley",
  },
  {
    id: "la-roque-gageac",
    name: "La Roque-Gageac",
    distance: 13.2,
    taglineKey: "villages.laRoqueGageac.tagline",
    website: "laroquegageac.fr",
    imagePlaceholder: "La Roque-Gageac village built into the cliffside along the Dordogne river",
  },
  {
    id: "castelnaud-la-chapelle",
    name: "Castelnaud-la-Chapelle",
    distance: 15,
    taglineKey: "villages.castelnaudLaChapelle.tagline",
    imagePlaceholder: "Castelnaud-la-Chapelle with its imposing medieval fortress",
  },
  {
    id: "saint-amand-de-coly",
    name: "Saint-Amand-de-Coly",
    distance: 21.8,
    taglineKey: "villages.saintAmandDeColy.tagline",
    website: "colysaintamand.fr",
    imagePlaceholder: "Saint-Amand-de-Coly with its fortified abbey church in golden stone",
  },
  {
    id: "saint-leon-sur-vezere",
    name: "Saint-L\u00e9on-sur-V\u00e9z\u00e8re",
    distance: 24,
    taglineKey: "villages.saintLeonSurVezere.tagline",
    imagePlaceholder: "Saint-L\u00e9on-sur-V\u00e9z\u00e8re Romanesque church and riverside setting",
  },
  {
    id: "belves",
    name: "Belv\u00e8s",
    distance: 30,
    taglineKey: "villages.belves.tagline",
    website: "belves-en-perigord.com",
    imagePlaceholder: "Belv\u00e8s hilltop town with its seven bell towers",
  },
  {
    id: "limeuil",
    name: "Limeuil",
    distance: 35.8,
    taglineKey: "villages.limeuil.tagline",
    imagePlaceholder: "Limeuil village at the confluence of the Dordogne and V\u00e9z\u00e8re rivers",
  },
  {
    id: "monpazier",
    name: "Monpazier",
    distance: 45.7,
    taglineKey: "villages.monpazier.tagline",
    website: "monpazier.fr",
    imagePlaceholder: "Monpazier bastide town with its perfectly preserved medieval square",
  },
  {
    id: "saint-jean-de-cole",
    name: "Saint-Jean-de-C\u00f4le",
    distance: 85.2,
    taglineKey: "villages.saintJeanDeCole.tagline",
    imagePlaceholder: "Saint-Jean-de-C\u00f4le charming village with its humpback bridge and priory",
  },
];

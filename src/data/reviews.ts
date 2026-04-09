export interface Review {
  id: string;
  author: string;
  country: string;
  rating: number;
  date: string;
  text: string;
}

export const reviews: Review[] = [
  {
    id: "review-1",
    author: "Thomas",
    country: "BE",
    rating: 5,
    date: "2023-12",
    text: "Nous avons b\u00e9n\u00e9fici\u00e9 d\u2019un accueil tr\u00e8s aimable et attentionn\u00e9. Maison moderne, confortable, pratique, bien meubl\u00e9e.",
  },
  {
    id: "review-2",
    author: "Maguelone",
    country: "FR",
    rating: 5,
    date: "2023-05",
    text: "La maison est magnifique et tr\u00e8s bien plac\u00e9e ! Merci \u00c9lina.",
  },
  {
    id: "review-3",
    author: "Jack",
    country: "GB",
    rating: 5,
    date: "2023-06",
    text: "Its proximity to the beautiful town centre of Sarlat couldn\u2019t have been better. Spacious, comfortable, excellent kitchen.",
  },
  {
    id: "review-4",
    author: "Shelley",
    country: "GB",
    rating: 5,
    date: "2023-07",
    text: "A really nice home with a wonderful pool, everything we needed was provided. A real gem.",
  },
  {
    id: "review-5",
    author: "Sandrine",
    country: "FR",
    rating: 5,
    date: "2023-08",
    text: "S\u00e9jour agr\u00e9able dans une villa tr\u00e8s agr\u00e9able et bien \u00e9quip\u00e9e.",
  },
  {
    id: "review-6",
    author: "Jean-Marc",
    country: "FR",
    rating: 5,
    date: "2023-08",
    text: "Superbe maison tr\u00e8s bien \u00e9quip\u00e9e, id\u00e9alement bien situ\u00e9e \u00e0 5 mn du centre.",
  },
  {
    id: "review-7",
    author: "C\u00e9dric",
    country: "FR",
    rating: 5,
    date: "2023-08",
    text: "Parfait rien \u00e0 redire, tr\u00e8s belle maison.",
  },
  {
    id: "review-8",
    author: "Anne",
    country: "GB",
    rating: 5,
    date: "2023-09",
    text: "Perfect property in a great location. Beautiful pool and everything you need for a great holiday.",
  },
  {
    id: "review-9",
    author: "Sophia",
    country: "US",
    rating: 5,
    date: "2023-09",
    text: "Wonderful stay, beautiful villa!",
  },
  {
    id: "review-10",
    author: "Elizabeth",
    country: "US",
    rating: 5,
    date: "2023-10",
    text: "This was the nicest AirBnB we have ever stayed in: a truly unique, classy, and tasteful place. Full of smiles!!!",
  },
];

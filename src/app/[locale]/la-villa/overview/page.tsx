"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const equipmentCategories = [
  {
    title: "Piscine & Spa",
    icon: "🏊",
    items: [
      "Piscine chauffée 11×4m (profondeur 1,50m)",
      "Couverture de piscine électrique",
      "Douche extérieure",
      "Transats & mobilier de jardin",
    ],
  },
  {
    title: "Parking",
    icon: "🚗",
    items: [
      "Parking privé gratuit sur place",
      "Espace pour 3 véhicules",
    ],
  },
  {
    title: "Services",
    icon: "🛎️",
    items: [
      "Accueil personnalisé",
      "Linge de maison fourni",
      "Serviettes de piscine",
      "Ménage de fin de séjour inclus",
      "Lit bébé & chaise haute sur demande",
    ],
  },
  {
    title: "Règles",
    icon: "📋",
    items: [
      "Non-fumeur à l'intérieur",
      "Animaux bienvenus",
      "Enfants bienvenus",
      "Accessible PMR (rez-de-chaussée)",
    ],
  },
  {
    title: "Divertissement",
    icon: "🎮",
    items: [
      "Table de ping-pong",
      "Jeux de société",
      "Livres & magazines",
      "Smart TV avec Netflix",
      "Enceinte Bluetooth",
    ],
  },
  {
    title: "Cuisine",
    icon: "🍳",
    items: [
      "Cuisine entièrement équipée",
      "Lave-vaisselle",
      "Four & micro-ondes",
      "Machine à café Nespresso",
      "Barbecue à gaz Weber",
      "Plancha",
      "Réfrigérateur américain",
    ],
  },
  {
    title: "Location",
    icon: "📍",
    items: [
      "500m du centre historique de Sarlat",
      "Quartier résidentiel calme",
      "Accès à pied aux commerces",
      "Région Périgord Noir",
    ],
  },
  {
    title: "Salle de bain",
    icon: "🚿",
    items: [
      "3 salles de bain privées",
      "Douches à l'italienne",
      "Sèche-cheveux",
      "Produits d'accueil",
    ],
  },
  {
    title: "Chauffage",
    icon: "🌡️",
    items: [
      "Climatisation réversible au sol",
      "Cheminée à bois (salon)",
      "Chauffage central",
    ],
  },
  {
    title: "Internet",
    icon: "📶",
    items: [
      "Wi-Fi fibre optique haut débit",
      "Couverture dans toute la villa et le jardin",
    ],
  },
  {
    title: "Sécurité",
    icon: "🔒",
    items: [
      "Portail électrique",
      "Détecteurs de fumée",
      "Extincteur",
      "Trousse de premiers secours",
    ],
  },
];

const houseRules = [
  { label: "Arrivée", value: "À partir de 16h00" },
  { label: "Départ", value: "Avant 10h00" },
  { label: "Ménage", value: "Ménage de fin de séjour inclus" },
  { label: "Paiement", value: "Cartes bancaires acceptées" },
  { label: "Enfants", value: "Bienvenus (lit bébé disponible)" },
  { label: "Animaux", value: "Bienvenus (supplément possible)" },
  { label: "Fumeurs", value: "Non-fumeur à l'intérieur" },
  { label: "Accessibilité", value: "Rez-de-chaussée accessible PMR" },
];

const bedrooms = [
  {
    name: "Chambre Terracotta",
    color: "#CC5A47",
    capacity: "2 à 3 voyageurs",
    bed: "Lit king-size (180×200) + lit simple (90×200)",
    bath: "Salle de bain privée avec douche à l'italienne",
    image: "/images/chambres/terracotta.jpg",
  },
  {
    name: "Chambre Bleu Nuit",
    color: "#1B2A4A",
    capacity: "2 à 3 voyageurs",
    bed: "Lit king-size (180×200) + lit simple (90×200)",
    bath: "Salle de bain privée avec douche à l'italienne",
    image: "/images/chambres/bleu-nuit.jpg",
  },
  {
    name: "Chambre Ocre",
    color: "#C4952B",
    capacity: "2 à 3 voyageurs",
    bed: "Lit king-size (180×200) + lit simple (90×200)",
    bath: "Salle de bain privée avec douche à l'italienne",
    image: "/images/chambres/ocre.jpg",
  },
];

export default function OverviewPage() {
  const t = useTranslations("nav");

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="/images/real/overview-hero.jpg"
          alt="Villa Bouyssou"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-16">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            >
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
                Villa Bouyssou{" "}
                <span className="text-peach">· 500m du centre · Piscine chauffée</span>
              </h1>
              <p className="mt-4 font-body text-lg text-white/80">
                Sarlat-la-Canéda, France
              </p>
              <div className="mt-3 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-peach fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-white/70 font-body text-sm">5.0</span>
              </div>
              <p className="mt-4 font-accent text-sm tracking-widest uppercase text-peach">
                À partir de 380€ / nuit
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white border-b border-charcoal/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {[
            { value: "7", label: "voyageurs" },
            { value: "3", label: "chambres" },
            { value: "4", label: "lits" },
            { value: "3", label: "salles de bain" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-heading text-2xl text-navy font-semibold">
                {stat.value}
              </span>
              <span className="font-body text-charcoal/60 text-sm">
                {stat.label}
              </span>
              {i < 3 && (
                <span className="ml-4 text-charcoal/20 hidden md:inline">·</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Description */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedText
            text="Découvrez la Villa Bouyssou"
            as="h2"
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-light mb-10"
          />
          <AnimatedSection delay={0.2}>
            <div className="space-y-6 font-body text-charcoal/80 leading-relaxed text-lg">
              <p>
                Découvrez une villa exceptionnelle à Sarlat-la-Canéda, au cœur du
                Périgord Noir. Située à seulement 500 mètres du centre historique,
                cette propriété contemporaine de standing offre un cadre idéal pour
                des vacances en famille ou entre amis.
              </p>
              <p>
                Avec ses 3 chambres spacieuses, chacune dotée de sa propre salle de
                bain privée avec douche à l&apos;italienne, la villa accueille
                confortablement jusqu&apos;à 7 voyageurs. L&apos;architecture
                moderne et les finitions haut de gamme créent une atmosphère
                chaleureuse et raffinée.
              </p>
              <p>
                Profitez d&apos;un terrain de 2 386 m² avec piscine chauffée
                (11×4m), terrasse panoramique, barbecue à gaz et table de
                ping-pong. La climatisation réversible au sol et la cheminée à bois
                assurent votre confort en toute saison.
              </p>
              <p>
                Idéalement placée, la villa vous permet de rejoindre à pied les
                restaurants, marchés et sites historiques de Sarlat, tout en
                profitant du calme d&apos;un quartier résidentiel entouré de
                nature.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pool & Outdoor */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText
            text="Piscine & Extérieurs"
            as="h2"
            className="font-heading text-3xl md:text-4xl text-navy font-light mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/real/overview-pool.jpg"
                  alt="Piscine chauffée"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.15}>
              <div className="flex flex-col justify-center h-full">
                <h3 className="font-heading text-2xl text-navy mb-6">
                  Un espace extérieur d&apos;exception
                </h3>
                <ul className="space-y-4 font-body text-charcoal/80">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-peach mt-2 shrink-0" />
                    <span>
                      <strong>Piscine chauffée</strong> de 11×4m (profondeur
                      1,50m) avec couverture électrique
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-peach mt-2 shrink-0" />
                    <span>
                      <strong>Terrasse panoramique</strong> avec mobilier de
                      jardin et transats
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-peach mt-2 shrink-0" />
                    <span>
                      <strong>Barbecue à gaz</strong> Weber et plancha pour vos
                      repas en plein air
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-peach mt-2 shrink-0" />
                    <span>
                      <strong>Table de ping-pong</strong> et jeux extérieurs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-peach mt-2 shrink-0" />
                    <span>
                      <strong>Terrain de 2 386 m²</strong> entouré de nature et de
                      forêt
                    </span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Architecture & Design */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText
            text="Architecture & Design"
            as="h2"
            className="font-heading text-3xl md:text-4xl text-navy font-light mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col justify-center h-full">
                <p className="font-body text-charcoal/80 leading-relaxed text-lg mb-6">
                  La Villa Bouyssou allie architecture contemporaine et matériaux
                  nobles. Les larges baies vitrées inondent les espaces de lumière
                  naturelle, offrant des vues imprenables sur le jardin et la
                  piscine.
                </p>
                <p className="font-body text-charcoal/80 leading-relaxed text-lg">
                  Le salon spacieux avec sa cheminée à bois, la cuisine
                  entièrement équipée et la salle à manger ouverte créent un
                  espace de vie convivial, parfait pour les moments partagés en
                  famille ou entre amis.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/real/overview-salon.jpg"
                  alt="Architecture et design"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Bedrooms */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText
            text="Les Chambres"
            as="h2"
            className="font-heading text-3xl md:text-4xl text-navy font-light mb-4"
          />
          <AnimatedSection delay={0.15}>
            <p className="font-body text-charcoal/70 mb-12 max-w-2xl">
              Trois chambres élégantes, chacune avec sa propre identité et sa salle
              de bain privée avec douche à l&apos;italienne.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bedrooms.map((room, i) => (
              <motion.div
                key={room.name}
                custom={i * 0.15}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group bg-cream rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: room.color }}
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="font-heading text-xl font-semibold mb-2"
                    style={{ color: room.color }}
                  >
                    {room.name}
                  </h3>
                  <p className="font-body text-sm text-charcoal/60 mb-1">
                    {room.capacity}
                  </p>
                  <p className="font-body text-sm text-charcoal/60 mb-1">
                    {room.bed}
                  </p>
                  <p className="font-body text-sm text-charcoal/70">
                    {room.bath}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Equipment */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText
            text="Équipements Complets"
            as="h2"
            className="font-heading text-3xl md:text-4xl text-navy font-light mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {equipmentCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                custom={i * 0.08}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="font-heading text-lg text-navy font-semibold">
                    {cat.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body text-sm text-charcoal/70"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-peach mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* House Rules */}
      <section className="py-20 md:py-28 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedText
            text="Règlement Intérieur"
            as="h2"
            className="font-heading text-3xl md:text-4xl text-white font-light mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {houseRules.map((rule, i) => (
              <motion.div
                key={rule.label}
                custom={i * 0.1}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white/5 rounded-xl p-5 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-full bg-peach/20 flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-peach" />
                </div>
                <div>
                  <p className="font-accent text-xs tracking-widest uppercase text-peach mb-1">
                    {rule.label}
                  </p>
                  <p className="font-body text-white/80">{rule.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Policies */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedText
            text="Conditions de Réservation"
            as="h2"
            className="font-heading text-3xl md:text-4xl text-navy font-light mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0}>
              <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
                <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6 text-forest"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-navy font-semibold mb-3">
                  Paiement
                </h3>
                <ul className="space-y-2 font-body text-sm text-charcoal/70">
                  <li>50% à la réservation</li>
                  <li>Solde 7 jours avant l&apos;arrivée</li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
                <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6 text-terracotta"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-navy font-semibold mb-3">
                  Annulation
                </h3>
                <ul className="space-y-2 font-body text-sm text-charcoal/70">
                  <li>
                    <strong>+ de 30 jours :</strong> remboursement 100%
                  </li>
                  <li>
                    <strong>- de 30 jours :</strong> non remboursable
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
                <div className="w-12 h-12 rounded-full bg-peach/10 flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6 text-peach"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-navy font-semibold mb-3">
                  Caution
                </h3>
                <ul className="space-y-2 font-body text-sm text-charcoal/70">
                  <li>Pré-autorisation de 1 500€</li>
                  <li>Libérée après état des lieux de sortie</li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}

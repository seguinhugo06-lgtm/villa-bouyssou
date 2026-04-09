"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";

const nearbyAmenities = [
  {
    name: "Boulangerie",
    distance: "400m",
    duration: "5 min à pied",
    description: "Pain frais, viennoiseries et pâtisseries artisanales",
  },
  {
    name: "Supermarché",
    distance: "600m",
    duration: "8 min à pied",
    description: "Courses quotidiennes et produits régionaux",
  },
  {
    name: "Pharmacie",
    distance: "500m",
    duration: "6 min à pied",
    description: "Pharmacie de garde à proximité",
  },
  {
    name: "Centre-ville historique",
    distance: "500m",
    duration: "5 min à pied",
    description: "Restaurants, marchés, boutiques et sites historiques",
  },
  {
    name: "Marché de Sarlat",
    distance: "550m",
    duration: "7 min à pied",
    description: "Marché couvert et marché de plein air (mercredi et samedi)",
  },
  {
    name: "Office de Tourisme",
    distance: "600m",
    duration: "7 min à pied",
    description: "Informations touristiques et billetterie",
  },
];

const bouncePinVariants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut" as const,
    },
  },
};

export default function LocalisationPage() {
  const t = useTranslations("nav");

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText
            text="Localisation"
            as="h1"
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy font-light"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 flex items-start gap-3"
          >
            <motion.div variants={bouncePinVariants} animate="animate">
              <MapPin className="w-6 h-6 text-terracotta shrink-0 mt-0.5" />
            </motion.div>
            <div>
              <p className="font-body text-lg text-charcoal">
                7 Route de la Verperie
              </p>
              <p className="font-body text-charcoal/60">
                24200 Sarlat-la-Canéda, Dordogne, France
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
              <div className="aspect-[16/9] md:aspect-[21/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2843.1!2d1.2105!3d44.8872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s7+Route+de+la+Verperie%2C+24200+Sarlat-la-Can%C3%A9da!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Villa Bouyssou - Carte"
                  className="absolute inset-0"
                />
              </div>
              {/* Overlay info bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-peach flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-heading text-lg text-white font-semibold">
                      Villa Bouyssou
                    </p>
                    <p className="font-body text-sm text-white/70">
                      500m du centre historique de Sarlat-la-Canéda
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Distance Badges */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {[
              { label: "Centre-ville", distance: "500m" },
              { label: "Gare de Sarlat", distance: "1.5km" },
              { label: "Aéroport Brive", distance: "65km" },
              { label: "Lascaux IV", distance: "25km" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-full px-6 py-3 shadow-sm flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-terracotta" />
                <span className="font-body text-sm text-charcoal/70">
                  {item.label}
                </span>
                <span className="font-heading text-navy font-semibold">
                  {item.distance}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nearby Amenities */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText
            text="À proximité"
            as="h2"
            className="font-heading text-3xl md:text-4xl text-navy font-light mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyAmenities.map((amenity, i) => (
              <motion.div
                key={amenity.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-forest" />
                    </div>
                    <h3 className="font-heading text-lg text-navy font-semibold">
                      {amenity.name}
                    </h3>
                  </div>
                  <span className="font-accent text-xs tracking-widest uppercase text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
                    {amenity.distance}
                  </span>
                </div>
                <p className="font-body text-sm text-charcoal/60 mb-2">
                  {amenity.duration}
                </p>
                <p className="font-body text-sm text-charcoal/70">
                  {amenity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="pb-24 md:pb-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <AnimatedText
            text="Informations Pratiques"
            as="h2"
            className="font-heading text-3xl md:text-4xl text-navy font-light mb-10"
          />
          <AnimatedSection delay={0.2}>
            <div className="space-y-6 font-body text-charcoal/80 leading-relaxed">
              <div className="flex items-start gap-4 p-5 bg-cream rounded-xl">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-navy"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-navy font-semibold mb-1">
                    En voiture
                  </p>
                  <p className="text-sm">
                    Parking privé gratuit sur place (3 places). La villa est
                    facilement accessible depuis l&apos;autoroute A20 (sortie
                    Souillac) ou l&apos;A89 (sortie Périgueux).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-cream rounded-xl">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-navy"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-navy font-semibold mb-1">
                    En avion
                  </p>
                  <p className="text-sm">
                    Aéroport de Brive-Vallée de la Dordogne (65 km, ~50 min).
                    Aéroport de Bergerac (75 km, ~1h). Location de voiture
                    disponible dans les deux aéroports.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-cream rounded-xl">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-navy"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-navy font-semibold mb-1">
                    Coordonnées GPS
                  </p>
                  <p className="text-sm">
                    Latitude : 44.8872 | Longitude : 1.2105
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

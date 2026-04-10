"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";

const bedrooms = [
  {
    id: "bleuNuit",
    color: "#1B2A4A",
    image: "/images/chambres/bleu-nuit.jpg",
  },
  {
    id: "terracotta",
    color: "#CC5A47",
    image: "/images/chambres/terracotta.jpg",
  },
  {
    id: "ocre",
    color: "#C4952B",
    image: "/images/chambres/ocre.jpg",
  },
];

export default function BedroomsSection() {
  const t = useTranslations("bedrooms");

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <AnimatedText
            text={t("title")}
            as="h2"
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-light"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 font-body text-charcoal/70 max-w-2xl mx-auto"
          >
            {t("general")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {bedrooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room.image}
                  alt={t(`rooms.${room.id}.name`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: room.color }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="font-heading text-2xl font-semibold mb-2"
                  style={{ color: room.color }}
                >
                  {t(`rooms.${room.id}.name`)}
                </h3>
                <p className="font-body text-sm text-charcoal/60 mb-2">
                  {t(`rooms.${room.id}.capacity`)}
                </p>
                <p className="font-body text-sm text-charcoal/60 mb-3">
                  {t(`rooms.${room.id}.bedSize`)}
                </p>
                <p className="font-body text-sm text-charcoal/70">
                  {t(`rooms.${room.id}.features`)}
                </p>
                <p className="font-body text-sm text-charcoal/80 mt-3 italic">
                  {t(`rooms.${room.id}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

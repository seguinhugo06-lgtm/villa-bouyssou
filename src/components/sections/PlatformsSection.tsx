"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import { Star } from "lucide-react";

const platforms = [
  {
    name: "Airbnb",
    badge: "Coup de coeur voyageurs",
    color: "#FF5A5F",
  },
  {
    name: "Abritel",
    badge: "Vrbo",
    color: "#3B5998",
  },
];

export default function PlatformsSection() {
  const t = useTranslations("platforms");

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedText
          text={t("title")}
          as="h2"
          className="font-heading text-3xl md:text-4xl text-navy font-light"
        />

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="bg-cream rounded-2xl p-8 w-full max-w-xs shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <h3
                className="font-accent text-2xl font-semibold mb-3"
                style={{ color: platform.color }}
              >
                {platform.name}
              </h3>
              <div className="flex items-center justify-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-peach text-peach" />
                  </motion.div>
                ))}
              </div>
              <p className="font-body text-sm text-charcoal/60">
                {platform.badge}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <span className="bg-[#FF5A5F]/10 text-[#FF5A5F] font-accent text-xs font-medium px-4 py-2 rounded-full">
            {t("airbnbFavorite")}
          </span>
          <span className="bg-peach/10 text-peach font-accent text-xs font-medium px-4 py-2 rounded-full">
            ★ {t("superhostBadge")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

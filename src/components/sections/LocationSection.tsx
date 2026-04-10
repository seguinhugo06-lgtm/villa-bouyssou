"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";
import { MapPin } from "lucide-react";

export default function LocationSection() {
  const t = useTranslations("locationSection");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  return (
    <section aria-labelledby="location-heading" className="py-16 md:py-20 bg-navy text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/5" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-white/5" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-peach/20 px-4 py-2 rounded-full mb-6"
            >
              <MapPin className="w-4 h-4 text-peach" />
              <span className="font-accent text-sm text-peach">
                Sarlat-la-Canéda
              </span>
            </motion.div>

            <AnimatedText
              text={t("title")}
              as="h2"
              id="location-heading"
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 font-body text-white/70 leading-relaxed"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8"
            >
              <Button
                href={`/${locale}/la-villa/localisation`}
                variant="primary"
              >
                {t("cta")} →
              </Button>
            </motion.div>
          </div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-navy-light"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <MapPin className="w-12 h-12 text-peach mx-auto mb-4" />
                </motion.div>
                <p className="font-heading text-xl text-white/80">
                  7 Route de la Verperie
                </p>
                <p className="font-body text-sm text-white/70 mt-1">
                  24200 Sarlat-la-Canéda
                </p>
              </div>
            </div>
            {/* Grid decorative */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 border-t border-white/20"
                  style={{ top: `${(i + 1) * 12.5}%` }}
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 border-l border-white/20"
                  style={{ left: `${(i + 1) * 12.5}%` }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

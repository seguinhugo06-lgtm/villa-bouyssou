"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";

export default function InteriorSection() {
  const t = useTranslations("interior");

  // Items are stored as an array in translations
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <AnimatedText
              text={t("title")}
              as="h2"
              className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-light leading-tight mb-10"
            />

            <div className="space-y-4">
              {items.map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3 py-2 border-b border-charcoal/5"
                >
                  <span className="w-2 h-2 rounded-full bg-peach flex-shrink-0" />
                  <span className="font-body text-charcoal/80">
                    {t(`items.${i}`)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/salon-interieur.jpg"
              alt="Salon de la villa"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";

export default function WelcomeSection() {
  const t = useTranslations("welcome");

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/accueil-julien.jpg"
              alt="Julien - Accueil personnalisé"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

          {/* Text */}
          <div>
            <AnimatedText
              text={t("title")}
              as="h2"
              className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-light leading-tight"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 font-body text-charcoal/70 leading-relaxed"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-6"
            >
              <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-peach/10 flex items-center justify-center">
                  <span className="text-peach font-heading text-lg">→</span>
                </div>
                <div>
                  <p className="font-accent text-xs text-charcoal/50 uppercase tracking-wider">
                    Check-in
                  </p>
                  <p className="font-body font-medium text-navy">
                    {t("checkIn")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-peach/10 flex items-center justify-center">
                  <span className="text-peach font-heading text-lg">←</span>
                </div>
                <div>
                  <p className="font-accent text-xs text-charcoal/50 uppercase tracking-wider">
                    Check-out
                  </p>
                  <p className="font-body font-medium text-navy">
                    {t("checkOut")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";

export default function SeasonalSection() {
  const t = useTranslations("seasonal");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-5 py-2 rounded-full mb-8"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full bg-terracotta"
          />
          <span className="font-accent text-sm font-medium uppercase tracking-wider">
            {t("badge")}
          </span>
        </motion.div>

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
          className="mt-6 font-body text-charcoal/70 max-w-xl mx-auto"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8"
        >
          <Button href={`/${locale}/prices`}>{t("cta")} →</Button>
        </motion.div>
      </div>
    </section>
  );
}

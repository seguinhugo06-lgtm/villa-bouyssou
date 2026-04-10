"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";

export default function EventsSection() {
  const t = useTranslations("events");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  return (
    <section aria-labelledby="events-heading" className="py-16 md:py-20 bg-forest text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedText
          text={t("title")}
          as="h2"
          id="events-heading"
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 font-body text-white/70 max-w-xl mx-auto"
        >
          {t("description")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8"
        >
          <Button href={`/${locale}/contact`} variant="primary">
            {t("cta")} →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

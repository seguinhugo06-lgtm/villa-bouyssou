"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import { Mail, Phone } from "lucide-react";

export default function ContactSection() {
  const t = useTranslations("contactQuick");

  return (
    <section className="py-24 md:py-32 bg-navy text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedText
          text={t("title")}
          as="h2"
          className="font-heading text-3xl md:text-4xl text-white font-light"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <a
            href={`mailto:${t("email")}`}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-6 py-4 transition-colors duration-300"
          >
            <Mail className="w-5 h-5 text-peach" />
            <span className="font-body text-white/80">{t("email")}</span>
          </a>
          <a
            href={`tel:${t("phone").replace(/\s/g, "")}`}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-6 py-4 transition-colors duration-300"
          >
            <Phone className="w-5 h-5 text-peach" />
            <span className="font-body text-white/80">{t("phone")}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

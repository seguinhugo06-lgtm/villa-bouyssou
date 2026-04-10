"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const contact = useTranslations("contactQuick");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      {/* Background parallax image overlay */}
      <div className="absolute inset-0 bg-navy/90 z-10" />
      <div className="absolute inset-0 bg-[url('/images/pool-terrace.jpg')] bg-cover bg-center bg-fixed opacity-20" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-peach flex items-center justify-center font-heading text-2xl font-semibold text-peach">
                B
              </div>
              <span className="font-heading text-xl font-medium">
                La Villa Bouyssou
              </span>
            </div>
            <p className="font-body text-sm text-white/70 leading-relaxed">
              {t("address")}
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
            <h4 className="font-heading text-lg font-semibold mb-6 text-peach">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: `/${locale}`, label: nav("home") },
                { href: `/${locale}/la-villa/overview`, label: nav("villa") },
                { href: `/${locale}/availability`, label: nav("availability") },
                { href: `/${locale}/prices`, label: nav("prices") },
                { href: `/${locale}/travel-guide`, label: nav("travelGuide") },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-white/70 hover:text-peach transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
            <h4 className="font-heading text-lg font-semibold mb-6 text-peach">
              Contact
            </h4>
            <div className="flex flex-col gap-3 font-body text-sm text-white/70">
              <a
                href={`mailto:${contact("email")}`}
                className="hover:text-peach transition-colors duration-300"
              >
                {contact("email")}
              </a>
              <a
                href={`tel:${contact("phone").replace(/\s/g, "")}`}
                className="hover:text-peach transition-colors duration-300"
              >
                {contact("phone")}
              </a>
            </div>
          </motion.div>

          {/* Legal & Language */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
            <h4 className="font-heading text-lg font-semibold mb-6 text-peach">
              {locale === "fr" ? "Informations" : "Information"}
            </h4>
            <div className="flex flex-col gap-3 font-body text-sm text-white/70">
              <Link
                href={`/${locale}/mentions-legales`}
                className="hover:text-peach transition-colors duration-300"
              >
                {t("legalNotice")}
              </Link>
              <Link
                href={`/${locale}/politique-de-confidentialite`}
                className="hover:text-peach transition-colors duration-300"
              >
                {t("privacyPolicy")}
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-body text-xs text-white/50">{t("rights")}</p>
          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-white/50">EUR (€)</span>
            <span className="font-body text-xs text-white/50">
              {locale === "fr" ? "Français" : "English"}
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

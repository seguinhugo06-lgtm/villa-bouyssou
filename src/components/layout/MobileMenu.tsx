"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  navLinks: { href: string; label: string }[];
  locale: string;
  onClose: () => void;
};

export default function MobileMenu({ navLinks, locale, onClose }: Props) {
  const t = useTranslations("nav");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 bg-cream"
    >
      <div className="flex flex-col items-center justify-center h-full gap-6">
        {navLinks.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="font-heading text-3xl text-navy hover:text-peach transition-colors duration-300 min-h-[44px] inline-flex items-center px-2"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-6"
        >
          <Link
            href={`/${locale}/availability`}
            onClick={onClose}
            className="bg-peach-button text-white min-h-[44px] px-8 py-3 rounded-full font-accent text-lg font-medium hover:bg-peach-button-hover transition-colors duration-300"
          >
            {t("book")}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4"
        >
          <LanguageSwitcher isScrolled={true} />
        </motion.div>
      </div>
    </motion.div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const locale = pathname.split("/")[1] || "fr";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/la-villa/overview`, label: t("villa") },
    { href: `/${locale}/la-villa/photos`, label: t("photos") },
    { href: `/${locale}/availability`, label: t("availability") },
    { href: `/${locale}/reviews`, label: t("reviews") },
    { href: `/${locale}/prices`, label: t("prices") },
    { href: `/${locale}/travel-guide`, label: t("travelGuide") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="relative z-50">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-heading text-xl font-semibold transition-colors duration-500 ${
                  isScrolled
                    ? "border-navy text-navy"
                    : "border-white text-white"
                }`}
              >
                B
              </div>
              <span
                className={`font-heading text-lg font-medium hidden sm:block transition-colors duration-500 ${
                  isScrolled ? "text-navy" : "text-white"
                }`}
              >
                La Villa Bouyssou
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-accent text-sm font-medium tracking-wide transition-colors duration-300 group ${
                  isScrolled
                    ? "text-charcoal hover:text-peach"
                    : "text-white/90 hover:text-white"
                } ${pathname === link.href ? "text-peach" : ""}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-peach transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <LanguageSwitcher isScrolled={isScrolled} />
          </nav>

          {/* Book CTA */}
          <Link
            href={`/${locale}/availability`}
            className="hidden lg:flex items-center gap-2 bg-peach text-white px-6 py-2.5 rounded-full font-accent text-sm font-medium hover:bg-peach-dark transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-peach/30"
          >
            {t("book")}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                isMobileOpen
                  ? "rotate-45 translate-y-[5px] bg-navy"
                  : isScrolled
                  ? "bg-navy"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                isMobileOpen
                  ? "opacity-0"
                  : isScrolled
                  ? "bg-navy"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                isMobileOpen
                  ? "-rotate-45 -translate-y-[5px] bg-navy"
                  : isScrolled
                  ? "bg-navy"
                  : "bg-white"
              }`}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <MobileMenu
            navLinks={navLinks}
            locale={locale}
            onClose={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

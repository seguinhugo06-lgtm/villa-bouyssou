"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { usePathname } from "next/navigation";

const heroImages = [
  { src: "/images/hero/salon-piscine.jpg", alt: "Salon avec vue piscine" },
  { src: "/images/hero/chambre-bleu-nuit.jpg", alt: "Chambre Bleu Nuit" },
  { src: "/images/hero/terrasse-piscine.jpg", alt: "Terrasse avec piscine" },
  { src: "/images/hero/patio-chaise.jpg", alt: "Patio avec chaise suspendue" },
  { src: "/images/hero/jardin-vue.jpg", alt: "Vue jardin" },
  { src: "/images/hero/villa-exterieur.jpg", alt: "Extérieur de la villa" },
];

export default function Hero() {
  const t = useTranslations("hero");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 6000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos de la villa"
    >
      {/* Background slideshow with Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 will-change-transform"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="absolute inset-0 ken-burns will-change-transform">
            <Image
              src={heroImages[currentImage].src}
              alt={heroImages[currentImage].alt}
              fill
              className="object-cover"
              priority={currentImage === 0}
              sizes="100vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay - lighter on mobile for better image visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal/70 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="font-heading text-3xl md:text-5xl lg:text-6xl font-light max-w-4xl leading-tight"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 font-body text-lg md:text-xl text-white/80 max-w-2xl"
        >
          {t("subtitle")}
        </motion.p>

        {/* Booking widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 w-full max-w-md md:max-w-none md:w-auto"
        >
          <form
            role="search"
            aria-label="Recherche de disponibilités"
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-stretch md:items-center gap-4"
          >
            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="arrival-date" className="text-xs text-white/70 font-accent uppercase tracking-wider mb-1">
                {t("checkIn")}
              </label>
              <div className="hero-date-wrapper">
                <input
                  type="date"
                  id="arrival-date"
                  name="arrival-date"
                  aria-required="true"
                  className="hero-date-input w-full"
                />
              </div>
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="departure-date" className="text-xs text-white/70 font-accent uppercase tracking-wider mb-1">
                {t("checkOut")}
              </label>
              <div className="hero-date-wrapper">
                <input
                  type="date"
                  id="departure-date"
                  name="departure-date"
                  aria-required="true"
                  className="hero-date-input w-full"
                />
              </div>
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="guests" className="text-xs text-white/70 font-accent uppercase tracking-wider mb-1">
                {t("guests")}
              </label>
              <select
                id="guests"
                name="guests"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white font-body text-sm focus:outline-none focus:border-peach transition-colors w-full md:w-auto"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <option key={n} value={n} className="text-charcoal">
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <Button href={`/${locale}/availability`} variant="primary" size="md">
              {t("bookNow")}
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === currentImage ? "bg-peach w-8" : "bg-white/50"
            }`}
            aria-label={`Aller à la photo ${i + 1}`}
            aria-current={i === currentImage ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

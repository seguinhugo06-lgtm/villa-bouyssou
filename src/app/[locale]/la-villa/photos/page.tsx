"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";

type Photo = {
  id: number;
  src: string;
  alt: string;
  category: string;
  span: "normal" | "tall" | "wide";
};

const categories = [
  "Toutes",
  "Terrasse-Jardin",
  "Terrasse-Piscine-Jardin",
  "Salon",
  "Chambre Terracotta",
  "Chambre Bleu Nuit",
  "Chambre Ocre",
  "Salle à manger",
  "Cuisine",
  "Bureau",
];

const photos: Photo[] = [
  { id: 1, src: "/images/gallery/photo-1.jpg", alt: "Terrasse et jardin vue 1", category: "Terrasse-Jardin", span: "wide" },
  { id: 2, src: "/images/gallery/photo-2.jpg", alt: "Terrasse et jardin vue 2", category: "Terrasse-Jardin", span: "normal" },
  { id: 3, src: "/images/gallery/photo-3.jpg", alt: "Terrasse et jardin vue 3", category: "Terrasse-Jardin", span: "tall" },
  { id: 4, src: "/images/gallery/photo-4.jpg", alt: "Piscine vue 1", category: "Terrasse-Piscine-Jardin", span: "normal" },
  { id: 5, src: "/images/gallery/photo-5.jpg", alt: "Piscine vue 2", category: "Terrasse-Piscine-Jardin", span: "wide" },
  { id: 6, src: "/images/gallery/photo-6.jpg", alt: "Piscine vue 3", category: "Terrasse-Piscine-Jardin", span: "normal" },
  { id: 7, src: "/images/gallery/photo-7.jpg", alt: "Piscine et terrasse vue 4", category: "Terrasse-Piscine-Jardin", span: "tall" },
  { id: 8, src: "/images/gallery/photo-8.jpg", alt: "Salon vue 1", category: "Salon", span: "wide" },
  { id: 9, src: "/images/gallery/photo-9.jpg", alt: "Salon vue 2", category: "Salon", span: "normal" },
  { id: 10, src: "/images/gallery/photo-10.jpg", alt: "Salon vue 3", category: "Salon", span: "normal" },
  { id: 11, src: "/images/gallery/photo-11.jpg", alt: "Salon vue 4", category: "Salon", span: "tall" },
  { id: 12, src: "/images/gallery/photo-12.jpg", alt: "Chambre Terracotta vue 1", category: "Chambre Terracotta", span: "wide" },
  { id: 13, src: "/images/gallery/photo-13.jpg", alt: "Chambre Terracotta vue 2", category: "Chambre Terracotta", span: "normal" },
  { id: 14, src: "/images/gallery/photo-14.jpg", alt: "Chambre Terracotta vue 3", category: "Chambre Terracotta", span: "tall" },
  { id: 15, src: "/images/gallery/photo-15.jpg", alt: "Chambre Bleu Nuit vue 1", category: "Chambre Bleu Nuit", span: "normal" },
  { id: 16, src: "/images/gallery/photo-16.jpg", alt: "Chambre Bleu Nuit vue 2", category: "Chambre Bleu Nuit", span: "wide" },
  { id: 17, src: "/images/gallery/photo-17.jpg", alt: "Chambre Bleu Nuit vue 3", category: "Chambre Bleu Nuit", span: "normal" },
  { id: 18, src: "/images/gallery/photo-18.jpg", alt: "Chambre Bleu Nuit vue 4", category: "Chambre Bleu Nuit", span: "tall" },
  { id: 19, src: "/images/gallery/photo-19.jpg", alt: "Chambre Ocre vue 1", category: "Chambre Ocre", span: "wide" },
  { id: 20, src: "/images/gallery/photo-20.jpg", alt: "Chambre Ocre vue 2", category: "Chambre Ocre", span: "normal" },
  { id: 21, src: "/images/gallery/photo-21.jpg", alt: "Chambre Ocre vue 3", category: "Chambre Ocre", span: "normal" },
  { id: 22, src: "/images/gallery/photo-22.jpg", alt: "Salle à manger vue 1", category: "Salle à manger", span: "wide" },
  { id: 23, src: "/images/gallery/photo-23.jpg", alt: "Salle à manger vue 2", category: "Salle à manger", span: "tall" },
  { id: 24, src: "/images/gallery/photo-24.jpg", alt: "Salle à manger vue 3", category: "Salle à manger", span: "normal" },
  { id: 25, src: "/images/gallery/photo-25.jpg", alt: "Cuisine vue 1", category: "Cuisine", span: "normal" },
  { id: 26, src: "/images/gallery/photo-26.jpg", alt: "Cuisine vue 2", category: "Cuisine", span: "wide" },
  { id: 27, src: "/images/gallery/photo-27.jpg", alt: "Cuisine vue 3", category: "Cuisine", span: "tall" },
  { id: 28, src: "/images/gallery/photo-28.jpg", alt: "Cuisine vue 4", category: "Cuisine", span: "normal" },
  { id: 29, src: "/images/gallery/photo-29.jpg", alt: "Bureau vue 1", category: "Bureau", span: "wide" },
];

const spanClasses: Record<Photo["span"], string> = {
  normal: "",
  tall: "row-span-2",
  wide: "md:col-span-2",
};

export default function PhotosPage() {
  const t = useTranslations("nav");
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "Toutes"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredPhotos.length : null
    );
  }, [filteredPhotos.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        : null
    );
  }, [filteredPhotos.length]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText
            text={t("photos")}
            as="h1"
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy font-light"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 font-body text-charcoal/70"
          >
            {filteredPhotos.length} / {photos.length} photos
          </motion.p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-accent text-xs tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-navy text-white shadow-md"
                    : "bg-white text-charcoal/70 hover:bg-navy/5 hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    opacity: { duration: 0.4, delay: i * 0.04 },
                    scale: { duration: 0.4, delay: i * 0.04 },
                    layout: { duration: 0.4 },
                  }}
                  className={`relative rounded-xl overflow-hidden cursor-pointer group ${spanClasses[photo.span]}`}
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-body text-xs text-white/90">
                      {photo.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Fermer"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Photo précédente"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={filteredPhotos[lightboxIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[80vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredPhotos[lightboxIndex].src}
                alt={filteredPhotos[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Photo suivante"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-accent text-sm text-white/70 tracking-wider">
              {lightboxIndex + 1} / {filteredPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

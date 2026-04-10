"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedText from "@/components/ui/AnimatedText";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

const FLAG_MAP: Record<string, string> = {
  BE: "\u{1F1E7}\u{1F1EA}",
  FR: "\u{1F1EB}\u{1F1F7}",
  GB: "\u{1F1EC}\u{1F1E7}",
  US: "\u{1F1FA}\u{1F1F8}",
};

function StarRating({ rating, size = 16, animate = false, delay = 0 }: { rating: number; size?: number; animate?: boolean; delay?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={animate ? { opacity: 0, scale: 0 } : false}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={animate ? { delay: delay + i * 0.1, duration: 0.3, type: "spring", stiffness: 300 } : undefined}
        >
          <Star
            size={size}
            className={i < rating ? "fill-peach text-peach" : "fill-none text-charcoal/20"}
          />
        </motion.div>
      ))}
    </div>
  );
}

function formatReviewDate(dateStr: string) {
  const [year, month] = dateStr.split("-");
  const months = [
    "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre",
  ];
  return `${months[parseInt(month) - 1]} ${year}`;
}

const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function ReviewsPage() {
  const t = useTranslations();

  return (
    <section className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Avis des voyageurs"
            as="h1"
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy font-light"
          />

          {/* Overall rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <p className="font-heading text-6xl md:text-7xl text-navy font-light">
              {averageRating.toFixed(1)}
            </p>
            <StarRating rating={Math.round(averageRating)} size={28} animate delay={0.6} />
            <p className="font-body text-charcoal/70 text-sm mt-1">
              {reviews.length} avis verifies
            </p>
          </motion.div>
        </div>

        {/* Reviews grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              {/* Author row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center font-heading text-navy text-lg shrink-0">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-body font-medium text-charcoal">
                      {review.author}
                    </p>
                    <p className="text-xs text-charcoal/70 font-body">
                      {formatReviewDate(review.date)}
                    </p>
                  </div>
                </div>
                <span className="text-2xl" role="img" aria-label={review.country}>
                  {FLAG_MAP[review.country] || review.country}
                </span>
              </div>

              {/* Stars */}
              <div className="mb-4">
                <StarRating rating={review.rating} size={14} />
              </div>

              {/* Text */}
              <p className="font-body text-charcoal/70 text-sm leading-relaxed flex-1">
                {review.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Add review button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <button className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-accent text-sm uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300">
            Ajouter un avis
          </button>
        </motion.div>
      </div>
    </section>
  );
}

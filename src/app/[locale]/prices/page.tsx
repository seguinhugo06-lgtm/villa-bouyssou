"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedText from "@/components/ui/AnimatedText";
import { prices } from "@/data/prices";

type ViewMode = "nightly" | "weekly" | "monthly";

function useCountUp(target: number, duration: number = 1200, start: boolean = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let rafId: number;

    function tick(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return value;
}

function PriceCell({ value, start }: { value: number; start: boolean }) {
  const animated = useCountUp(value, 1200, start);
  return (
    <span className="font-heading text-2xl md:text-3xl text-navy font-light">
      {animated}
      <span className="text-sm text-charcoal/40 ml-0.5">EUR</span>
    </span>
  );
}

const SEASON_NAMES: Record<string, string> = {
  "prices.default": "Standard",
  "prices.christmas": "Noel / Nouvel An",
  "prices.mid": "Moyenne saison",
  "prices.high": "Haute saison",
};

const rowVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.15 * i,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function PricesPage() {
  const t = useTranslations();
  const [viewMode, setViewMode] = useState<ViewMode>("nightly");
  const [hasAnimated, setHasAnimated] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );
    if (tableRef.current) observer.observe(tableRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  function getPriceForMode(season: typeof prices[0]) {
    switch (viewMode) {
      case "nightly":
        return season.nightlyMin;
      case "weekly":
        return season.weekly;
      case "monthly":
        return season.monthly;
    }
  }

  const toggleOptions: { key: ViewMode; label: string }[] = [
    { key: "nightly", label: "Nuitee" },
    { key: "weekly", label: "Semaine" },
    { key: "monthly", label: "Mois" },
  ];

  return (
    <section className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Tarifs saisonniers"
            as="h1"
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy font-light"
          />
        </div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm">
            {toggleOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setViewMode(opt.key);
                  setHasAnimated(false);
                  setTimeout(() => setHasAnimated(true), 50);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-accent uppercase tracking-wider transition-all duration-300 ${
                  viewMode === opt.key
                    ? "bg-navy text-white shadow-md"
                    : "text-charcoal/50 hover:text-charcoal"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Desktop table */}
        <div ref={tableRef} className="hidden md:block">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-5 gap-4 px-8 py-5 bg-navy/5 border-b border-navy/10">
              <span className="font-accent text-xs uppercase tracking-widest text-charcoal/50">
                Saison
              </span>
              <span className="font-accent text-xs uppercase tracking-widest text-charcoal/50">
                Periode
              </span>
              <span className="font-accent text-xs uppercase tracking-widest text-charcoal/50 text-right">
                Nuitee
              </span>
              <span className="font-accent text-xs uppercase tracking-widest text-charcoal/50 text-right">
                Semaine
              </span>
              <span className="font-accent text-xs uppercase tracking-widest text-charcoal/50 text-right">
                Mois
              </span>
            </div>

            {/* Data rows */}
            {prices.map((season, i) => (
              <motion.div
                key={season.id}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`grid grid-cols-5 gap-4 px-8 py-6 items-center ${
                  i < prices.length - 1 ? "border-b border-navy/5" : ""
                }`}
              >
                <span className="font-heading text-lg text-navy">
                  {SEASON_NAMES[season.nameKey] || season.nameKey}
                </span>
                <span className="font-body text-sm text-charcoal/60">
                  {season.period}
                </span>
                <span className="text-right">
                  <PriceCell value={season.nightlyMin} start={hasAnimated} />
                </span>
                <span className="text-right">
                  <PriceCell value={season.weekly} start={hasAnimated} />
                </span>
                <span className="text-right">
                  <PriceCell value={season.monthly} start={hasAnimated} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {prices.map((season, i) => (
            <motion.div
              key={season.id}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-heading text-xl text-navy mb-1">
                {SEASON_NAMES[season.nameKey] || season.nameKey}
              </h3>
              <p className="font-body text-sm text-charcoal/50 mb-4">
                {season.period}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-accent text-xs uppercase tracking-wider text-charcoal/40">
                    Nuitee
                  </span>
                  <PriceCell value={season.nightlyMin} start={hasAnimated} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-accent text-xs uppercase tracking-wider text-charcoal/40">
                    Semaine
                  </span>
                  <PriceCell value={season.weekly} start={hasAnimated} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-accent text-xs uppercase tracking-wider text-charcoal/40">
                    Mois
                  </span>
                  <PriceCell value={season.monthly} start={hasAnimated} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking policies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-navy font-light mb-8 text-center">
            Conditions de reservation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Payment */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-peach/15 flex items-center justify-center">
                <span className="font-heading text-xl text-peach">$</span>
              </div>
              <h3 className="font-accent text-xs uppercase tracking-widest text-charcoal/50 mb-3">
                Paiement
              </h3>
              <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                50% a la reservation.
                <br />
                Solde 7 jours avant l&apos;arrivee.
              </p>
            </div>

            {/* Cancellation */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-forest/15 flex items-center justify-center">
                <span className="font-heading text-xl text-forest">%</span>
              </div>
              <h3 className="font-accent text-xs uppercase tracking-widest text-charcoal/50 mb-3">
                Annulation
              </h3>
              <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                100% rembourse si 30+ jours avant.
                <br />
                0% rembourse apres.
              </p>
            </div>

            {/* Deposit */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-navy/10 flex items-center justify-center">
                <span className="font-heading text-xl text-navy">D</span>
              </div>
              <h3 className="font-accent text-xs uppercase tracking-widest text-charcoal/50 mb-3">
                Depot de garantie
              </h3>
              <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                1 500 EUR de caution.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="https://checkout.lodgify.com/en/lavillabouyssou/509517/reservation?currency=EUR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-terracotta hover:bg-terracotta/90 text-white font-accent text-sm uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Reserver maintenant
          </a>
        </motion.div>
      </div>
    </section>
  );
}

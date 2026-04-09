'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ArrowUpDown } from 'lucide-react';
import { caves } from '@/data/caves';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

export default function CavesPage() {
  const [sortByDistance, setSortByDistance] = useState(true);

  const sortedCaves = [...caves].sort((a, b) =>
    sortByDistance ? a.distance - b.distance : a.name.localeCompare(b.name)
  );

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="relative py-20 px-6 bg-navy">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/travel-guide"
            className="inline-flex items-center gap-2 text-peach hover:text-peach/80 font-accent text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Guide de voyage
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4"
          >
            Exploration des Profondeurs : Les Grottes et Gouffres du Perigord Noir
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-cream/80 max-w-3xl leading-relaxed"
          >
            Le Perigord Noir cache sous ses collines un monde souterrain extraordinaire. Des
            peintures prehistoriques de Lascaux aux cathedrales de cristal de Proumeyssac,
            explorez des grottes et gouffres qui temoignent de millions d&apos;annees d&apos;histoire
            geologique et humaine.
          </motion.p>
        </div>
      </section>

      {/* Sort + Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Sort control */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setSortByDistance(!sortByDistance)}
            className="inline-flex items-center gap-2 font-accent text-sm text-navy hover:text-peach transition-colors bg-white px-4 py-2 rounded-full shadow-sm"
          >
            <ArrowUpDown className="w-4 h-4" />
            {sortByDistance ? 'Tri par distance' : 'Tri par nom'}
          </button>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedCaves.map((cave) => (
            <motion.div
              key={cave.id}
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image area */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-forest/10 to-navy/10">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-body text-sm text-charcoal/40 text-center px-4">
                    {cave.imagePlaceholder}
                  </span>
                </div>
                {/* Distance badge */}
                <div className="absolute top-3 right-3 bg-peach text-white font-accent text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {cave.distance} km
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-xl text-charcoal mb-2">
                  {cave.name}
                </h3>
                <p className="font-body text-sm text-charcoal/60 mb-3">
                  {cave.taglineKey}
                </p>
                {cave.website && (
                  <a
                    href={`https://${cave.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-accent text-sm text-terracotta hover:text-terracotta/80 transition-colors"
                  >
                    Visiter le site
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}

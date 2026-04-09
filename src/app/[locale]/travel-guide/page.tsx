'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Castle, Trees, Mountain, Flower2, UtensilsCrossed, Baby } from 'lucide-react';

const categories = [
  {
    title: 'Villages',
    href: '/travel-guide/villages',
    image: '/images/guide/villages.jpg',
    icon: Trees,
    comingSoon: false,
  },
  {
    title: 'Chateaux',
    href: '/travel-guide/castles',
    image: '/images/guide/castles.jpg',
    icon: Castle,
    comingSoon: false,
  },
  {
    title: 'Grottes & Gouffres',
    href: '/travel-guide/caves',
    image: '/images/guide/caves.jpg',
    icon: Mountain,
    comingSoon: false,
  },
  {
    title: 'Jardins',
    href: '/travel-guide/gardens',
    image: '/images/guide/gardens.jpg',
    icon: Flower2,
    comingSoon: false,
  },
  {
    title: 'Restaurants',
    href: '#',
    image: '/images/guide/restaurants.jpg',
    icon: UtensilsCrossed,
    comingSoon: true,
  },
  {
    title: 'Activites Enfants',
    href: '#',
    image: '/images/guide/kids.jpg',
    icon: Baby,
    comingSoon: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function TravelGuidePage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center bg-navy">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream mb-4"
          >
            Guide de voyage du Perigord
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-accent text-lg md:text-xl text-peach mb-8"
          >
            Decouvrez la region, profitez des bonnes adresses !
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-cream/80 max-w-2xl mx-auto leading-relaxed"
          >
            Le Perigord Noir regorge de tresors : villages classes parmi les plus beaux de France,
            chateaux medievaux charges d&apos;histoire, grottes prehistoriques fascinantes et jardins
            d&apos;exception. Laissez-vous guider a travers ces merveilles a decouvrir
            depuis La Villa Bouyssou.
          </motion.p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ perspective: 800 }}
              >
                <Link
                  href={cat.comingSoon ? '#' : cat.href}
                  className={`block ${cat.comingSoon ? 'cursor-default' : ''}`}
                >
                  <motion.div
                    whileHover={
                      cat.comingSoon
                        ? {}
                        : {
                            rotateY: hoveredIndex === index ? 5 : 0,
                            rotateX: hoveredIndex === index ? -3 : 0,
                            scale: 1.03,
                          }
                    }
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative overflow-hidden rounded-2xl shadow-lg group"
                  >
                    {/* Image placeholder area */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-navy/10 to-forest/20 flex items-center justify-center">
                      <Icon
                        className={`w-16 h-16 ${
                          cat.comingSoon ? 'text-charcoal/20' : 'text-navy/30 group-hover:text-peach/60'
                        } transition-colors duration-300`}
                      />
                    </div>

                    {/* Title overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent p-4 pt-12">
                      <h3 className="font-heading text-xl md:text-2xl text-cream">
                        {cat.title}
                      </h3>
                    </div>

                    {/* Coming soon badge */}
                    {cat.comingSoon && (
                      <div className="absolute top-3 right-3 bg-peach text-white font-accent text-xs px-3 py-1 rounded-full">
                        Bientot
                      </div>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </main>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const collageImages = [
  { src: "/images/collage/piscine-arbre.jpg", alt: "Piscine avec arbre", className: "col-span-2 row-span-2" },
  { src: "/images/collage/canape-moderne.png", alt: "Canapé moderne", className: "col-span-1 row-span-1" },
  { src: "/images/collage/exterieur-villa.jpg", alt: "Extérieur villa", className: "col-span-1 row-span-1" },
];

export default function BrandingCollage() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 grid-rows-2 gap-4 md:gap-6 h-[500px] md:h-[700px]">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-1 row-span-1 bg-navy rounded-2xl flex items-center justify-center"
          >
            <div className="w-24 h-24 rounded-full border-2 border-peach flex items-center justify-center">
              <span className="font-heading text-5xl text-peach font-semibold">
                B
              </span>
            </div>
          </motion.div>

          {collageImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.15, duration: 0.8 }}
              className={`relative rounded-2xl overflow-hidden ${img.className}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

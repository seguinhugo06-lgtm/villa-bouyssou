"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const exteriorImages = [
  { src: "/images/exterior/ext-1.jpg", alt: "Extérieur villa" },
  { src: "/images/exterior/ext-2.jpg", alt: "Piscine" },
  { src: "/images/exterior/ext-3.jpg", alt: "Entrée villa" },
  { src: "/images/exterior/ext-4.jpg", alt: "Jardin" },
  { src: "/images/exterior/ext-5.jpg", alt: "Terrasse" },
  { src: "/images/exterior/ext-6.jpg", alt: "Vue d'ensemble" },
  { src: "/images/exterior/ext-7.jpg", alt: "Jardin paysager" },
  { src: "/images/exterior/ext-8.jpg", alt: "Vue extérieure" },
  { src: "/images/exterior/ext-9.jpg", alt: "Façade" },
  { src: "/images/exterior/ext-10.jpg", alt: "Terrasse et piscine" },
  { src: "/images/exterior/ext-11.jpg", alt: "Détail extérieur" },
  { src: "/images/exterior/ext-12.jpg", alt: "Jardin fleuri" },
  { src: "/images/exterior/ext-13.jpg", alt: "Vue panoramique" },
  { src: "/images/exterior/ext-14.jpg", alt: "Villa au crépuscule" },
];

export default function ExteriorCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <motion.div style={{ x }} className="flex gap-6 pl-6">
        {exteriorImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="relative min-w-[300px] md:min-w-[400px] lg:min-w-[500px] aspect-[3/4] rounded-2xl overflow-hidden flex-shrink-0"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="500px"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="h-[2px] bg-charcoal/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-peach rounded-full"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}

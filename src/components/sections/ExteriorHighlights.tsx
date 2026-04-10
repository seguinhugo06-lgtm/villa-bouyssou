"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ExteriorHighlights() {
  const t = useTranslations("exterior");
  const poolRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: poolProgress } = useScroll({
    target: poolRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: archProgress } = useScroll({
    target: archRef,
    offset: ["start end", "end start"],
  });
  const poolParallaxY = useTransform(poolProgress, [0, 1], [-20, 20]);
  const archParallaxY = useTransform(archProgress, [0, 1], [-20, 20]);

  return (
    <section aria-label="Extérieurs et piscine" className="py-16 md:py-20 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* First block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
          <div>
            <AnimatedText
              text={t("poolDescription")}
              as="p"
              className="font-heading text-xl md:text-3xl lg:text-4xl text-navy font-light leading-relaxed"
            />
          </div>
          <AnimatedSection direction="right">
            <div ref={poolRef} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <motion.div
                style={{ y: poolParallaxY }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src="/images/piscine-exterieur.jpg"
                  alt="Piscine chauffée"
                  fill
                  className="object-cover scale-110 hover:scale-[1.15] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </AnimatedSection>
        </div>

        {/* Second block - reversed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <AnimatedSection direction="left" className="order-2 lg:order-1">
            <div ref={archRef} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <motion.div
                style={{ y: archParallaxY }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src="/images/architecture-villa.jpg"
                  alt="Architecture contemporaine"
                  fill
                  className="object-cover scale-110 hover:scale-[1.15] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </AnimatedSection>
          <div className="order-1 lg:order-2">
            <AnimatedText
              text={t("architectureDescription")}
              as="p"
              className="font-heading text-xl md:text-3xl lg:text-4xl text-navy font-light leading-relaxed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

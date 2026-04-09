"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import AnimatedText from "@/components/ui/AnimatedText";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ExteriorHighlights() {
  const t = useTranslations("exterior");

  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* First block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <AnimatedText
              text={t("poolDescription")}
              as="p"
              className="font-heading text-2xl md:text-3xl lg:text-4xl text-navy font-light leading-relaxed"
            />
          </div>
          <AnimatedSection direction="right">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/piscine-exterieur.jpg"
                alt="Piscine chauffée"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>
        </div>

        {/* Second block - reversed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left" className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/architecture-villa.jpg"
                alt="Architecture contemporaine"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>
          <div className="order-1 lg:order-2">
            <AnimatedText
              text={t("architectureDescription")}
              as="p"
              className="font-heading text-2xl md:text-3xl lg:text-4xl text-navy font-light leading-relaxed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

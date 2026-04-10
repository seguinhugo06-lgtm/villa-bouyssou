"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

const features = [
  { key: "sleeps7to9", icon: "👥", ariaLabel: "Couchages" },
  { key: "heatedPool", icon: "🏊", ariaLabel: "Piscine" },
  { key: "floorAC", icon: "❄️", ariaLabel: "Climatisation" },
  { key: "fiberWifi", icon: "📶", ariaLabel: "Wi-Fi" },
  { key: "parking", icon: "🅿️", ariaLabel: "Parking" },
  { key: "woodFireplace", icon: "🔥", ariaLabel: "Cheminée" },
];

export default function PresentationSection() {
  const t = useTranslations("presentation");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section aria-labelledby="presentation-heading" className="py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image with mask reveal */}
          <AnimatedSection direction="left">
            <div ref={imageRef}>
              <motion.div
                initial={isMobile ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
                whileInView={isMobile ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                className="relative aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden"
              >
                <motion.div
                  style={{ y: parallaxY }}
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src="/images/patio-bleu.png"
                    alt="Patio bleu avec chaise suspendue"
                    fill
                    className="object-cover scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Text content */}
          <div>
            <AnimatedSection>
              <p className="font-accent text-sm text-peach uppercase tracking-[0.2em] mb-4">
                {t("location")}
              </p>
            </AnimatedSection>

            <AnimatedText
              text={t("title")}
              as="h2"
              id="presentation-heading"
              className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-light leading-tight"
              delay={0.2}
            />

            <AnimatedSection delay={0.4}>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xl" role="img" aria-label={feature.ariaLabel}>{feature.icon}</span>
                    <span className="font-body text-sm text-charcoal/80">
                      {t(`features.${feature.key}`)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div className="mt-10">
                <Button href={`/${locale}/la-villa/overview`} variant="outline" aria-label={locale === "fr" ? "En savoir plus sur la Villa Bouyssou" : "Discover more about Villa Bouyssou"}>
                  {t("discoverMore")} →
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

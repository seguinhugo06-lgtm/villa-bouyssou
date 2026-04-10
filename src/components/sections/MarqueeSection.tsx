"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";

export default function MarqueeSection() {
  const t = useTranslations("marquee");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  const text = t("text");
  const repeated = `${text}  ·  ${text}  ·  ${text}  ·  ${text}  ·  `;

  return (
    <section aria-label="Bandeau promotionnel" className="py-12 bg-peach overflow-hidden">
      <div className="marquee whitespace-nowrap">
        <span className="inline-block font-heading text-2xl md:text-3xl text-white font-light">
          {repeated}
        </span>
        <span className="inline-block font-heading text-2xl md:text-3xl text-white font-light">
          {repeated}
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-wrap justify-center gap-4">
        <Button href={`/${locale}/la-villa/overview`} variant="secondary" size="sm">
          {locale === "fr"
            ? "Découvrir tous les équipements"
            : "Discover all amenities"}
        </Button>
        <Button href={`/${locale}/availability`} variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-peach">
          {locale === "fr" ? "Réserver sans frais" : "Book with no fees"}
        </Button>
      </div>
    </section>
  );
}

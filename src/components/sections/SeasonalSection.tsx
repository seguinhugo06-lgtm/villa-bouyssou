"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";

function getSeasonConfig(locale: string) {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed

  if (month >= 9 || month <= 0) {
    // Oct-Jan
    return locale === "fr"
      ? {
          badge: "Offre spéciale",
          title: "Fêtez Noël et le Nouvel An en Périgord",
          description:
            "Profitez de la magie des fêtes dans notre villa avec cheminée à bois, piscine chauffée et proximité des marchés de Noël de Sarlat.",
          cta: "Voir les tarifs Noël",
        }
      : {
          badge: "Special offer",
          title: "Celebrate Christmas and New Year in Périgord",
          description:
            "Enjoy the magic of the holidays in our villa with a wood fireplace, heated pool, and proximity to Sarlat's Christmas markets.",
          cta: "See Christmas rates",
        };
  } else if (month >= 3 && month <= 8) {
    // Apr-Sep
    return locale === "fr"
      ? {
          badge: "Saison estivale",
          title: "Un été inoubliable au bord de la piscine",
          description:
            "Profitez de la piscine chauffée et du jardin privatif pour des vacances en famille ou entre amis au cœur du Périgord.",
          cta: "Réserver votre été",
        }
      : {
          badge: "Summer season",
          title: "An unforgettable summer by the pool",
          description:
            "Enjoy the heated pool and private garden for a family or friends getaway in the heart of Périgord.",
          cta: "Book your summer",
        };
  } else {
    // Feb-Mar
    return locale === "fr"
      ? {
          badge: "Printemps en Périgord",
          title: "Le Périgord s'éveille au printemps",
          description:
            "Découvrez les marchés, les jardins en fleurs et les premiers beaux jours dans notre villa au calme.",
          cta: "Offres de printemps",
        }
      : {
          badge: "Spring in Périgord",
          title: "Périgord awakens in spring",
          description:
            "Discover the markets, blooming gardens, and the first sunny days in our peaceful villa.",
          cta: "Spring offers",
        };
  }
}

export default function SeasonalSection() {
  const t = useTranslations("seasonal");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  const seasonConfig = getSeasonConfig(locale);

  return (
    <section aria-labelledby="seasonal-heading" className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta-text px-5 py-2 rounded-full mb-8"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full bg-terracotta"
          />
          <span className="font-accent text-sm font-medium uppercase tracking-wider">
            {seasonConfig.badge || t("badge")}
          </span>
        </motion.div>

        <AnimatedText
          text={seasonConfig.title || t("title")}
          as="h2"
          id="seasonal-heading"
          className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-light leading-tight"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 font-body text-charcoal/70 max-w-xl mx-auto"
        >
          {seasonConfig.description || t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8"
        >
          <Button href={`/${locale}/prices`}>{seasonConfig.cta || t("cta")} →</Button>
        </motion.div>
      </div>
    </section>
  );
}

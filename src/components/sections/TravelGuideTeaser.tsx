"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";

const categories = [
  { key: "villages", image: "/images/guide/villages.jpg" },
  { key: "castles", image: "/images/guide/chateaux.jpg" },
  { key: "caves", image: "/images/guide/grottes.jpg" },
  { key: "gardens", image: "/images/guide/jardins.jpg" },
];

export default function TravelGuideTeaser() {
  const t = useTranslations("travelGuideTeaser");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <AnimatedText
            text={t("title")}
            as="h2"
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-light"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 font-body text-charcoal/70 max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.key}
              href={`/${locale}/travel-guide/${cat.key}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{
                rotateY: 5,
                rotateX: -5,
                scale: 1.02,
              }}
              style={{ perspective: 800 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={cat.image}
                alt={cat.key}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-heading text-2xl text-white font-medium capitalize">
                  {cat.key === "caves"
                    ? locale === "fr"
                      ? "Grottes"
                      : "Caves"
                    : cat.key === "castles"
                    ? locale === "fr"
                      ? "Châteaux"
                      : "Castles"
                    : cat.key === "villages"
                    ? "Villages"
                    : locale === "fr"
                    ? "Jardins"
                    : "Gardens"}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Button href={`/${locale}/travel-guide`}>
            {t("cta")} →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

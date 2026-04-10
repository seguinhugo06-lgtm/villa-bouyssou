"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MapPin,
  Moon,
  Waves,
  TreePine,
  Thermometer,
  Gamepad2,
  Bed,
  Flame,
  Wifi,
  WashingMachine,
} from "lucide-react";

const amenityIcons = [
  { key: "cityCenter", Icon: MapPin },
  { key: "relaxingSpace", Icon: Moon },
  { key: "heatedPool", Icon: Waves },
  { key: "surroundingForest", Icon: TreePine },
  { key: "floorAC", Icon: Thermometer },
  { key: "gamesActivities", Icon: Gamepad2 },
  { key: "masterSuite", Icon: Bed },
  { key: "woodFireplace", Icon: Flame },
  { key: "highSpeedInternet", Icon: Wifi },
  { key: "laundry", Icon: WashingMachine },
];

export default function AmenitiesBanner() {
  const t = useTranslations("amenities");

  return (
    <section className="bg-forest py-14 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {amenityIcons.map(({ key, Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
              }}
              className="flex flex-col items-center text-center group"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-peach/20 transition-colors duration-300"
              >
                <Icon className="w-6 h-6 text-peach" strokeWidth={1.5} />
              </motion.div>
              <span className="font-accent text-xs font-medium text-white/80 tracking-[0.15em] uppercase leading-tight">
                {t(key)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

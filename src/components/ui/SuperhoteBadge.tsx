"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SuperhoteBadge() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-30 hidden md:block"
        >
          <div className="bg-navy text-white text-sm font-accent font-medium px-4 py-2 rounded-full shadow-lg shadow-navy/20">
            <span role="img" aria-label="Note">★</span> 5.0 — Superhôte Airbnb
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

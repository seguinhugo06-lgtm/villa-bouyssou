"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  id?: string;
};

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
  id,
}: Props) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    return <Tag id={id} className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay + i * 0.04,
      },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <Tag id={id} className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        style={{ display: "inline-flex", flexWrap: "wrap" }}
      >
        {words.map((word, index) => (
          <span key={index}>
            <motion.span
              variants={child}
              className="inline-block will-change-transform"
              style={{ marginRight: "0.25em", willChange: "transform, opacity" }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

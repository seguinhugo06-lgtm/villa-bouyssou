"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
};

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: Props) {
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
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="flex flex-wrap"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="mr-[0.3em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

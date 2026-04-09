"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const variants = {
  primary: "bg-peach text-white hover:bg-peach-dark",
  secondary: "bg-navy text-white hover:bg-navy-light",
  outline: "border-2 border-peach text-peach hover:bg-peach hover:text-white",
};

const sizes = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-3 text-base",
  lg: "px-9 py-4 text-lg",
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: Props) {
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-full font-accent font-medium transition-all duration-300 hover:scale-[1.02] ${variants[variant]} ${sizes[size]} ${className}`;

  const MotionLink = motion.create(Link);

  if (href) {
    return (
      <MotionLink
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
    >
      {children}
    </motion.button>
  );
}

"use client";

import React, { ReactNode } from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  staggerChildren?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 30,
  staggerChildren = 0,
  ...props
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const getInitial = () => {
    if (prefersReducedMotion) return { opacity: 0 };
    switch (direction) {
      case "up":    return { y:  distance, opacity: 0 };
      case "down":  return { y: -distance, opacity: 0 };
      case "left":  return { x:  distance, opacity: 0 };
      case "right": return { x: -distance, opacity: 0 };
      default:      return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: getInitial(),
        visible: {
          x: 0, y: 0, opacity: 1,
          transition: {
            duration: prefersReducedMotion ? 0.2 : duration,
            delay,
            ease: [0.25, 0.1, 0.25, 1] as const,
            staggerChildren: staggerChildren > 0 ? staggerChildren : undefined,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: 0,
    },
  }),
};

const child: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.03,
  once = true,
}: Props) {
  const words = text.split(" ");
  const MotionTag = motion[Tag] as typeof motion.h1;

  return (
    <MotionTag
      className={cn("overflow-hidden", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      custom={stagger}
      variants={container}
      transition={{ delay }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          className="inline-block overflow-hidden align-baseline pb-[0.18em] leading-[0.95]"
          aria-hidden
        >
          <motion.span variants={child} className="inline-block">
            {word}
            {wi < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

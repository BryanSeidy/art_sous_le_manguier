"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function SectionBlock({ title, body }: { title: string; body: string[] }) {
  return (
    <motion.article {...fadeInUp} className="organic-card p-6 md:p-8">
      <h2 className="font-heading text-3xl text-mango">{title}</h2>
      <div className="mt-4 space-y-3 text-cream/85">
        {body.slice(0, 5).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </motion.article>
  );
}

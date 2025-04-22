'use client'
import { motion } from "framer-motion";

export default function FadeInBlock({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      className="transition-all"
    >
      {children}
    </motion.div>
  );
}

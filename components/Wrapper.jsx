"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Wrapper({ children }) {
  return(
    <AnimatePresence>
        {children}
    </AnimatePresence>
  )
}

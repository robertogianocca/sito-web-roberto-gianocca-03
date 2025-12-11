"use client";

import { AnimatePresence, motion } from "motion/react";

export default function VideoContentTransition({ children, videoId }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={videoId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full"
        style={{ willChange: "opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

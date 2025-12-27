// DESKTOP - TITLE AND SUBTITLE

import { motion } from "motion/react";

export default function VideoTitle({ video }) {
  return (
    <motion.div
      key={`title-${video.id}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="hidden lg:flex items-baseline gap-8 mt-3"
    >
      <h2 className="text-xl">{video.title}</h2>
      <h3 className="text-base">{video.subtitle}</h3>
    </motion.div>
  );
}

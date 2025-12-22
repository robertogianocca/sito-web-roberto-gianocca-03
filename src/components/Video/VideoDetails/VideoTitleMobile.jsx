// MOBILE - TITLE AND SUBTITLE

import { motion } from "motion/react";

export default function VideoTitleMobile({ video }) {
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
      className="lg:hidden flex flex-col justify-center tracking-tight pb-4 pt-2"
    >
      <h2 className="text-3xl">{video.title}</h2>
      <h3 className="text-base">{video.subtitle}</h3>
    </motion.div>
  );
}

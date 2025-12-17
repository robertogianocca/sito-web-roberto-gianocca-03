import Link from "next/link";
import { motion } from "motion/react";

export default function LinkButton({ text, url }) {
  return (
    <Link href={url} target="_blank">
      <motion.div
        className="inline-block p-2 bg-sky-800 text-white rounded-xl"
        whileHover={{
          scale: 1.02,
          // transition: { duration: 1 },
        }}
      >
        {text}
      </motion.div>
    </Link>
  );
}

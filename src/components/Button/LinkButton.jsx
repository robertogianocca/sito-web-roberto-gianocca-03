import Link from "next/link";
import { motion } from "motion/react";

export default function LinkButton({ text, url }) {
  return (
    <Link href={url} target="_blank">
      <motion.div
        className="inline-block opacity-50 hover:opacity-70 font-jet-brains underline underline-offset-5"
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

"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { videoDataBase } from "@/data/video-data-base";

export default function VideoThumbnails() {
  const path = usePathname();
  const segments = path.split("/");
  const lastSegment = segments[segments.length - 1];
  console.log(lastSegment); // "sugar-mama"

  const mappedVideo = videoDataBase.map((video, index) => {
    const isSelected = lastSegment === video.id;
    return (
      <motion.div
        key={video.id}
        className="overflow-hidden mb-4 rounded-2xl"
        initial={{ opacity: 0, y: 600 }}
        animate={{ opacity: 1, y: 0 }}
        // whileTap={enableNavigation ? { scale: 0.95 } : undefined}
        whileTap={{ scale: 0.95 }}
        transition={{
          duration: 3,
          // delay: index * 0.1, // Stagger delay: 0.1s between each thumbnail
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Link
          href={`/video/${video.id}`}
          className={`relative aspect-video transition-all duration-500 ${
            isSelected ? "filter-none scale-105" : "filter brightness-25 blur-xs scale-102"
          }`}
        >
          <Image src={video.thumbnail} width={1000} height={1000} />
        </Link>
      </motion.div>
    );
  });

  return (
    <motion.div
      className="text-custom-brown"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      {mappedVideo}
    </motion.div>
  );
}

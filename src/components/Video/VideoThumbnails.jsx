"use client";

import { motion } from "motion/react";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { videoDataBase } from "@/data/video-data-base";

export default function VideoThumbnails() {
  const path = useParams();
  const url = path.id;
  const mappedVideo = videoDataBase.map((video, index) => {
    const isSelected = url === video.id || (!url && index === 0);

    return (
      <motion.div
        key={video.id}
        className="mb-4 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // whileTap={enableNavigation ? { scale: 0.95 } : undefined}
        // whileTap={{ scale: 0.95 }}
        transition={{
          duration: 2,
          // Stagger delay: 0.1s between each thumbnail
          delay: 0.3 + index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Link href={`/video/${video.id}`}>
          <Image
            src={video.thumbnail}
            draggable={false}
            width={1000}
            height={1000}
            alt={`${video.id}-thumbnail`}
            className={`transition-all duration-300 ${
              isSelected ? "scale-105" : "brightness-25 hover:brightness-65 hover:scale-102"
            } `}
          />
        </Link>
      </motion.div>
    );
  });

  return mappedVideo;
}

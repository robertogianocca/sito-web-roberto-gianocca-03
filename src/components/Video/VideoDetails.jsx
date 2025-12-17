"use client";

import { videoDataBase } from "@/data/video-data-base";
import Player from "@/components/Video/Player";
import { motion } from "motion/react";

export default function VideoDetails({ videoId = "sugar-mama" }) {
  // Find the video by matching the id property
  const foundVideo = videoDataBase.find((video) => video.id === videoId);

  // This should not happen if notFound() is called in the page,
  // but keeping as a safety check
  if (!foundVideo) {
    return (
      <div className="w-200 p-10 bg-slate-600 rounded-2xl mx-auto">
        <h1 className="text-2xl mb-10">Details</h1>
        <p className="text-red-400">Video not found</p>
      </div>
    );
  }

  return (
    <>
      {/* ==================== MOBILE - TITLE AND SUBTITLE ==================== */}
      <motion.div
        key={`title-${foundVideo.id}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="lg:hidden flex flex-col justify-center text-credits font-jet-brains tracking-tight"
      >
        <h2 className="text-xs">{foundVideo.title}</h2>
        <h3 className="text-xs">{foundVideo.subtitle}</h3>
      </motion.div>
      <Player video={foundVideo} />
      {/* ==================== DESKTOP - TITLE AND SUBTITLE ==================== */}
      <motion.div
        key={`title-${foundVideo.id}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="hidden lg:flex items-baseline gap-8 mt-3 text-credits"
      >
        <h2 className="text-3xl">{foundVideo.title}</h2>
        <h3 className="text-base">{foundVideo.subtitle}</h3>
      </motion.div>
      <div>{foundVideo.credits}</div>
      <div>{foundVideo.links}</div>
      <div>{foundVideo.description}</div>
    </>
  );
}

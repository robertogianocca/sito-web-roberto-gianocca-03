"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { videoDataBase } from "@/data/video-data-base";
import Player from "@/components/Video/Player";
import VideoTitle from "@/components/Video/VideoDetails/VideoTitle";
import VideoTitleMobile from "@/components/Video/VideoDetails/VideoTitleMobile";

export default function VideoDetails({ videoId = "sugar-mama" }) {
  // Find the video by matching the id property
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const playerContainerRef = useRef(null);
  const video = videoDataBase.find((video) => video.id === videoId);

  // This should not happen if notFound() is called in the page,
  // but keeping as a safety check
  if (!video) {
    return (
      <div className="w-200 p-10 bg-slate-600 rounded-2xl mx-auto">
        <h1 className="text-2xl mb-10">Details</h1>
        <p className="text-red-400">Video not found</p>
      </div>
    );
  }

  function enterPlayer() {
    // Scroll to player container below credits
    if (playerContainerRef.current) {
      playerContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Trigger autoplay after a short delay to ensure scroll and player are ready
      setTimeout(() => {
        setShouldAutoplay(true);
      }, 500);
    }
  }

  return (
    <>
      {/* ==================== MOBILE - TITLE AND SUBTITLE ==================== */}

      {/* Desktop Player - shown at top */}
      <div className="hidden lg:block">
        <Player video={video} />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <Image
          src="/video/sugar-mama/sugar-mama-cover.webp"
          width={3840}
          height={3840}
          className="aspect-retro object-cover"
          alt=""
        />
        <button
          onClick={enterPlayer}
          className="bg-red-200 p-2 text-2xl inline-block w-30 rounded-2xl"
        >
          Play
        </button>
        <VideoTitleMobile video={video} />

        {/* Credits */}
        <div>{video.credits}</div>

        {/* Player below credits on mobile */}
        <div ref={playerContainerRef} id="video-player-mobile">
          <Player video={video} autoplay={shouldAutoplay} />
        </div>
      </div>

      {/* ==================== DESKTOP - TITLE AND SUBTITLE ==================== */}
      <VideoTitle video={video} />
      <div>{video.credits}</div>
      <div>{video.links}</div>
      <div>{video.description}</div>
    </>
  );
}

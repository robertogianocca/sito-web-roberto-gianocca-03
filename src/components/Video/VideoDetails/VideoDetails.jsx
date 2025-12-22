"use client";

import { useRef } from "react";
import { videoDataBase } from "@/data/video-data-base";
import Player from "@/components/Video/Player";
import VideoTitle from "@/components/Video/VideoDetails/VideoTitle";
import VideoTitleMobile from "@/components/Video/VideoDetails/VideoTitleMobile";

export default function VideoDetails({ videoId = "sugar-mama" }) {
  const playerRef = useRef(null);

  // Find the video by matching the id property
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

  const handlePlayClick = () => {
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="">
        <video width="720" height="1280" autoPlay loop muted playsInline className="lg:hidden">
          <source src="/video/video-sugar-cover.mp4" type="video/mp4" />
        </video>
        {/* Play Button */}
        <button
          onClick={handlePlayClick}
          className="lg:hidden mt-4 w-full py-4 px-6 bg-black/80 hover:bg-black/90 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg font-medium"
          aria-label="Play video"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
          Play Video
        </button>
        <div ref={playerRef}>
          <VideoTitleMobile video={video} />
          {/* ==================== MOBILE - TITLE AND SUBTITLE ==================== */}
        </div>
      </div>

      <Player video={video} />

      {/* ==================== DESKTOP - TITLE AND SUBTITLE ==================== */}
      <VideoTitle video={video} />
      <div>{video.credits}</div>
      <div>{video.links}</div>
      <div>{video.description}</div>
    </>
  );
}

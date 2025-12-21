"use client";

import { videoDataBase } from "@/data/video-data-base";
import Player from "@/components/Video/Player";
import VideoTitle from "@/components/Video/VideoDetails/VideoTitle";
import VideoTitleMobile from "@/components/Video/VideoDetails/VideoTitleMobile";

export default function VideoDetails({ videoId = "sugar-mama" }) {
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

  return (
    <>
      <VideoTitleMobile video={video} />
      {/* ==================== MOBILE - TITLE AND SUBTITLE ==================== */}
      <Player video={video} />
      {/* ==================== DESKTOP - TITLE AND SUBTITLE ==================== */}
      <VideoTitle video={video} />
      <div>{video.credits}</div>
      <div>{video.links}</div>
      <div>{video.description}</div>
    </>
  );
}

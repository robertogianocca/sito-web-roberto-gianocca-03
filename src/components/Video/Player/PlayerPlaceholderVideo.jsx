"use client";

import { useState } from "react";
import Image from "next/image";

export default function PlayerPlaceholderVideo() {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  // Show video until it ends, then fade it out
  const opacity = videoEnded ? "opacity-0" : "opacity-100";

  return (
    <div className={`relative transition-opacity duration-900 z-40 pointer-events-none ${opacity}`}>
      {/* Video layer */}
      <div className="absolute inset-0 aspect-video z-40">
        <div className="relative w-full h-full overflow-hidden">
          {/* Fallback image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/video/sugar-mama/sugar-mama-cover.webp"
              fill
              className="object-cover"
              alt="cover"
              sizes="100vw"
              priority
            />
          </div>
          {/* Video element */}
          <video
            src="/video/video-sugar-cover-horiz.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="relative w-full h-full object-cover z-10"
          />
        </div>
      </div>
    </div>
  );
}

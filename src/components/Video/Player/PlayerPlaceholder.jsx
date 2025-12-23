"use client";

import Image from "next/image";

export default function PlayerPlaceholder({ cover, isReady }) {
  return (
    <div
      className={`relative transition-all duration-900 z-40 pointer-events-none ${
        isReady ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Image layer behind */}
      <div className="absolute inset-0 aspect-video z-40">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={cover}
            fill
            className="object-cover filter blur-sm scale-101"
            alt="cover"
            sizes="200px"
            priority
          />
        </div>
      </div>
    </div>
  );
}


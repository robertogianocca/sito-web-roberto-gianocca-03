"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./VerticalThumbnailList.css";

export default function VerticalThumbnailList({ images = [] }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Keep refs in sync with images length
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, images.length);
  }, [images.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const containerRect = container.getBoundingClientRect();
        const centerY = containerRect.top + containerRect.height / 2;

        let closestIndex = focusedIndex;
        let closestDistance = Infinity;

        itemRefs.current.forEach((item, index) => {
          if (!item) return;

          const rect = item.getBoundingClientRect();
          const itemCenterY = rect.top + rect.height / 2;
          const distance = Math.abs(itemCenterY - centerY);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        // Early bailout to avoid unnecessary state updates
        if (closestIndex !== focusedIndex) {
          setFocusedIndex(closestIndex);
        }
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [images, focusedIndex]);

  return (
    <div
      ref={containerRef}
      className="verticalThumbnailContainer h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      <div className="flex flex-col items-center">
        {/* Top spacer */}
        <div className="h-[50vh] flex-shrink-0" />

        {images.map((image, index) => {
          const distance = Math.abs(index - focusedIndex);
          const maxDistance = 2;
          const normalized = Math.min(distance / maxDistance, 1);

          const opacity = Math.max(0.3, 1 - normalized * 0.7);
          const blur = normalized * 8;
          const brightness = Math.max(0.4, 1 - normalized * 0.6);
          const scale = Math.max(0.85, 1 - normalized * 0.15);

          return (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="snap-center snap-always flex-shrink-0 w-full max-w-sm px-4 my-4 transition-all duration-300 ease-out"
              style={{
                opacity,
                filter: `blur(${blur}px) brightness(${brightness})`,
                transform: `scale(${scale})`,
                willChange: "opacity, filter, transform",
              }}
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={image.src || image}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 400px"
                  priority={index === 0}
                />
              </div>
            </div>
          );
        })}

        {/* Bottom spacer */}
        <div className="h-[50vh] flex-shrink-0" />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./VerticalThumbnailList.css";

export default function VerticalThumbnailList({ images = [] }) {
  const containerRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(itemCenterY - centerY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setFocusedIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [images]);

  return (
    <div
      ref={containerRef}
      className="verticalThumbnailContainer h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >

      <div className="flex flex-col items-center">
        {/* Top spacer to center first item */}
        <div className="h-[50vh] flex-shrink-0" />
        
        {images.map((image, index) => {
          const distance = Math.abs(index - focusedIndex);
          const maxDistance = 2;
          const normalizedDistance = Math.min(distance / maxDistance, 1);
          
          // Opacity: 1 at center, decreasing as distance increases
          const opacity = Math.max(0.3, 1 - normalizedDistance * 0.7);
          
          // Blur: 0 at center, increasing as distance increases
          const blur = normalizedDistance * 8;
          
          // Brightness: 1 at center, decreasing as distance increases (darker)
          const brightness = Math.max(0.4, 1 - normalizedDistance * 0.6);
          
          // Scale: 1 at center, slightly smaller as distance increases
          const scale = Math.max(0.85, 1 - normalizedDistance * 0.15);

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
        
        {/* Bottom spacer to center last item */}
        <div className="h-[50vh] flex-shrink-0" />
      </div>
    </div>
  );
}


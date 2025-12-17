"use client";

import { useState } from "react";

export default function ExpandableText({ children, className = "", maxLines = 3 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <p
        className={`${className} ${isExpanded ? "" : "line-clamp-3"}`}
        style={
          isExpanded
            ? {}
            : {
                display: "-webkit-box",
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
        }
      >
        {children}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-amber-300 hover:text-amber-400 underline underline-offset-3 text-xs font-inter"
      >
        {isExpanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}

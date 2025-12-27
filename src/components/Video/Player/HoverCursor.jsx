"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useMediaStore } from "@vidstack/react";
import { PlayIcon, PauseIcon } from "@vidstack/react/icons";

export default function HoverCursor({ containerRef, playerRef, playerColor, onHandlersChange }) {
  const { paused, controlsVisible, fullscreen } = useMediaStore(playerRef);
  const containerRectCache = useRef(null);
  const rafId = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [cursorState, setCursorState] = useState({
    x: 0,
    y: 0,
    isOverControls: false,
    hasMovedInMode: false,
  });

  // Cache container rect on mount and when fullscreen changes
  useEffect(() => {
    const updateContainerRect = () => {
      if (containerRef?.current && !fullscreen) {
        containerRectCache.current = containerRef.current.getBoundingClientRect();
      } else {
        containerRectCache.current = null;
      }
    };

    updateContainerRect();
    window.addEventListener("resize", updateContainerRect);

    return () => window.removeEventListener("resize", updateContainerRect);
  }, [fullscreen, containerRef]);

  // Calculate cursor position and controls detection
  const calculateCursorState = useCallback(
    (e) => {
      if (!isHovering) return null;

      let x, y, containerHeight;

      if (fullscreen) {
        // In fullscreen mode
        x = e.clientX;
        y = e.clientY;
        containerHeight = window.innerHeight;
      } else {
        // In normal mode, use cached rect
        const rect = containerRectCache.current;
        if (!rect) return null;

        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        containerHeight = rect.height;
      }

      // Bottom 20% is controls area
      const controlsThreshold = containerHeight * 0.8;
      const isOverControls = y > controlsThreshold;

      return { x, y, isOverControls, hasMovedInMode: true };
    },
    [isHovering, fullscreen]
  );

  // Optimized mouse move handler with requestAnimationFrame
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isHovering) return;

      // Cancel any pending animation frame
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Schedule update for next frame
      rafId.current = requestAnimationFrame(() => {
        const newState = calculateCursorState(e);
        if (newState) {
          setCursorState(newState);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isHovering, calculateCursorState]);

  // Reset state when entering/exiting fullscreen
  useEffect(() => {
    const timer = setTimeout(() => {
      setCursorState((prev) => ({
        ...prev,
        isOverControls: false,
        hasMovedInMode: false,
      }));
    }, 100);

    return () => clearTimeout(timer);
  }, [fullscreen]);

  const showCustomCursor =
    isHovering && controlsVisible && !cursorState.isOverControls && cursorState.hasMovedInMode;

  const cursorStyle = cursorState.isOverControls ? "auto" : "none";

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  // Notify parent of handlers and cursor style changes
  useEffect(() => {
    if (onHandlersChange) {
      onHandlersChange({
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        cursorStyle,
      });
    }
  }, [onHandlersChange, handleMouseEnter, handleMouseLeave, cursorStyle]);

  if (!showCustomCursor) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute z-50 transition-opacity duration-200"
      style={{
        left: `${cursorState.x}px`,
        top: `${cursorState.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="flex items-center justify-center rounded-full p-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        }}
      >
        {paused ? (
          <PlayIcon
            className="vds-icon"
            size={40}
            style={{ color: playerColor.playButtonText }}
          />
        ) : (
          <PauseIcon
            className="vds-icon"
            size={40}
            style={{ color: playerColor.playButtonText }}
          />
        )}
      </div>
    </div>
  );
}

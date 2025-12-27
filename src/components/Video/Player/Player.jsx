"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { MediaPlayer, MediaProvider, Gesture, Controls, useMediaStore } from "@vidstack/react";
import { PlayIcon, PauseIcon } from "@vidstack/react/icons";
import PlayerPlaceholderVideo from "./PlayerPlaceholderVideo";
import ControlsBackground from "./ControlsBackground";
import CustomPlayButton from "./CustomPlayButton";
import CustomFullscreenButton from "./CustomFullscreenButton";
import VolumeControl from "./VolumeControl";
import TimeDisplay from "./TimeDisplay";
import VideoTimeSlider from "./VideoTimeSlider";

export default function Player({ video }) {
  const src = {
    src: `vimeo/${video.vimeoId}`,
    type: "video/vimeo",
  };

  const player = useRef(null);
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const containerRectCache = useRef(null);
  const rafId = useRef(null);

  const { canPlay, paused, controlsVisible, fullscreen } = useMediaStore(player);
  const isReady = canPlay;

  const [isHovering, setIsHovering] = useState(false);
  const [cursorState, setCursorState] = useState({
    x: 0,
    y: 0,
    isOverControls: false,
    hasMovedInMode: false,
  });

  const playerColor = {
    playButtonBg: "white",
    playButtonText: "black",
    icons: "white",
    backBar: "grey",
    timeBar: "white",
    progressBar: "grey",
    volumeDot: "white",
  };

  // Cache container rect on mount and when fullscreen changes
  useEffect(() => {
    const updateContainerRect = () => {
      if (containerRef.current && !fullscreen) {
        containerRectCache.current = containerRef.current.getBoundingClientRect();
      } else {
        containerRectCache.current = null;
      }
    };

    updateContainerRect();
    window.addEventListener("resize", updateContainerRect);

    return () => window.removeEventListener("resize", updateContainerRect);
  }, [fullscreen]);

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

  return (
    <>
      <PlayerPlaceholderVideo />
      <div className="flex">
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ cursor: cursorStyle }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <MediaPlayer
            viewType="video"
            key={video.id}
            aspectRatio="16/9"
            ref={player}
            src={src}
            playsInline
            style={{ cursor: cursorStyle }}
          >
            <MediaProvider />
            <Gesture
              event="click"
              action="toggle:paused"
              className="absolute inset-0"
              aria-hidden="false"
            />
            <Gesture className="vds-gesture" event="pointerup" action="toggle:controls" />
            <Controls.Root className="vds-controls justify-end" ref={controlsRef}>
              <ControlsBackground />
              <Controls.Group className="vds-controls-group ">
                <div className="buttons-bar flex flex-row justify-between px-3 pb-1.5">
                  <div className="flex flex-row items-center">
                    <CustomPlayButton playerColor={playerColor} />
                    <CustomFullscreenButton playerColor={playerColor} />
                    <VolumeControl playerColor={playerColor} />
                  </div>
                  <div className="flex flex-row items-center">
                    <TimeDisplay playerColor={playerColor} />
                  </div>
                </div>
                <VideoTimeSlider playerColor={playerColor} />
              </Controls.Group>
            </Controls.Root>

            {/* Custom Cursor */}
            {showCustomCursor && (
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
            )}
          </MediaPlayer>
        </div>
      </div>
    </>
  );
}

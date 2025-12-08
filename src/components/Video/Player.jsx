"use client";

import { useState, useEffect } from "react";
import {
  MediaPlayer,
  MediaProvider,
  Controls,
  MuteButton,
  VolumeSlider,
  TimeSlider,
  Time,
  useMediaState,
} from "@vidstack/react";

import {
  MuteIcon,
  VolumeLowIcon,
  VolumeHighIcon,
  FullscreenIcon,
  FullscreenExitIcon,
} from "@vidstack/react/icons";

export default function Player() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const src = {
    src: `vimeo/917201659}`,
    // src: `vimeo/${vimeoId ?? "917201659"}`,
    type: "video/vimeo",
  };

  // Lock body scroll when in fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  function VolumeControls() {
    const volume = useMediaState("volume");
    const isMuted = useMediaState("muted");

    return (
      <>
        {/* Mute Button - visible on all devices */}
        <MuteButton className="group flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white hover:bg-white/10">
          {isMuted || volume === 0 ? (
            <MuteIcon className="h-5 w-5" />
          ) : volume < 0.5 ? (
            <VolumeLowIcon className="h-5 w-5" />
          ) : (
            <VolumeHighIcon className="h-5 w-5" />
          )}
        </MuteButton>

        {/* Volume Slider - hidden on mobile, visible on desktop (md and up) */}
        <div className="hidden md:block">
          <VolumeSlider.Root className="vds-volume-slider vds-slider group w-40">
            <VolumeSlider.Track className="vds-slider-track">
              <VolumeSlider.TrackFill className="vds-slider-track-fill" />
            </VolumeSlider.Track>
            <VolumeSlider.Thumb className="vds-slider-thumb" />
          </VolumeSlider.Root>
        </div>
      </>
    );
  }

  function CustomFullscreenButton() {
    return (
      <button
        onClick={toggleFullscreen}
        className="group flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white hover:bg-white/10"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? (
          <FullscreenExitIcon className="h-5 w-5" />
        ) : (
          <FullscreenIcon className="h-5 w-5" />
        )}
      </button>
    );
  }

  return (
    <div
      className={`${
        isFullscreen
          ? "fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          : "w-full max-w-4xl mx-auto"
      } transition-all duration-300`}
    >
      <div
        className={`${
          isFullscreen
            ? "w-full h-full flex items-center justify-center p-2 sm:p-4"
            : "w-full aspect-video"
        } relative`}
      >
        <MediaPlayer
          src={src}
          playsInline
          className={`${
            isFullscreen ? "w-full h-full max-w-full max-h-full" : "w-full h-full"
          }`}
        >
          <MediaProvider />
          {/* Controls with auto-hide - hideDelay in milliseconds */}
          <Controls.Root
            className="vds-controls absolute inset-0 z-10 flex flex-col items-start opacity-100 transition-opacity duration-300 pointer-events-none"
            hideDelay={2000}
          >
            {/* Spacer to push controls to bottom - allows clicks through to Gesture */}
            <div className="flex-1" />

            {/* Bottom Control Bar - pointer-events-auto to block Gesture clicks */}
            <div
              className="w-full px-4 pb-4 pt-10 flex flex-col gap-2 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Time Slider */}
              <TimeSlider.Root className="vds-time-slider vds-slider w-full">
                <TimeSlider.Track className="vds-slider-track">
                  <TimeSlider.TrackFill className="vds-slider-track-fill" />
                  <TimeSlider.Progress className="vds-slider-progress" />
                </TimeSlider.Track>
                <TimeSlider.Thumb className="vds-slider-thumb" />
                <TimeSlider.Preview className="vds-slider-preview">
                  <TimeSlider.Value className="vds-slider-value" />
                </TimeSlider.Preview>
              </TimeSlider.Root>

              {/* Control Buttons Row */}
              <div className="flex items-center justify-between gap-3">
                {/* Left: Volume controls */}
                <div className="flex items-center gap-2 flex-1">
                  <VolumeControls />
                </div>

                {/* Center: Time display */}
                <div className="flex items-center gap-1 text-white font-medium select-none">
                  <Time type="current" className="time" />
                  <span className="text-white/60">/</span>
                  <Time type="duration" className="time text-white/60" />
                </div>

                {/* Right: Fullscreen button */}
                <div className="flex items-center flex-1 justify-end">
                  <CustomFullscreenButton />
                </div>
              </div>
            </div>
          </Controls.Root>
        </MediaPlayer>
      </div>
    </div>
  );
}

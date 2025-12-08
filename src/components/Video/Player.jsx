"use client";

import {
  MediaPlayer,
  MediaProvider,
  Gesture,
  Controls,
  PlayButton,
  MuteButton,
  VolumeSlider,
  TimeSlider,
  Time,
  FullscreenButton,
  useMediaState,
} from "@vidstack/react";

import {
  PlayIcon,
  PauseIcon,
  MuteIcon,
  VolumeLowIcon,
  VolumeHighIcon,
  FullscreenIcon,
  FullscreenExitIcon,
} from "@vidstack/react/icons";

export default function Player() {
  const src = {
    src: `vimeo/917201659}`,
    // src: `vimeo/${vimeoId ?? "917201659"}`,
    type: "video/vimeo",
  };

  return (
    <div className="w-full lg:w-2/3 mt-20 mx-auto">
      <MediaPlayer src={src} playsInline controlsDelay={1000}>
        <MediaProvider />
        <CenterPlayButton />
        {/* Controls with auto-hide - hideDelay in milliseconds */}
        <Controls.Root
          className="vds-controls absolute inset-0 z-10 h-full w-full flex flex-col bg-linear-to-t from-black/20 to-transparent data-visible:opacity-100  opacity-0 transition-opacity pointer-events-none"
          hideDelay={1000}
          hideOnMouseLeave="true"
        >
          {/* <Controls.Root
          className="vds-controls absolute inset-0 z-10 flex flex-col items-start  pointer-events-none"
          hideDelay={1000}
          hideOnMouseLeave="true"
        > */}
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
                <FullscreenButtonWithIcon />
              </div>
            </div>
          </div>
        </Controls.Root>
      </MediaPlayer>
    </div>
  );
}

/* =======================================================================
FUNCTIONS
========================================================================= */

// CenterPlayButton - Must be inside MediaPlayer to use useMediaState

function CenterPlayButton() {
  const isPaused = useMediaState("paused");

  return (
    // Versione Base

    // <PlayButton className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white">
    //   {isPaused ? <PlayIcon className="h-7 w-7 ml-0.5" /> : <PauseIcon className="h-7 w-7" />}
    // </PlayButton>
    <PlayButton className="vds-play-button absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white">
      {isPaused ? <PlayIcon className="h-15 w-15 ml-0.5" /> : <PauseIcon className="h-7 w-7" />}
    </PlayButton>
  );
}

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

function FullscreenButtonWithIcon() {
  const isFullscreen = useMediaState("fullscreen");

  return (
    <FullscreenButton
      className="group flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white hover:bg-white/10"
      target="prefer-media"
    >
      {isFullscreen ? (
        <FullscreenExitIcon className="h-5 w-5" />
      ) : (
        <FullscreenIcon className="h-5 w-5" />
      )}
    </FullscreenButton>
  );
}

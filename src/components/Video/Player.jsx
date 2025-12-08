"use client";

import { useRef } from "react";

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
  useMediaStore,
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

  const player = useRef(null);

  const { paused, volume, muted, fullscreen, controlsHidden, onPlay } = useMediaStore(player);
  const isPaused = paused;
  console.log(onPlay);

  return (
    <div className="w-full lg:w-2/3 mt-20 mx-auto">
      <MediaPlayer ref={player} src={src} playsInline crossOrigin>
        <MediaProvider />
        {/* Gesture: click on surface toggles play/pause */}
        {/* <Gesture event="pointerup" action="toggle:paused" className="absolute inset-0 z-0" /> */}

        {/* Show/hide controls for mobile: single tap toggles controls visible */}

        {/* <Gesture event="pointerup" action="toggle:user-idle" /> */}

        {/* <Gesture className="vds-gesture" event="pointerup" action="toggle:controls" /> */}
        {/* <Gesture className="vds-gesture" event="touchstart" action="toggle:controls" /> */}
        <Gesture className="vds-gesture" />

        {/* Controls with auto-hide - hideDelay in milliseconds */}

        <Controls.Root
          //I due attributi sono collegati direttamente ad un'animazione CSS e non funzionano indipendentemente

          hideDelay={2000}
          hideOnMouseLeave={true}
          className="vds-controls data-fullscreen:bg-amber-400 absolute inset-0 z-10 justify-end h-full w-full flex flex-col bg-linear-to-t from-black/20 to-transparent data-visible:opacity-100 easy-out duration-400 opacity-0 transition-opacity pointer-events-none bg-gradient-to-t from-black/90 via-black/60 to-transparent"
        >
          {/* versione 01 */}

          {/* <Controls.Root className="vds-controls absolute inset-0 z-10 h-full w-full flex flex-col bg-linear-to-t from-black/20 to-transparent data-visible:opacity-100 easy-out duration-400 opacity-0 transition-opacity transition-pointer-events-none"> */}

          {/* versione 00 */}

          {/* <Controls.Root
          className="vds-controls absolute inset-0 z-10 flex flex-col items-start  pointer-events-none"
          hideDelay={1000}
          hideOnMouseLeave="true"
          
          > */}
          <Controls.Group className="vds-controls-play">
            <CenterPlayButton />
          </Controls.Group>
          {/* Barra di controllo - bottoni + time slider */}
          <Controls.Group
            className="vds-controls-bar w-full flex flex-col pointer-events-auto items"
            onClick={(e) => e.stopPropagation()}
          >
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

            {/* Time Slider */}

            <TimeSlider.Root className="vds-time-slider vds-slider">
              <TimeSlider.Track className="vds-slider-track">
                <TimeSlider.TrackFill className="vds-slider-track-fill" />
                <TimeSlider.Progress className="vds-slider-progress" />
              </TimeSlider.Track>
              <TimeSlider.Thumb className="vds-slider-thumb" />
              <TimeSlider.Preview className="vds-slider-preview">
                <TimeSlider.Value className="vds-slider-value" />
              </TimeSlider.Preview>
            </TimeSlider.Root>
          </Controls.Group>
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
  const paused = useMediaState("paused");

  return (
    // Versione Base

    // <PlayButton className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white">
    //   {isPaused ? <PlayIcon className="h-7 w-7 ml-0.5" /> : <PauseIcon className="h-7 w-7" />}
    // </PlayButton>

    // <PlayButton className="vds-play-button absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white">
    //   {isPaused ? <PlayIcon className="h-15 w-15 ml-0.5" /> : <PauseIcon className="h-7 w-7" />}
    // </PlayButton>
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      <PlayButton
        className="vds-button vds-play-button pointer-events-auto"
        aria-label={paused ? "Play" : "Pause"}
      >
        {paused ? <PlayIcon /> : <PauseIcon />}
      </PlayButton>
    </div>
  );
}

function VolumeControls() {
  const volume = useMediaState("volume");
  const isMuted = useMediaState("muted");
  const volumeIconDimension = "h-15 w-15";
  return (
    <>
      {/* Mute Button - visible on all devices */}
      <MuteButton className="group flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white hover:bg-white/10">
        {isMuted || volume === 0 ? (
          <MuteIcon className={volumeIconDimension} />
        ) : volume < 0.5 ? (
          <VolumeLowIcon className={volumeIconDimension} />
        ) : (
          <VolumeHighIcon className={volumeIconDimension} />
        )}
      </MuteButton>

      {/* Volume Slider - hidden on mobile, visible on desktop (md and up) */}
      <div className="hidden md:block">
        <VolumeSlider.Root className="vds-volume-slider vds-slider group w-30!">
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

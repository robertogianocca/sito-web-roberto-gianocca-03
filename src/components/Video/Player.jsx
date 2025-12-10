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

export default function Player({ vimeoId }) {
  const src = {
    src: `vimeo/${vimeoId}`,
    type: "video/vimeo",
  };

  const player = useRef(null);

  const { paused, volume, muted, fullscreen, controlsHidden, onPlay } = useMediaStore(player);
  const isPaused = paused;

  return (
    <MediaPlayer ref={player} src={src} playsInline crossOrigin>
      <MediaProvider />

      {/* ====== GESTURES: whole-surface click/double-click ======
            pointerup toggles paused
            dblpointerup toggles fullscreen
            The Gesture element fills the player surface and uses Vidstack's built-in actions.
            (Gesture uses the "action" shorthand like "toggle:paused".)
        */}

      {/* // single click / tap: toggle play/pause */}
      {/* <Gesture
          event="pointerup"
          action="toggle:paused"
          className="absolute inset-0 z-10 pointer-events-none lg:pointer-events-auto"
          aria-hidden="false"
        /> */}

      {/* // double click: toggle fullscreen (optional) */}
      {/* <Gesture
          event="dblpointerup"
          action="toggle:fullscreen"
          className="absolute inset-0 z-20 pointer-events-auto"
          aria-hidden="true"
        /> */}

      <Controls.Root
        hideDelay={2000}
        hideOnMouseLeave={true}
        //I due attributi sono collegati direttamente ad un'animazione CSS e non funzionano indipendentemente
        className="vds-controls data-fullscreen:bg-amber-400 absolute inset-0 z-30 justify-end h-full w-full flex flex-col bg-linear-to-t from-black/20 to-transparent data-visible:opacity-100 easy-out duration-400 opacity-0 transition-opacity pointer-events-none bg-gradient-to-t from-black/90 via-black/60 to-transparent"
      >
        <Controls.Group className="vds-controls-play">
          <CenterPlayButton />
        </Controls.Group>
        {/* ==================== BARRA DI CONTROLLO ==================== */}
        <Controls.Group
          className="vds-controls-bar w-full flex flex-col pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ========== BUTTONS ROW ========== */}
          <div className="flex items-center justify-between gap-3 px-10 py-3 lg:px-20">
            {/* Left: Volume controls */}
            <div className="flex items-center flex-1">
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
  );
}

/* =======================================================================
FUNCTIONS
========================================================================= */

// CenterPlayButton - Must be inside MediaPlayer to use useMediaState

function CenterPlayButton() {
  const paused = useMediaState("paused");

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
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
      <div className="hidden md:flex ">
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
  const fullIconDimension = "h-15 w-15";
  return (
    <FullscreenButton
      className="group flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white hover:bg-white/10"
      target="prefer-media"
    >
      {isFullscreen ? (
        <FullscreenExitIcon className={fullIconDimension} />
      ) : (
        <FullscreenIcon className={fullIconDimension} />
      )}
    </FullscreenButton>
  );
}

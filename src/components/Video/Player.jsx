"use client";

import { useRef } from "react";
import Image from "next/image";

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
    src: `vimeo/1132948199`,
    type: "video/vimeo",
  };

  const player = useRef(null);

  const { paused, canPlay, volume, muted, fullscreen, controlsHidden, onPlay } =
    useMediaStore(player);

  const isPaused = paused;
  const isMuted = muted;
  const isFull = fullscreen;
  const isReady = canPlay;

  const playerColor = {
    icons: "green",
    backBar: "green",
    timeBar: "blue",
    progressBar: "red",
  };

  return (
    <>
      {/* ==================== PLACEHOLDER IMAGE ==================== */}

      <div
        className={`relative transition-all duration-900 z-40 pointer-events-none ${
          isReady ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Red background layer */}
        <div className="absolute inset-0 aspect-video bg-linear-to-t from-black/90 via-black/60 to-transparent  z-50"></div>

        {/* Image layer behind */}
        <div className="absolute inset-0 aspect-video z-40">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/video/sugar-mama/sugar-mama-cover.jpg"
              fill
              className="object-cover filter blur-sm scale-101"
              alt="cover"
              sizes="200px"
              priority
            />
          </div>
        </div>
      </div>
      {/* ============================================================ */}
      {/*                           PLAYER                             */}
      {/* ============================================================ */}
      <div>
        <MediaPlayer key={vimeoId} aspectRatio="16/9" ref={player} src={src} playsInline>
          <MediaProvider />
          <Controls.Root
            // hideDelay={2000}
            // hideOnMouseLeave={true}
            //I due attributi sono collegati direttamente ad un'animazione CSS e non funzionano indipendentemente
            // className="vds-controls absolute inset-0 z-30 justify-end h-full w-full flex flex-col data-visible:opacity-100 easy-out duration-400 opacity-0 transition-opacity pointer-events-none bg-linear-to-t from-black/70 via-black/60 to-transparent"
            className="vds-controls"
          >
            <Controls.Group className="vds-controls-group bg-linear-to-t from-black via-black/80 to-transparent">
              <div className="buttons-bar">
                {/* ========== Left buttons containers ========== */}
                <div className="flex flex-row items-center">
                  <PlayButton className="vds-button" style={{ color: playerColor.icons }}>
                    {isPaused ? (
                      <PlayIcon className="play-icon vds-icon" />
                    ) : (
                      <PauseIcon className="pause-icon vds-icon" />
                    )}
                  </PlayButton>
                  <MuteButton className="vds-button" style={{ color: playerColor.icons }}>
                    {isMuted || volume == 0 ? (
                      <MuteIcon className="mute-icon vds-icon" />
                    ) : volume < 0.5 ? (
                      <VolumeLowIcon className="volume-low-icon vds-icon" />
                    ) : (
                      <VolumeHighIcon className="volume-high-icon vds-icon" />
                    )}
                  </MuteButton>
                  {/* ========== VOLUME SLIDER CONTAINER ========== */}
                  <div className="w-25 hidden md:flex">
                    <VolumeSlider.Root className="vds-slider">
                      <VolumeSlider.Track
                        className="vds-slider-track"
                        style={{ backgroundColor: playerColor.backBar }}
                      />
                      <VolumeSlider.TrackFill
                        className="vds-slider-track-fill vds-slider-track"
                        style={{ backgroundColor: playerColor.timeBar }}
                      />
                      <VolumeSlider.Thumb className="vds-slider-thumb" />
                    </VolumeSlider.Root>
                  </div>
                </div>
                {/* ========== Central times container ========== */}
                <div className="vds-time-group" style={{ color: playerColor.icons }}>
                  <Time className="vds-time" type="current" />
                  <p className="vds-time-divider" style={{ color: playerColor.icons }}>
                    /
                  </p>
                  <Time className="vds-time" type="duration" />
                </div>
                {/* ========== Right buttons containers ========== */}
                <div className="flex flex-row items-center">
                  <FullscreenButton className="vds-button" style={{ color: playerColor.icons }}>
                    {isFull ? (
                      <FullscreenExitIcon className="fs-exit-icon vds-icon" />
                    ) : (
                      <FullscreenIcon className="fs-enter-icon vds-icon" />
                    )}
                  </FullscreenButton>
                </div>
              </div>
              <div className="time-slider">
                <TimeSlider.Root className="vds-time-slider vds-slider">
                  <TimeSlider.Track
                    className="vds-slider-track rounded-none!"
                    style={{ backgroundColor: playerColor.backBar }}
                  />
                  <TimeSlider.TrackFill
                    className="vds-slider-track-fill vds-slider-track rounded-none!"
                    style={{ backgroundColor: playerColor.timeBar }}
                  />
                  <TimeSlider.Progress
                    className="vds-slider-progress vds-slider-track rounded-none!"
                    style={{ backgroundColor: playerColor.progressBar }}
                  />
                  <TimeSlider.Thumb className="vds-slider-thumb" />
                  <TimeSlider.Preview className="vds-slider-preview">
                    <TimeSlider.Value className="vds-slider-value" />
                  </TimeSlider.Preview>
                </TimeSlider.Root>
              </div>
            </Controls.Group>
          </Controls.Root>
        </MediaPlayer>
      </div>
    </>
  );
}

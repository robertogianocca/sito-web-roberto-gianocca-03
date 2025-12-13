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

  return (
    <>
      {/* ============================================================ */}
      {/*                           PLAYER                             */}
      {/* ============================================================ */}
      <div>
        <MediaPlayer key={vimeoId} aspectRatio="16/9" ref={player} src={src} playsInline>
          <MediaProvider />
          <Controls.Root className="vds-controls">
            <Controls.Group className="vds-controls-group">
              <div className="buttons-bar">
                {/* ========== Left buttons containers ========== */}
                <div className="flex flex-row items-center">
                  <PlayButton className="vds-button">
                    {isPaused ? (
                      <PlayIcon className="play-icon vds-icon" />
                    ) : (
                      <PauseIcon className="pause-icon vds-icon" />
                    )}
                  </PlayButton>
                  <MuteButton className="vds-button">
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
                      <VolumeSlider.Track className="vds-slider-track" />
                      <VolumeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                      <VolumeSlider.Thumb className="vds-slider-thumb" />
                    </VolumeSlider.Root>
                  </div>
                </div>
                {/* ========== Central times container ========== */}
                <div className="vds-time-group">
                  <Time className="vds-time" type="current" />
                  <div className="vds-time-divider">/</div>
                  <Time className="vds-time" type="duration" />
                </div>
                {/* ========== Right buttons containers ========== */}
                <div className="flex flex-row items-center">
                  <FullscreenButton className="vds-button">
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
                  <TimeSlider.Track className="vds-slider-track" />
                  <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                  <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />
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

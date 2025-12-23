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

export default function Player({ video }) {
  const src = {
    src: `vimeo/${video.vimeoId}`,
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
    playButtonBg: "white",
    playButtonText: "black",
    icons: "white",
    backBar: "grey",
    timeBar: "white",
    progressBar: "grey",
    volumeDot: "white",
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
        {/* <div className="absolute inset-0 aspect-video bg-linear-to-t from-black/90 via-black/60 to-transparent z-50"></div> */}

        {/* Image layer behind */}
        <div className="absolute inset-0 aspect-video z-40">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={video.cover}
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
      <div className="flex">
        <MediaPlayer
          viewType="video"
          key={video.id}
          aspectRatio="16/9"
          ref={player}
          src={src}
          playsInline
        >
          <MediaProvider />
          <Gesture
            event="click"
            action="toggle:paused"
            className="absolute inset-0"
            aria-hidden="false"
          />
          <Controls.Root className="vds-controls justify-end">
            <div className="w-full h-25 absolute bg-linear-to-t from-black via-black/85 to-transparent"></div>
            <Controls.Group className="vds-controls-group ">
              {/* ==================== BUTTONS CONTAINER ==================== */}
              <div className="buttons-bar flex flex-row justify-between px-3 pb-1.5">
                {/* ========== LEFT BUTTONS CONTAINER ========== */}
                <div className="flex flex-row items-center">
                  {/* ========== PLAY BUTTON ========== */}
                  <PlayButton
                    className="flex w-25 h-8 justify-center items-center rounded-2xl pl-1 pr-3 mr-3 cursor-pointer hover:bg-gray-300!"
                    // style={{ color: playerColor.icons }}
                    style={{
                      color: playerColor.playButtonText,
                      backgroundColor: playerColor.playButtonBg,
                    }}
                  >
                    {isPaused ? (
                      <>
                        <PlayIcon className="play-icon vds-icon" size={30} />
                        <p className="text-base font-bold">Play</p>
                      </>
                    ) : (
                      <>
                        <PauseIcon className="pause-icon vds-icon" size={30} />
                        <p className="text-base font-bold">Pause</p>
                      </>
                    )}
                  </PlayButton>

                  <FullscreenButton className="vds-button" style={{ color: playerColor.icons }}>
                    {isFull ? (
                      <FullscreenExitIcon className="fs-exit-icon vds-icon" />
                    ) : (
                      <FullscreenIcon className="fs-enter-icon vds-icon" />
                    )}
                  </FullscreenButton>
                  {/* ========== Mute Button ========== */}
                  <MuteButton className="vds-button mr-1" style={{ color: playerColor.icons }}>
                    {isMuted || volume == 0 ? (
                      <MuteIcon className="mute-icon vds-icon" />
                    ) : volume < 0.5 ? (
                      <VolumeLowIcon className="volume-low-icon vds-icon" />
                    ) : (
                      <VolumeHighIcon className="volume-high-icon vds-icon" />
                    )}
                  </MuteButton>
                  {/* ========== Volume Slider ========== */}
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
                      <VolumeSlider.Thumb
                        className="vds-slider-thumb opacity-100! border-none!"
                        style={{ backgroundColor: playerColor.volumeDot }}
                      />
                    </VolumeSlider.Root>
                  </div>
                </div>

                {/* ========== RIGHT BUTTONS CONTAINER ========== */}
                <div className="flex flex-row items-center">
                  {/* ========== Time ========== */}
                  <div className="vds-time-group" style={{ color: playerColor.icons }}>
                    <Time className="vds-time" type="current" />
                    <p className="vds-time-divider" style={{ color: playerColor.icons }}>
                      /
                    </p>
                    <Time className="vds-time" type="duration" />
                  </div>
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

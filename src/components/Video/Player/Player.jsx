"use client";

import { useRef } from "react";
import { MediaPlayer, MediaProvider, Gesture, Controls, useMediaStore } from "@vidstack/react";

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

  const { canPlay } = useMediaStore(player);
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
      <PlayerPlaceholderVideo />

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
          <Gesture className="vds-gesture" event="pointerup" action="toggle:controls" />

          <Controls.Root className="vds-controls justify-end">
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
        </MediaPlayer>
      </div>
    </>
  );
}

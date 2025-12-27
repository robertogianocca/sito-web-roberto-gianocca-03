"use client";
import { useRef, useState } from "react";
import { MediaPlayer, MediaProvider, Gesture, Controls, useMediaStore } from "@vidstack/react";
import PlayerPlaceholderVideo from "./PlayerPlaceholderVideo";
import ControlsBackground from "./ControlsBackground";
import CustomPlayButton from "./CustomPlayButton";
import CustomFullscreenButton from "./CustomFullscreenButton";
import VolumeControl from "./VolumeControl";
import TimeDisplay from "./TimeDisplay";
import VideoTimeSlider from "./VideoTimeSlider";
import HoverCursor from "./HoverCursor";

export default function Player({ video }) {
  const src = {
    src: `vimeo/${video.vimeoId}`,
    type: "video/vimeo",
  };

  const player = useRef(null);
  const containerRef = useRef(null);
  const controlsRef = useRef(null);

  const { canPlay } = useMediaStore(player);
  const isReady = canPlay;

  const [hoverHandlers, setHoverHandlers] = useState({
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    cursorStyle: "auto",
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

  return (
    <>
      <PlayerPlaceholderVideo />
      <div className="flex">
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ cursor: hoverHandlers.cursorStyle }}
          onMouseEnter={hoverHandlers.onMouseEnter}
          onMouseLeave={hoverHandlers.onMouseLeave}
        >
          <MediaPlayer
            viewType="video"
            key={video.id}
            aspectRatio="16/9"
            ref={player}
            src={src}
            playsInline
            style={{ cursor: hoverHandlers.cursorStyle }}
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

            <HoverCursor
              containerRef={containerRef}
              playerRef={player}
              playerColor={playerColor}
              onHandlersChange={setHoverHandlers}
            />
          </MediaPlayer>
        </div>
      </div>
    </>
  );
}

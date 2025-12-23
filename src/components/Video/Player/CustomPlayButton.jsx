"use client";

import { PlayButton } from "@vidstack/react";
import { PlayIcon, PauseIcon } from "@vidstack/react/icons";
import { useMediaState } from "@vidstack/react";

export default function CustomPlayButton({ playerColor }) {
  const isPaused = useMediaState("paused");

  return (
    <PlayButton
      className="flex w-25 h-8 justify-center items-center rounded-2xl pl-1 pr-3 mr-3 cursor-pointer hover:bg-gray-300!"
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
  );
}


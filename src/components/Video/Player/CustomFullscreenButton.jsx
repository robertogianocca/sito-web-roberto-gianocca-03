"use client";

import { FullscreenButton } from "@vidstack/react";
import { FullscreenIcon, FullscreenExitIcon } from "@vidstack/react/icons";
import { useMediaState } from "@vidstack/react";

export default function CustomFullscreenButton({ playerColor }) {
  const isFull = useMediaState("fullscreen");

  return (
    <FullscreenButton className="vds-button" style={{ color: playerColor.icons }}>
      {isFull ? (
        <FullscreenExitIcon className="fs-exit-icon vds-icon" />
      ) : (
        <FullscreenIcon className="fs-enter-icon vds-icon" />
      )}
    </FullscreenButton>
  );
}


"use client";

import { TimeSlider } from "@vidstack/react";

export default function VideoTimeSlider({ playerColor }) {
  return (
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
  );
}


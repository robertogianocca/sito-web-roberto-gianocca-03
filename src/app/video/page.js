// ========== VIDEO HOME PAGE ==========

import { videoDataBase } from "@/data/video-data-base";
import VideoDetails from "@/components/Video/VideoDetails";

export default function VideoPage() {
  // Show first video (sugar-mama) as default on desktop
  // On mobile, this is hidden by layout and only thumbnails/text are shown
  const firstVideo = videoDataBase[0];
  return <VideoDetails videoId={firstVideo.id} />;
}

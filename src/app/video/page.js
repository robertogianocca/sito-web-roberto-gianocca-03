// ========== VIDEO HOME PAGE ==========

import { videoDataBase } from "@/data/video-data-base";
import VideoThumbnails from "@/components/Video/VideoThumbnails";
import VideoDetails from "@/components/Video/VideoDetails";
import Link from "next/link";

export default async function VideoPageId({ params }) {
  const { id } = await params;
  return <VideoDetails videoId={id} />;
}

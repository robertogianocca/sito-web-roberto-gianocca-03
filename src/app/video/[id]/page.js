// ========== VIDEO ID PAGE ========== //

import { videoDataBase } from "@/data/video-data-base";
import VideoDetails from "@/components/Video/VideoDetails";
import { notFound } from "next/navigation";
import VideoContentTransition from "@/components/Video/VideoContentTransition";

// Generate static params for all videos at build time (better performance & SEO)
export async function generateStaticParams() {
  return videoDataBase.map((video) => ({
    id: video.id,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const video = videoDataBase.find((v) => v.id === id);

  if (!video) {
    return {
      title: "Video Not Found",
    };
  }

  return {
    title: `${video.title} | Video`,
    description: video.subtitle || `Watch ${video.title}`,
  };
}

export default async function VideoPageId({ params }) {
  const { id } = await params;

  // Validate that the video exists
  const video = videoDataBase.find((v) => v.id === id);
  if (!video) {
    notFound();
  }

  return (
    <VideoContentTransition videoId={id}>
      <VideoDetails videoId={id} />
    </VideoContentTransition>
  );
}

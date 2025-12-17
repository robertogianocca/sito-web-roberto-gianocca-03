// ========== VIDEO ID PAGE ========== //

import { videoDataBase } from "@/data/video-data-base";
import VideoMenu from "@/components/Video/VideoMenu";
import VideoThumbnails from "@/components/Video/VideoThumbnails";
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
    <div className="lg:h-dvh px-2 lg:px-10 flex flex-col lg:grid grid-cols-5 gap-10">
      <div className="hidden sm:flex flex-col xl:grid lg:grid-cols-2 col-span-2 gap-10">
        {/* ==================== MENU ==================== */}
        <div className="col-span-1 hidden lg:block p-custom">
          <VideoMenu />
        </div>
        {/* ==================== VIDEO THUMBNAILS ==================== */}
        <div className="col-span-1 hidden lg:flex flex-col p-custom">
          <VideoThumbnails />
        </div>
      </div>
      {/* ==================== VIDEO DETAILS ==================== */}
      <div className="col-span-3 flex flex-col h-dvh p-custom overflow-scroll scrollbar-hide">
        <VideoDetails videoId={id} />
      </div>
      {/* // <VideoContentTransition> */}
      {/* // </VideoContentTransition> */}
    </div>
  );
}

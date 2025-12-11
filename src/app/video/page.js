// ========== VIDEO HOME PAGE ==========

import { videoDataBase } from "@/data/video-data-base";
import VideoThumbnails from "@/components/Video/VideoThumbnails";
import VideoDetails from "@/components/Video/VideoDetails";
import Link from "next/link";

export default async function VideoPageId({ params }) {
  const videoId = await params;
  return (
    <>
      <h1 className="text-3xl p-10 text-center">Pagina ID</h1>
      <div className="bg-blue-950 w-full p-10 grid grid-cols-4">
        <div className="col-span-2">{/* <VideoThumbnails selectedVideo={videoId.id} /> */}</div>
        <div className="hidden lg:block col-span-2">
          <VideoDetails videoId={videoId.id} />
        </div>
      </div>
    </>
  );
}

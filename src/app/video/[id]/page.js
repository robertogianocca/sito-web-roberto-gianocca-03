// ========== VIDEO ID PAGE ==========

import { videoDataBase } from "@/data/video-data-base";
import VideoThumbnails from "@/components/Video/VideoThumbnails";
import VideoDetails from "@/components/Video/VideoDetails";
import Link from "next/link";

export default async function VideoPageId({ params }) {
  const videoId = await params;
  console.log(videoId.id);
  const mappedVideo = videoDataBase.map((video) => {
    return (
      <Link key={video.id} href={`/video/${video.id}`}>
        <div className="bg-slate-800 p-10 rounded-2xl mb-10">{video.title}</div>
      </Link>
    );
  });

  return (
    <>
      <h1 className="text-3xl p-10 text-center">Pagina ID</h1>
      <div className="bg-blue-950 w-full p-10 grid grid-cols-4">
        <div className="col-span-2">
          <VideoThumbnails />
        </div>
        <div className="col-span-2">
          <VideoDetails videoId={videoId.id} />
        </div>
      </div>
    </>
  );
}

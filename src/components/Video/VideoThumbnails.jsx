import { videoDataBase } from "@/data/video-data-base";
import Link from "next/link";

export default function VideoThumbnails() {
  //
  const mappedVideo = videoDataBase.map((video) => {
    return (
      <Link key={video.id} href={`/video/${video.id}`}>
        <div className="bg-slate-800 p-10 rounded-2xl mb-10">{video.title}</div>
      </Link>
    );
  });

  return (
    <div className="w-200 p-10 bg-slate-600 rounded-2xl mx-auto">
      <h1 className="text-2xl mb-10">Thumbnails</h1>
      {mappedVideo}
    </div>
  );
}

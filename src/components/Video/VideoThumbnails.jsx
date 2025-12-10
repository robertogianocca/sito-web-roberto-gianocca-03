import { videoDataBase } from "@/data/video-data-base";
import Link from "next/link";
import Image from "next/image";

export default function VideoThumbnails() {
  //
  const mappedVideo = videoDataBase.map((video) => {
    return (
      <Link key={video.id} href={`/video/${video.id}`}>
        {video.title}
        <Image src={video.thumbnail} width={1000} height={1000} />
      </Link>
    );
  });

  return (
    <div className="flex flex-col p-3 bg-slate-600 rounded-2xl mx-auto">
      <h1 className="text-2xl mb-10">Thumbnails</h1>
      {mappedVideo}
    </div>
  );
}

import { videoDataBase } from "@/data/video-data-base";

export default function VideoDetails({ videoId = "sugar-mama" }) {
  // Find the video by matching the id property
  const foundVideo = videoDataBase.find((video) => video.id === videoId);

  // Handle case where video is not found
  if (!foundVideo) {
    return (
      <div className="w-200 p-10 bg-slate-600 rounded-2xl mx-auto">
        <h1 className="text-2xl mb-10">Details</h1>
        <p className="text-red-400">Video not found</p>
      </div>
    );
  }

  return (
    <div className="p-10 bg-slate-600 rounded-2xl mx-auto">
      <h1 className="text-2xl mb-10">Details</h1>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{foundVideo.title}</h2>
        {foundVideo.subtitle && <p className="text-slate-300">{foundVideo.subtitle}</p>}
      </div>
    </div>
  );
}

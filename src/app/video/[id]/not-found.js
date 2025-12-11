// ========== VIDEO NOT FOUND PAGE ========== //

import Link from "next/link";

export default function VideoNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-10">
      <h1 className="text-4xl font-bold mb-4">Video Not Found</h1>
      <p className="text-slate-400 mb-8">The video you're looking for doesn't exist.</p>
      <Link
        href="/video"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        Back to Videos
      </Link>
    </div>
  );
}

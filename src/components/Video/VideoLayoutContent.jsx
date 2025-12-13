"use client";

import { usePathname } from "next/navigation";
import VideoThumbnails from "@/components/Video/VideoThumbnails";

export default function VideoLayoutContent({ children }) {
  const pathname = usePathname();
  const isVideoListPage = pathname === "/video";

  return (
    <>
      {/* Text - visible on mobile only for /video page, always visible on desktop */}
      <div className={`${isVideoListPage ? "block" : "hidden"} lg:block col-span-1`}>
        <p>
          Is a long established fact that a reader will be distracted by the readable content of a
          page when looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using 'Content here, content
          here', making it look like readable English. Many desktop publishing packages and web page
          editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'
          will uncover many web sites still in their infancy.
        </p>
      </div>

      {/* Thumbnails - visible on mobile only for /video page, always visible on desktop */}
      <div
        className={`${
          isVideoListPage ? "block" : "hidden"
        } col-span-1 sm:grid lg:block sm:grid-cols-2 gap-x-4 overflow-hidden`}
      >
        <VideoThumbnails />
      </div>

      {/* Children - hidden on mobile for /video page, always visible on desktop */}
      <div className={`${isVideoListPage ? "hidden" : "block"} lg:block lg:col-span-3`}>
        {children}
      </div>
    </>
  );
}

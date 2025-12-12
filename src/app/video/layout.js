// ========== LAYOUT - VIDEO ========== //

import Background from "@/components/Background/Background";
import VideoThumbnails from "@/components/Video/VideoThumbnails";

export default async function VideoLayout({ children }) {
  return (
    <div className="lg:h-dvh p-1 lg:p-10 flex flex-col lg:grid grid-cols-5 gap-10">
      <Background color="#456DFF" />
      <div className="hidden lg:block col-span-1">
        <p>
          t is a long established fact that a reader will be distracted by the readable content of a
          page when looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using 'Content here, content
          here', making it look like readable English. Many desktop publishing packages and web page
          editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'
          will uncover many web sites still in their infancy. Various versions have evolved over the
          years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>
      {/* Thumbnails persist across navigations - no re-render */}
      <div className="hidden lg:block col-span-1">
        <VideoThumbnails />
      </div>

      {/* Only this area transitions smoothly */}
      <div className="lg:col-span-3">{children}</div>
    </div>
  );
}

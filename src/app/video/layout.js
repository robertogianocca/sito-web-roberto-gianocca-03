// ========== LAYOUT - VIDEO ========== //

import Background from "@/components/Background/Background";
import VideoLayoutContent from "@/components/Video/VideoLayoutContent";

export default async function VideoLayout({ children }) {
  return (
    <div className="lg:h-dvh p-2 lg:p-10 flex flex-col lg:grid grid-cols-5 gap-10">
      <Background color="#456DFF" />
      <VideoLayoutContent>{children}</VideoLayoutContent>
    </div>
  );
}

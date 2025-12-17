// ========== LAYOUT - VIDEO ========== //

import Background from "@/components/Background/Background";
import VideoMenu from "@/components/Video/VideoMenu";
import PageDescription from "@/components/PageDescription";
import VideoThumbnails from "@/components/Video/VideoThumbnails";

export default async function VideoLayout({ children }) {
  return (
    <>
      <Background color="#456DFF" />
      <div className="lg:h-dvh px-2 lg:px-6 flex flex-col lg:grid grid-cols-5 gap-10">
        <div className="hidden sm:flex flex-col xl:grid lg:grid-cols-2 col-span-2 gap-10">
          {/* ==================== MENU ==================== */}
          <div className="col-span-1 hidden lg:block p-custom opacity-60">
            {/* <VideoMenu /> */}
            <PageDescription
              title="Video"
              description="Cras malesuada, mi vitae molestie venenatis, urna augue tincidunt est, vitae semper lorem nulla eget erat. In condimentum turpis non augue condimentum, sit amet ultricies massa ullamcorper. Mauris auctor pretium diam, a consequat purus varius id. Aliquam eu dignissim urna, in pellentesque risus. Integer consectetur eu nisl in scelerisque."
              descriptionEng="Cras malesuada, mi vitae molestie venenatis, urna augue tincidunt est, vitae semper lorem nulla eget erat. In condimentum turpis non augue condimentum, sit amet ultricies massa ullamcorper. Mauris auctor pretium diam, a consequat purus varius id. Aliquam eu dignissim urna, in pellentesque risus. Integer consectetur eu nisl in scelerisque."
            />
          </div>

          {/* ==================== VIDEO THUMBNAILS ==================== */}
          <div className="col-span-1 hidden lg:flex flex-col p-custom">
            <VideoThumbnails />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

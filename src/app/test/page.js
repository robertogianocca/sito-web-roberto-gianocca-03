import VerticalThumbnailList from "@/components/VerticalThumbnailList/VerticalThumbnailList";

export default function TestPage() {
  // Sample images - using the available thumbnails from the project
  const testImages = [
    {
      src: "/video/sugar-mama/sugar-mama-cover.webp",
      alt: "Sugar Mama Cover",
    },
    {
      src: "/video/sugar-mama/sugar-mama-thumb-cover.webp",
      alt: "Sugar Mama Thumb Cover",
    },
    {
      src: "/video/sugar-mama/sugar-mama-backstage-01.webp",
      alt: "Sugar Mama Backstage",
    },
    {
      src: "/video/hot-sky/hot-sky-cover.webp",
      alt: "Hot Sky Cover",
    },
    {
      src: "/video/hot-sky/hot-sky-thumb-cover.webp",
      alt: "Hot Sky Thumb Cover",
    },
    {
      src: "/video/sugar-mama/sugar-mama-cover.webp",
      alt: "Sugar Mama Cover 2",
    },
    {
      src: "/video/hot-sky/hot-sky-cover.webp",
      alt: "Hot Sky Cover 2",
    },
  ];

  return (
    <div className="w-full h-screen bg-[var(--background)]">
      <VerticalThumbnailList images={testImages} />
    </div>
  );
}


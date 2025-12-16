import { videoDescriptions } from "./video-descriptions";

export const videoDataBase = [
  {
    id: "sugar-mama",
    vimeoId: "1132948199",
    title: "Sugar Mama",
    subtitle: (
      <>
        A music video for <span className="italic">Matt Pascale & The Stomps</span>
      </>
    ),
    description: videoDescriptions["sugar-mama"],
    cover: "/video/sugar-mama/sugar-mama-cover.webp",
    thumbnail: "/video/sugar-mama/sugar-mama-thumb-cover.webp",
  },
  {
    id: "hot-sky",
    vimeoId: "1133440458",
    title: "Hot Sky",
    subtitle: (
      <>
        A music video for <span className="italic">the Yuna Hawks</span>
      </>
    ),
    description: videoDescriptions["hot-sky"],
    cover: "/video/hot-sky/hot-sky-cover.webp",
    thumbnail: "/video/hot-sky/hot-sky-thumb-cover.webp",
  },
  {
    id: "carie",
    vimeoId: "676793805",
    title: "CARIE",
    subtitle: "",
    description: videoDescriptions["carie"],
    cover: "/video/carie/carie-cover.webp",
    thumbnail: "/video/carie/carie-thumb-cover.webp",
  },
  // {
  //   id: "met-parachute",
  //   vimeoId: "676799834",
  //   title: "Met Parachute MCR",
  //   subtitle: "",
  //   description: videoDescriptions["sugar-mama"],
  //   cover: "/video/sugar-mama/sugar-mama-cover.jpg",
  //   thumbnail: "/video/sugar-mama/sugar-mama-thumb_01.jpg",
  // },
];

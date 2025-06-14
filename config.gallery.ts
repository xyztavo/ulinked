import { GalleryProps } from "./types/config.gallery";

const gallery: GalleryProps = {
  albums: [
    {
      title: "yo",
      route: "yo",
      coverImageSrc:
        "/assets/me/me-cover.png",
      posts: [
        {
          title: "1",
          src: "/assets/me/1.png",
        },
        {
          title: "2",
          src: "/assets/me/2.png",
        },
        {
          title: "3",
          src: "/assets/me/3.png",
        },
        {
          title: "4",
          src: "/assets/me/4.png",
        },
        {
          title: "5",
          src: "/assets/me/5.png",
        },
        {
          title: "6",
          src: "/assets/me/6.png",
          videoSrc: "", /* if you wish to use a video, pass it right here, this one can be omitted if you dont wish to */
        },
      ],
    },
  ],
};

export default gallery;

import { GalleryProps } from "../types/config.gallery";

const gallery: GalleryProps = {
  albums: [
    {
      title: "yo",
      route: "/albums/yo",
      coverImageSrc: "/assets/me/me-cover.png",
      posts: [
        {
          title: "1",
          src: "/assets/me/1.png",
          videoSrc:
            "" /* if you wish to use a video, pass it right here, this one can be omitted if you dont wish to */,
        },
      ],
    },
  ],
};

export default gallery;

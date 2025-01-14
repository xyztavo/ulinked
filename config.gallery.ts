import { Album } from "./types/config.gallery";

const gallery: { albums: Album[] } = {
  albums: [
    {
      title: "me",
      route: "me",
      coverImageSrc:
        "https://lh3.googleusercontent.com/p2A31eJoSiiH8aF6E7GRU-2vUJTeqNBTnnuo0OmSu_lI831St_sMU_D4vNd6_vFJvIISkFiRYJgwnmTs=w544-h544-l90-rj",
      posts: [
        {
          title: "skate",
          src: "/assets/me/skate-yellow-flowers.jpg",
        },
        {
          title: "focus",
          src: "/assets/me/back.jpg",
          videoSrc: "", /* if you wish to use a video, pass it right here, this one can be omitted */
        },
        {
          title: "graffiti",
          src: "/assets/me/grafitti.jpg", /* videoSrc is optional, so it can be omitted */
        },
      ],
    },
  ],
};

export default gallery;

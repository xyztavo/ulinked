export interface GalleryProps {
  albums: AlbumProps[];
}


export interface AlbumProps {
  title: string;
  route: string;
  coverImageSrc: string;
  posts: PostProps[];
}

interface PostProps {
  title: string;
  src: string;
  videoSrc?: string; // optional
}

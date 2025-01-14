export interface Album {
  title: string;
  route: string;
  coverImageSrc: string;
  posts: Post[];
}

interface Post {
  title: string;
  src: string;
  videoSrc?: string; // optional
}

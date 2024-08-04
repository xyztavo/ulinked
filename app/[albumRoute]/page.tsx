"use client";
import { useParams } from "next/navigation";

import * as gallery from "../../config.gallery.json";

export default function Album() {
  const params = useParams<{ albumRoute: string }>();
  const results = gallery.albums.filter(
    (album) => album.route == params.albumRoute,
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">{params.albumRoute}</h1>
      {results.map((album, i) => {
        return (
          <div
            key={i}
            className="flex flex-row flex-wrap items-center justify-center gap-4"
          >
            {album.images.map((image, i) => {
              return (
                <div key={i} className="flex flex-col items-center justify-center">
                  <img alt="" className="w-60 h-60" src={image.src} />
                  <h1 className="absolute top-72">{image.title}</h1>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

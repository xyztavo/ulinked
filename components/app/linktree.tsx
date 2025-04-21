"use client";
import { Camera } from "lucide-react";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import useSWR from "swr";
import axios from "axios";
import Head from "next/head";

import gallery from "../../config.gallery";
import config from "../../config";

import { ThemeSwitch } from "@/components/app/theme-switch";
import { LanyardData } from "@/types/lanyard-data";
import { AlbumsModal } from "./albums-modal";
import SocialMedia from "./social-media";
import { Spotify } from "./spotify";
import { BadgeAvatar } from "./badge-avatar";

export interface LanyardResponse {
  data: LanyardData;
  success: boolean;
}

export default function Linktree() {
  const {
    isOpen: isAlbumsOpen,
    onOpen: onAlbumsOpen,
    onOpenChange: onAlbumsOpenChange,
  } = useDisclosure();

  const { data } = useSWR<LanyardResponse>(
    "/lanyard",
    async () => {
      const res = await axios.get(
        "https://api.lanyard.rest/v1/users/" + config.lanyard.discordId
      );

      return res.data;
    },
    { refreshInterval: 10000 }
  );

  return (
    <>
      {/* Preload album cover images */}
      <Head>
        {gallery.albums.map((album) => (
          <link
            key={album.coverImageSrc}
            rel="preload"
            href={album.coverImageSrc}
            as="image"
          />
        ))}
        {gallery.albums.map((album) =>
          album.posts.map((post) => (
            <link key={post.src} rel="preload" href={post.src} as="image" />
          ))
        )}
      </Head>
      <div className={"flex flex-col items-center justify-center gap-8"}>
        <Spotify data={data} />
        {/* avatar and status */}
        <BadgeAvatar data={data} />
        {/* Gallery and theme switch */}
        <div className="flex flex-row gap-4 justify-center items-center">
          {config.options.gallery && (
            <Button
              isIconOnly
              className="shadow-custom hover:text-white bg-transparent hover:bg-primary"
              onPress={onAlbumsOpen}
            >
              <Camera />
            </Button>
          )}
          <ThemeSwitch />
        </div>
        {/* albuns modal */}
        <AlbumsModal
          isOpen={isAlbumsOpen}
          onOpenChange={onAlbumsOpenChange}
        />
        {/* Buttons */}
        <div className="flex flex-col gap-6">
          {config.buttons.map((button) => (
            <Button
              key={button.link}
              className="text-foreground hover:text-white hover:bg-primary bg-transparent w-64 shadow-custom"
              size="lg"
              onPress={() => window.open(button.link, "_blank")}
            >
              {button.title}
            </Button>
          ))}
        </div>
        {/* Social Media */}
        <SocialMedia />
      </div>
    </>
  );
}

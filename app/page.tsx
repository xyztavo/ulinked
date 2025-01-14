"use client";
import { Camera, Github, Instagram, Linkedin, Music } from "lucide-react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { motion } from "framer-motion";
import { Avatar } from "@nextui-org/avatar";
import useSWR from "swr";
import axios from "axios";
import { Badge } from "@nextui-org/badge";
import { Tooltip } from "@nextui-org/tooltip";

import gallery from "../config.gallery";
import config from "../config";

import { ThemeSwitch } from "@/components/theme-switch";
import { DiscordIcon, SpotifyIcon } from "@/components/icons";
export interface Response {
  data: Data;
  success: boolean;
}

export interface Data {
  kv: Kv;
  discord_user: DiscordUser;
  activities: Activity[];
  discord_status: string;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: any;
}

export interface Kv {
  ustav: string;
}

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  clan: any;
  avatar_decoration_data: any;
  bot: boolean;
  global_name: string;
  primary_guild: any;
  display_name: string;
  public_flags: number;
}

export interface Activity {
  flags: number;
  id: string;
  name: string;
  type: number;
  state: string;
  session_id: string;
  details: string;
  application_id: string;
  timestamps: Timestamps;
  assets: Assets;
  buttons: string[];
  created_at: number;
}

export interface Timestamps {
  start: number;
}

export interface Assets {
  large_image: string;
  large_text: string;
  small_image: string;
  small_text: string;
}

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isSpotifyOpen,
    onOpen: onSpotifyOpen,
    onOpenChange: onSpotifyOpenChange,
  } = useDisclosure();
  const { data } = useSWR<Response>(
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
    <div className={"flex flex-col items-center justify-center gap-8"}>
      <div className="flex flex-col items-center gap-4">
        {data?.data.spotify && (
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              isIconOnly
              className="shadow-custom hover:text-white bg-transparent hover:bg-primary"
              size="sm"
              onPress={onSpotifyOpen}
            >
              <Music className="p-1" />
            </Button>
            <Button
              className="shadow-custom bg-transparent hover:bg-primary max-w-60 text-foreground"
              onPress={onSpotifyOpen} // This will trigger opening the modal
            >
              {data.data.spotify.song && <>{data.data.spotify.song}</>}
            </Button>
          </div>
        )}
        <Modal isOpen={isSpotifyOpen} onOpenChange={onSpotifyOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Currently Playing on Spotify
                  {/* https://open.spotify.com/track/3JQUIVHsxgnMAyXqbZU5zO */}
                </ModalHeader>
                <ModalBody className="flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                    {data?.data.spotify?.track_id && (
                      <a
                        className="hover:scale-110 transition-transform flex flex-col items-center"
                        href={`https://open.spotify.com/track/${data?.data.spotify?.track_id}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {data?.data.spotify?.album_art_url && (
                          <img
                            alt="Album Art"
                            className="w-32 h-32 rounded-lg"
                            src={data.data.spotify.album_art_url} // Safe access
                          />
                        )}
                        {data?.data.spotify?.song && (
                          <h2 className="text-xl font-bold mt-2 underline">
                            {data.data.spotify.song}
                          </h2>
                        )}
                        {data?.data.spotify?.artist && (
                          <p className="text-sm">
                            Artist: {data.data.spotify.artist}
                          </p>
                        )}
                        {data?.data.spotify?.album && (
                          <p className="text-sm">
                            Album: {data.data.spotify.album}
                          </p>
                        )}
                      </a>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter className="flex flex-row justify-between">
                  {data?.data.spotify?.track_id && (
                    <>
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */}
                      <div
                        className="relative w-10 h-10 rounded-md border-none transition-transform duration-300 hover:cursor-pointer hover:scale-110 overflow-hidden"
                        onClick={() =>
                          window.open(
                            `https://open.spotify.com/track/${data?.data.spotify?.track_id}`,
                            "_blank"
                          )
                        }
                      >
                        <img
                          alt="a gif of a cat jamming to the music."
                          className="w-full h-full"
                          src="/assets/cat-jam.gif"
                        />
                        <span className="absolute inset-0 bg-gradient-to-tr from-transparent to-primary opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </>
                  )}

                  <Button
                    className="text-white"
                    color="primary"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {data && config.lanyard.active ? (
          data.data.discord_status != "offline" ? (
            <Badge
              color={data.data.discord_status == "idle" ? "warning" : "success"}
              content={data.data.discord_status}
              placement="bottom-right"
              size="lg"
              variant="solid"
            >
              <Tooltip
                color="primary"
                content={
                  data.data.activities.length > 0 && (
                    <div className="flex flex-col text-white items-center justify-center text-center p-2">
                      {data.data.activities
                        .filter(
                          (activity) =>
                            activity.name &&
                            !activity.name.includes("Spotify") &&
                            !activity.name.includes("Custom Status")
                        )
                        .map((activity, index) => (
                          <div key={index} className="mb-2">
                            <h1 className="text-center">
                              Currently on:{" "}
                              <span className="font-bold">{activity.name}</span>
                            </h1>
                            <div className="text-sm flex flex-col">
                              {activity.state && <h2>{activity.state}</h2>}
                              {activity.details && <h2>{activity.details}</h2>}
                            </div>
                          </div>
                        ))}
                    </div>
                  )
                }
                placement="bottom"
                showArrow={false}
              >
                <Avatar
                  isBordered
                  className="w-24 h-24 bg-primary/25"
                  color="primary"
                  size="lg"
                  src={config.avatarImgSrc}
                />
              </Tooltip>
            </Badge>
          ) : (
            <Avatar
              isBordered
              className="w-24 h-24 bg-transparen "
              size="lg"
              src={config.avatarImgSrc}
            />
          )
        ) : (
          <Avatar
            isBordered
            className="w-24 h-24 bg-transparent"
            size="lg"
            src={config.avatarImgSrc}
          />
        )}
        <h1 className="text-2xl">{config.nickname}</h1>
      </div>
      <div className="flex flex-row gap-4 justify-center items-center">
        <Button
          isIconOnly
          className="shadow-custom hover:text-white bg-transparent hover:bg-primary"
          onPress={onOpen}
        >
          <Camera />
        </Button>
        <ThemeSwitch />
      </div>
      {/* albuns modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                My Albums
              </ModalHeader>
              <ModalBody className="flex flex-row items-center justify-center flex-wrap">
                {gallery.albums.map((album, i) => (
                  <motion.a
                    key={i}
                    className="flex flex-col items-center justify-center"
                    href={album.route}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                  >
                    <img
                      alt="album cover"
                      className="w-32 h-32 rounded-t-md border-2 border-foreground-300"
                      src={album.coverImageSrc}
                    />
                    <Button
                      className="w-full rounded-b-lg font-normal"
                      radius="none"
                    >
                      {album.title}
                    </Button>
                  </motion.a>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
      <div className="flex flex-row items-center justify-center gap-4">
        {config.githubLink && (
          <Button
            isIconOnly
            className="text-foreground hover:text-white bg-transparent shadow-custom hover:bg-slate-800"
            size="sm"
            onPress={() => window.open(config.githubLink, "_blank")}
          >
            <Github />
          </Button>
        )}
        {config.instagramLink && (
          <Button
            isIconOnly
            className="relative text-foreground bg-transparent hover:text-white shadow-custom overflow-hidden rounded-md transition-all duration-300 group"
            size="sm"
            onPress={() => window.open(config.instagramLink, "_blank")}
          >
            {/* Gradient background */}
            <span className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Icon content */}
            <span className="relative z-10">
              <Instagram />
            </span>
          </Button>
        )}
        {config.discordLink && (
          <Button
            isIconOnly
            className="text-foreground hover:text-white bg-transparent shadow-custom hover:bg-[#7289da]"
            size="sm"
            onPress={() => window.open(config.discordLink, "_blank")}
          >
            <DiscordIcon />
          </Button>
        )}
        {config.linkedInLink && (
          <Button
            isIconOnly
            className="text-foreground hover:text-white bg-transparent shadow-custom hover:bg-[#0e76a8]"
            size="sm"
            onPress={() => window.open(config.linkedInLink, "_blank")}
          >
            <Linkedin />
          </Button>
        )}
        {config.ytMusicLink && (
          <Button
            isIconOnly
            className="text-foreground hover:text-white bg-transparent shadow-custom hover:bg-[#da1a1a]"
            size="sm"
            onPress={() => window.open(config.ytMusicLink, "_blank")}
          >
            <Music />
          </Button>
        )}
        {config.spotifyLink && (
          <Button
            isIconOnly
            className="text-foreground hover:text-white bg-transparent shadow-custom hover:bg-[#1DB954]"
            size="sm"
            onPress={() => window.open(config.spotifyLink, "_blank")}
          >
            <SpotifyIcon />
          </Button>
        )}
      </div>
      <h2>{config.footer}</h2>
    </div>
  );
}

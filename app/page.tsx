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

import * as gallery from "../config.gallery.json";
import * as config from "../config.json";

import { ThemeSwitch } from "@/components/theme-switch";
import { DiscordIcon } from "@/components/icons";

export default function Home() {
  interface ILanyardResponse {
    data: ILanyardResponseData;
  }
  interface ILanyardResponseData {
    discord_status: string;
    activities: ILanyardActivity[];
  }
  interface ILanyardActivity {
    name: string;
    state: string;
    details: string;
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useSWR<ILanyardResponse>("/lanyard", async () => {
    const res = await axios.get(
      "https://api.lanyard.rest/v1/users/" + config.lanyard.discordId,
    );

    return res.data;
  });

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4">
        {data && config.lanyard.active ? (
          data.data.discord_status == "idle" ? (
            <Badge
              color="warning"
              content="idle"
              placement="bottom-right"
              size="lg"
              variant="solid"
            >
              <Tooltip
                color="primary"
                content={
                  data.data.activities[0] && (
                    <div className="flex flex-col items-center justify-center text-center p-2">
                      <h1 className="text-center">
                        Currently on:{" "}
                        <span className="font-bold">
                          {data.data.activities[0].name &&
                            data.data.activities[0].name}
                        </span>
                      </h1>
                      <div className="text-sm flex flex-col">
                        <h2>
                          {data.data.activities[0].state &&
                            data.data.activities[0].state}
                        </h2>
                        <h2>
                          {data.data.activities[0].details &&
                            data.data.activities[0].details}
                        </h2>
                      </div>
                    </div>
                  )
                }
                showArrow={true}
              >
                <Avatar
                  isBordered
                  className="w-24 h-24"
                  color="primary"
                  size="lg"
                  src={config.avatarImgSrc}
                />
              </Tooltip>
            </Badge>
          ) : (
            <Avatar
              isBordered
              className="w-24 h-24"
              size="lg"
              src={config.avatarImgSrc}
            />
          )
        ) : (
          <Avatar
            isBordered
            className="w-24 h-24"
            size="lg"
            src={config.avatarImgSrc}
          />
        )}
        <h1 className="text-2xl">{config.nickname}</h1>
      </div>
      <div className="flex flex-row gap-4 justify-center items-center">
        <Button isIconOnly color="secondary" onPress={onOpen}>
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
                    whileHover={{ scale: 1.3, zIndex: 10 }}
                  >
                    <img
                      alt="album cover"
                      className="w-32 h-32 rounded-t-md border-2 border-foreground-300"
                      src={album.coverImageSrc}
                    />
                    <Button className="w-full rounded-b-lg" radius="none">
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
            className="text-white w-64"
            color="primary"
            size="lg"
            onClick={() => window.open(button.link, "_blank")}
          >
            {button.title}
          </Button>
        ))}
      </div>
      <div className=" flex flex-row items-center justify-center gap-4">
        <Button
          isIconOnly
          className="text-white bg-slate-800"
          size="sm"
          onClick={() => window.open(config.githubLink, "_blank")}
        >
          <Github />
        </Button>
        <Button
          isIconOnly
          className="text-white bg-gradient-to-br from-pink-500 to-purple-500"
          size="sm"
          onClick={() => window.open(config.instagramLink, "_blank")}
        >
          <Instagram />
        </Button>
        <Button
          isIconOnly
          className="text-white bg-[#7289da]"
          size="sm"
          onClick={() => window.open(config.discordLink, "_blank")}
        >
          <DiscordIcon />
        </Button>
        <Button
          isIconOnly
          className="text-white bg-[#0e76a8]"
          size="sm"
          onClick={() => window.open(config.linkedInLink, "_blank")}
        >
          <Linkedin />
        </Button>
        <Button
          isIconOnly
          className="text-white bg-[#da1a1a]"
          size="sm"
          onClick={() => window.open(config.ytMusicLink, "_blank")}
        >
          <Music />
        </Button>
      </div>
      <h2>{config.footer}</h2>
    </div>
  );
}

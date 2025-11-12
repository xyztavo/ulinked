"use client";
import { useParams } from "next/navigation";
import { Button } from "@heroui/button";
import { ArrowLeftCircleIcon, Camera, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import Video from "next-video";
import Image from "next/image";

import config from "../../config/config";

import { ThemeSwitch } from "@/components/app/theme-switch";
import { AlbumsModal } from "@/components/app/albums-modal";
import gallery from "@/config/config.gallery";

export default function Album() {
  const params = useParams<{ albumRoute: string }>();

  const results = gallery.albums.filter(
    (album) => album.route === params.albumRoute
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-4 z-40">
      {/* go back, theme switch and gallery modal buttons */}
      <div className="flex flex-row gap-6">
        <Button
          isIconOnly
          onPress={() => window.location.replace("/")}
          className="bg-transparent hover:bg-primary shadow-custom"
        >
          <ArrowLeftCircleIcon />
        </Button>
        <ThemeSwitch />
        <Button
          isIconOnly
          color="secondary"
          className="bg-transparent hover:bg-primary shadow-custom text-foreground"
          onPress={onOpen}
        >
          <Camera />
        </Button>
      </div>
      <AlbumsModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="flex flex-col items-center justify-center gap-4">
        {results.map((album, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <h1 className="text-2xl">{album.title}</h1>
            <div className="flex flex-row flex-wrap items-center justify-center gap-8">
              {album.posts.map((image, i) => {
                const {
                  isOpen: isImageOpen,
                  onOpen: onImageOpen,
                  onOpenChange: onImageOpenChange,
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                } = useDisclosure();

                return (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    onClick={onImageOpen}
                  >
                    <Modal
                      isOpen={isImageOpen}
                      onOpenChange={onImageOpenChange}
                    >
                      <ModalContent
                        className={
                          image.videoSrc ? "scale-100 lg:scale-150" : ""
                        }
                      >
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col">
                              {image.title}
                            </ModalHeader>
                            <ModalBody className="flex flex-row items-center justify-center flex-wrap">
                              {image.videoSrc ? (
                                <Video
                                  autoPlay
                                  accentColor={config.accentColor}
                                  src={image.videoSrc}
                                />
                              ) : (
                                <Image
                                  alt={image.title}
                                  src={image.src}
                                  width={240}
                                  height={240}
                                  priority
                                />
                              )}
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
                    <img
                      alt={image.title}
                      className="w-52 h-52 rounded-md object-cover"
                      src={image.src}
                    />
                    <h1 className="mt-[-1.5rem] rounded-md text-white font-bold bg-gradient-to-t from-slate-400 dark:from-black to-transparent w-full text-center">
                      {image.title}
                    </h1>
                    {image.videoSrc && (
                      <PlayCircle
                        className="absolute w-12 h-12"
                        color="white"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
import Image from 'next/image';

import gallery from "../../config.gallery";
import config from "../../config";

import { ThemeSwitch } from "@/components/theme-switch";

export default function Album() {
  const params = useParams<{ albumRoute: string }>();

  const results = gallery.albums.filter(
    (album) => album.route === params.albumRoute
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-4 z-40">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">My Albums</ModalHeader>
              <ModalBody className="flex flex-row items-center justify-center flex-wrap">
                {gallery.albums.map((album, i) => (
                  <motion.a
                    key={i}
                    className="flex flex-col items-center justify-center"
                    href={album.route}
                    whileHover={{ scale: 1.3, zIndex: 10 }}
                  >
                    <Image
                      alt="album cover"
                      className="rounded-t-md border-2 border-foreground-300"
                      width={128}
                      height={128}
                      src={album.coverImageSrc}
                      priority
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
      <div className="flex flex-row gap-6">
        <Button isIconOnly onPress={() => window.location.replace("/")} className="bg-transparent hover:bg-primary shadow-custom">
          <ArrowLeftCircleIcon />
        </Button>
        <ThemeSwitch />
        <Button isIconOnly color="secondary" className="bg-transparent hover:bg-primary shadow-custom text-foreground" onPress={onOpen}>
          <Camera />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl">{params.albumRoute}</h1>
        {results.map((album, i) => (
          <div
            key={i}
            className="flex flex-row flex-wrap items-center justify-center gap-8"
          >
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
                    <ModalContent className={image.videoSrc ? "scale-100 lg:scale-150" : ""}>
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
                                alt={"image of " + image.title}
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
                  <Image alt=""
                    width={240}
                    height={240}
                    className="rounded-md " src={image.src} priority />
                  <h1 className="mt-[-1.5rem] rounded-md text-white font-bold bg-gradient-to-t from-black to-transparent w-full text-center">
                    {image.title}
                  </h1>
                  {image.videoSrc && (
                    <PlayCircle className="absolute w-12 h-12" color="white" />
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
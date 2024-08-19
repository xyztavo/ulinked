"use client";
import { useParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { ArrowLeftCircleIcon, Camera } from "lucide-react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import * as gallery from "../../config.gallery.json";

import { ThemeSwitch } from "@/components/theme-switch";

export default function Album() {
  const params = useParams<{ albumRoute: string }>();
  const results = gallery.albums.filter(
    (album) => album.route == params.albumRoute,
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-4">
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
      <div className="flex flex-row gap-6">
        <Button isIconOnly onPress={() => window.location.replace("/")}>
          <ArrowLeftCircleIcon />
        </Button>
        <ThemeSwitch />
        <Button isIconOnly color="secondary" onPress={onOpen}>
          <Camera />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl">{params.albumRoute}</h1>
        {results.map((album, i) => {
          return (
            <div
              key={i}
              className="flex flex-row flex-wrap items-center justify-center gap-8"
            >
              {album.images.map((image, i) => {
                const {
                  isOpen: isImageOpen,
                  onOpen: onImageOpen,
                  onOpenChange: onImageOpenChange,
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                } = useDisclosure();

                return (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    onClick={onImageOpen}
                  >
                    <Modal
                      isOpen={isImageOpen}
                      onOpenChange={onImageOpenChange}
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col">
                              {image.title}
                            </ModalHeader>
                            <ModalBody className="flex flex-row items-center justify-center flex-wrap">
                              <img
                                alt={"image of " + image.title}
                                src={image.src}
                              />
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
                    <img alt="" className="w-60 rounded-md " src={image.src} />
                    <h1 className=" mt-[-1.5rem] rounded-md  text-white  font-bold bg-gradient-to-t from-black to-transparent  w-full text-center">
                      {image.title}
                    </h1>
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

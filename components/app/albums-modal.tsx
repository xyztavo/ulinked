import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { motion } from "framer-motion";

import gallery from "@/config/config.gallery";

export function AlbumsModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  return (
    <Modal className="font-mono" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">My Albums</ModalHeader>
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
              <Button className="text-white" color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

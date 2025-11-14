import config from "@/config/config";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { LanyardResponse } from "./linktree";
import { Music } from "lucide-react";

export function Spotify({ data }: { data?: LanyardResponse }) {
  const {
    isOpen: isSpotifyOpen,
    onOpen: onSpotifyOpen,
    onOpenChange: onSpotifyOpenChange,
  } = useDisclosure();

  return (
    <>
      {/* spotify trigger */}
      {data?.data.spotify && config.lanyard && (
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
      {/* spotify modal */}
      <Modal
        isOpen={isSpotifyOpen}
        onOpenChange={onSpotifyOpenChange}
        className="font-mono"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
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
                          "_blank",
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
    </>
  );
}

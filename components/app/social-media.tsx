import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Music,
  YoutubeIcon,
} from "lucide-react";
import { Button } from "@heroui/button";

import { DiscordIcon, SpotifyIcon, TiktokIcon } from "@/components/icons/icons";
import config from "@/config";

export default function SocialMedia() {
  return (
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
      {config.tiktokLink && (
        <Button
          isIconOnly
          className="text-foreground hover:text-white bg-transparent shadow-custom hover:bg-black"
          size="sm"
          onPress={() => window.open(config.tiktokLink, "_blank")}
        >
          <span className="absolute inset-0 bg-gradient-to-l from-pink-600 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Icon content */}
          <span className="relative z-10">
            <TiktokIcon />
          </span>
        </Button>
      )}
      {config.discordLink && (
        <Button
          isIconOnly
          className="text-foreground hover:text-white bg-transparent shadow-custom hover:bg-[#5865F2]"
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
      {config.youtubeLink && (
        <Button
          isIconOnly
          className="text-foreground hover:text-white bg-transparent shadow-custom hover:bg-[#c4302b]"
          size="sm"
          onPress={() => window.open(config.youtubeLink, "_blank")}
        >
          <YoutubeIcon />
        </Button>
      )}
      {config.whatsAppLink && (
        <Button
          isIconOnly
          className="text-foreground hover:text-white bg-transparent shadow-custom hover:bg-[#25d366]"
          size="sm"
          onPress={() => window.open(config.whatsAppLink, "_blank")}
        >
          <YoutubeIcon />
        </Button>
      )}
      {config.mailLink && (
        <Button
          isIconOnly
          className="text-foreground hover:text-white bg-transparent shadow-custom hover:bg-[#c4302b]"
          size="sm"
          onPress={() => window.open(config.mailLink, "_blank")}
        >
          <Mail />
        </Button>
      )}
    </div>
  );
}

import { ConfigProps } from "../types/config";

const config: ConfigProps = {
  options: {
    blog: true,
    gallery: false, // this will only hide the gallery page, you can still access it by going to its respective routes.
    umimic: true, // this is for the ai chatbot that mimics you
  },
  nickname: "ustav",
  lanyard: {
    active: true /* if you don't wish to expose your Discord activities with lanyard, set to false */,
    discordId: "801073563368947742",
  },
  accentColor: "#7300ff",
  avatarImgSrc: "/assets/profile.png",
  buttons: [
    {
      title: "Luna AI - Promoção Relâmpago",
      link: "https://lunai.monster",
      special: true,
    },
    {
      title: "developer instagram",
      link: "https://www.instagram.com/ustav.dev/",
    },
    {
      title: "personal instagram",
      link: "https://www.instagram.com/luna.ustav/",
    },
    {
      title: "edits tiktok",
      link: "https://www.tiktok.com/@ustav.go",
    },
  ],
  githubLink: "https://github.com/xyztavo",
  instagramLink: "https://www.instagram.com/luna.ustav/",
  tiktokLink: "https://www.tiktok.com/@ustav.go",
  linkedInLink: "https://www.linkedin.com/in/gustavo-luna-6a33942aa/",
  discordLink: "https://discord.com/users/801073563368947742",
  ytMusicLink:
    "" /* if you don't wish the button to appear, you can either leave it blank or omit it */,
  youtubeLink: "https://www.youtube.com/@ustav_o",
  spotifyLink: "https://open.spotify.com/user/314j255v3f5u2yvilbdzywnsxps4",
  footer: "made with ❤️, ustav",
};

export default config;

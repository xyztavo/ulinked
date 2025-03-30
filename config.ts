import { Config } from "./types/config";

const config: Config = {
  options: {
    blog: true,
    gallery: true, // this will only hide the gallery page, you can still access it by going to its respective routes.
  },
  nickname: "ustav",
  lanyard: {
    active: true, /* if you don't wish to expose your Discord activities with lanyard, set to false */
    discordId: "801073563368947742",
  },
  accentColor: "#7300ff",
  avatarImgSrc: "/assets/profile.png",
  buttons: [
    {
      title: "edits - youtube",
      link: "https://www.youtube.com/@ustav_o/featured",
    },
    {
      title: "edits - instagram",
      link: "https://www.instagram.com/ustav.go/",
    },
    {
      title: "my projects",
      link: "https://uprojects.vercel.app/",
    },
    {
      title: "github for this repo",
      link: "https://github.com/xyztavo/ulinked",
    },
  ],
  githubLink: "https://github.com/xyztavo",
  instagramLink: "https://www.instagram.com/luna.ustav/",
  linkedInLink: "https://www.linkedin.com/in/gustavo-luna-6a33942aa/",
  discordLink: "https://discord.com/users/801073563368947742",
  ytMusicLink: "", /* if you don't wish the button to appear, you can either leave it blank or omit it */
  youtubeLink: "https://www.youtube.com/@ustav_o",
  spotifyLink: "https://open.spotify.com/user/314j255v3f5u2yvilbdzywnsxps4",
  footer: "made with ❤️, ustav",
};

export default config;

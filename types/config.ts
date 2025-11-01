export interface ConfigProps {
  options: Options;
  nickname: string;
  lanyard: Lanyard;
  accentColor: string;
  avatarImgSrc: string;
  buttons: Button[];
  githubLink?: string;
  instagramLink?: string;
  tiktokLink?: string;
  linkedInLink?: string;
  discordLink?: string;
  ytMusicLink?: string;
  youtubeLink?: string;
  spotifyLink?: string;
  whatsAppLink?: string;
  mailLink?: string;
  footer: string;
}

interface Button {
  title: string;
  link: string;
}

interface Lanyard {
  active: boolean;
  discordId: string;
}

interface Options {
  gallery: boolean,
  blog: boolean,
  umimic: boolean,
}
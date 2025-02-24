export interface Config {
  blog: boolean;
  nickname: string;
  lanyard: Lanyard;
  accentColor: string;
  avatarImgSrc: string;
  buttons: Button[];
  githubLink?: string;
  instagramLink?: string;
  linkedInLink?: string;
  discordLink?: string;
  ytMusicLink?: string;
  youtubeLink?: string;
  spotifyLink?: string;
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

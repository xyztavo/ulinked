export type SiteConfig = typeof siteConfig;
import * as config from "../config.json";

export const siteConfig = {
  name: config.nickname + " bio",
  description: config.nickname + " bio",
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

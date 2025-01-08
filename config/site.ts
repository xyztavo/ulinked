export type SiteConfig = typeof siteConfig;
import * as config from "../config.json";

export const siteConfig = {
  name: config.nickname + " bio",
  description: config.nickname + " bio",
  links: {
    github: config.githubLink,
  },
};

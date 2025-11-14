export type UmimicConfigT = {
  apiBaseUrl?: string;
  greeting: string;
  personalities?: Personality[];
};

type Personality = {
  name: string;
  prompt: string;
};

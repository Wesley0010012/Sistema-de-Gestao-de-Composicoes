import type { Score } from "./Score";

export type Section = {
  id: number;
  key: {
    root: string;
    mode: string;
  };
  scores: Score[];
};

import type { Composer } from "./Composer";
import type { Genre } from "./Genre";
import type { Section } from "./Section";

export type Work = {
  id: number;
  title: string;
  subtitle?: string | null;
  catalogNumber?: number | null;
  opusNumber?: number | null;
  yearComposition: number;
  description?: string;

  genres: Genre[];
  composers: Composer[];
  sections: Section[];
};

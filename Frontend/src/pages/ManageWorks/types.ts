export type ComposerOption = {
  label: string;
  value: number;
};

export type ScoreForm = {
  id?: number;
  instrumentId: number | "";
  path: string;
  file: File | null;
};

export type SectionForm = {
  id?: number;
  keyRoot: string;
  keyMode: string;
  scores: ScoreForm[];
};

export type WorkFormState = {
  title: string;
  subtitle: string;
  catalogNumber: string;
  opusNumber: string;
  yearComposition: string;
  description: string;
  genres: number[];
  composers: ComposerOption[];
  sections: SectionForm[];
};

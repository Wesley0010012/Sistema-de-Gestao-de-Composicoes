import type { CustomDate } from "./CustomDate";
import type { Nationality } from "./Nationality";
import type { Period } from "./Period";

export type Composer = {
  id: number;
  name: string;
  birthDate: CustomDate;
  deathDate: CustomDate | null;
  photoPath: string | null;
  nationality: Nationality;
  periods: Array<Period>;
};

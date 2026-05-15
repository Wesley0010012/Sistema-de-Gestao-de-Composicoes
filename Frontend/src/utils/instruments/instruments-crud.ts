import type { Instrument } from "../../types/Instrument";
import { api } from "../api";

export async function getAllInstruments(): Promise<Instrument[]> {
  return await api.get("/works/instruments").then((response) => response.data);
}

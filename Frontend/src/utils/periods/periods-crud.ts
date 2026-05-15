import type { Period } from "../../types/Period";
import { api } from "../api";

export async function getAllPeriods(): Promise<Period[]> {
  return await api.get("/composers/periods").then((response) => response.data);
}

import type { Nationality } from "../../types/Nationality";
import { api } from "../api";

export async function getAllNationalities(): Promise<Nationality[]> {
  return await api
    .get("/composers/nationalities")
    .then((response) => response.data);
}

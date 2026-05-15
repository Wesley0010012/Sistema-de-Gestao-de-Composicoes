import type { Genre } from "../../types/Genre";
import { api } from "../api";

export async function getAllGenres(): Promise<Genre[]> {
  return await api
    .get("/works/genres")
    .then((response) => response.data);
}

import { api } from "../api";
import type { KeyOption } from "../../types/KeyOption";

export async function getAllKeyRoots(): Promise<KeyOption[]> {
  return api.get("/works/keys/roots").then((response) => response.data);
}

export async function getAllKeyModes(): Promise<KeyOption[]> {
  return api.get("/works/keys/modes").then((response) => response.data);
}

import type { Token } from "../../types/Token";
import { api } from "../api";

const TOKEN_STORAGE_KEY = "composers_admin_token";

export async function login(email: string, password: string): Promise<Token> {
  return api
    .post("/auth/login", {
      email,
      password,
    })
    .then((response) => response.data);
}

export function saveToken(token: Token) {
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
}

export function getSavedToken(): Token | null {
  const rawToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!rawToken) return null;

  return JSON.parse(rawToken) as Token;
}

export function isAuthenticated(): boolean {
  const token = getSavedToken();
  if (!token) return false;

  return new Date(token.expiresAt).getTime() > Date.now();
}

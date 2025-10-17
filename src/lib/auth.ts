import { apiFetch } from "./api";

// lib/auth.ts
let tokenCache: string | null = null;

// In a real app, use secure cookies or localStorage + encryption
export function setToken(token: string) {
  tokenCache = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
}

export function getToken() {
  if (tokenCache) return tokenCache;
  if (typeof window !== "undefined") {
    tokenCache = localStorage.getItem("token");
  }
  return tokenCache;
}

export function clearToken() {
  tokenCache = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}
export async function verifyToken() {
  try {
    const res = await apiFetch("/api/auth/me");
    return res.data?.user || null
  } catch {
    clearToken();
    return null;
  }
}
// src/hooks/useAuth.ts
import { getSpotifyAuthUrl } from "../utils/auth";

export const useAuth = () => {
  const login = () => {
    getSpotifyAuthUrl();
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return { login, logout };
};

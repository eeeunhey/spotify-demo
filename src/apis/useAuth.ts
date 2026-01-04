// src/hooks/useAuth.ts
import { useQueryClient } from "@tanstack/react-query";
import { getSpotifyAuthUrl } from "../utils/auth";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const login = () => {
    getSpotifyAuthUrl();
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    queryClient.clear();
  };

  return { login, logout };
};

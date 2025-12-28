import { useMutation } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import type { exchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
  return useMutation<exchangeTokenResponse, Error, {code:string,codeVerifier:string}>({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
    },
  });
};

export default useExchangeToken;
 
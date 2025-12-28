import axios from "axios";

import type { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth";
import { CLIENT_ID, SECRET_ID } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";

const encodedCredentials = btoa(`${CLIENT_ID}:${SECRET_ID}`);

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
    try {
      const body = new URLSearchParams({
        grant_type: "client_credentials",
      });

      const response = await axios.post<ClientCredentialTokenResponse>(
        "https://accounts.spotify.com/api/token",
        body,
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch client credential token");
    }
  };

export const exchangeToken = async (
  code: string,
  codeVerifier: string
): Promise<ExchangeTokenResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";

    if (!CLIENT_ID || !REDIRECT_URI) {
      throw new Error("Missing require parameters");
    }
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Fetch Auth Exchange Token Error:", error);
    throw new Error("Fail to fetch Auth Exchange Token");
  }
};
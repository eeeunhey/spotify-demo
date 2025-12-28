import axios from "axios";

import type { ClientCredentialTokenResponse, exchangeTokenResponse } from "../models/auth";
import { clientId, redirectUri, secretId } from "../configs/authConfig";

const encodedCredentials = btoa(`${clientId}:${secretId}`);

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

export const exchangeToken = async (code: string, codeVerifier: string):Promise<exchangeTokenResponse> => {
  try {
    // gettoken을 여기서 구현
    const url = "https://accounts.spotify.com/api/token";
    if(!clientId || !redirectUri){
      throw new Error("Missing required paramertters")
    }
    const body = new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });

    const response = await axios.post(url, body,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch token");
  }
};

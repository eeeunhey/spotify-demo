import axios from "axios";

import type { ClientCredentialTokenResponse } from "../models/auth";
import { clientId, secretId } from "../configs/authConfig";


// Base64 인코딩
const encodedCredentials = btoa(`${clientId}:${secretId}`);

// 클라이언트 자격 증명 토큰을 가져오는 함수
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

import { clientId } from '../configs/authConfig';
import { redirectUri } from '../configs/commonConfig';
import type { AuthUrlParams } from '../models/auth';
import { base64encode, generateRandomString, sha256 } from './crypto';

export const getSpotifyAuthUrl = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const client_Id = clientId;
  const redirect_Uri = redirectUri;

  const scope = 'user-read-private user-read-email';
  const authUrl = new URL('https://accounts.spotify.com/authorize');


  window.localStorage.setItem('code_verifier', codeVerifier);

  if (clientId && redirectUri) {
    const params: AuthUrlParams = {
      response_type: 'code',
      client_id: client_Id,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirect_Uri,
    };

    authUrl.search = new URLSearchParams(Object.entries(params)).toString();
    window.location.href = authUrl.toString(); 
  }
};
import type {
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetplaylistItemsRequest,
  GetPlaylistRequest,
  GetPlaylistResponse,
  CreatePlaylistRequest,
  Playlist
} from "../models/playlist";
import api from "../utils/api";

// 타입을 따로 만들자
export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch current user playlists");
  }
};

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<GetPlaylistResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async (
  params: GetplaylistItemsRequest
): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist items");
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  try {
    const {name, playlistPublic, collaborative, description} = params
    const response = await api.post(`/users/${user_id}/playlists`, {
        name,
        public:playlistPublic,
        collaborative,
        description,
    });
    return response.data;
  } catch {
    throw new Error("fail to create playlist");
  }
};

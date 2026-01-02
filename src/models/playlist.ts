import type { ApiResponse } from "./apiResponse";
import type { ExternalUrls, Image, Owner, Followers } from "./commonType";
import type { Track, Episode } from "./track";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface GetplaylistItemsRequest extends GetPlaylistRequest {
  offset?: number;
  limit?: number;
}

/** playlist items 응답이 "items 배열 + paging" 형태면 보통 이렇게 감쌉니다 */
export type PlaylistTracksPaging = ApiResponse<PlaylistTrack>;

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;
export type GetPlaylistResponse = Playlist;

/** TODO: 여기 ApiResponse<> 안에 뭐가 들어가는지 정해야 함 */
export type GetplaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist" | string;
  uri?: string;
}

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface Playlist extends SimplifiedPlaylist {
  followers?: Followers;
  tracks?: PlaylistTracksPaging;
}

export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: Owner | null;
  is_local?: boolean;
  track?: Track | Episode | null;
}

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

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;
export type GetPlaylistResponse = Playlist;
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
  tracks?: ApiResponse<PlaylistTrack>;
}

export interface PlaylistTrack extends SimplifiedPlaylist {
  added_at?: string | null;
  added_by?: Owner | null;
  is_local?: boolean;
  track?: Track | Episode | null;
}

export interface CreatePlaylistRequest {
	name:string;
	playlistPublic?:boolean;
	collaborative?: boolean;
	description?: string;
}
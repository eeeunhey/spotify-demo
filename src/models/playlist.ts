import type { ApiResponse } from "./apiResponse";
import type { ExternalUrls, Image, Owner, Followers } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string; // track,episode 등을 섞어 받을 때 사용
}


export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;
export type GetPlaylistResponse = Playlist;



export type PlaylistTracksPaging = ApiResponse<PlaylistTrack>;


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


export interface Track {
  id?: string;
  name?: string;
  duration_ms?: number;
  preview_url?: string | null;
  external_urls?: ExternalUrls;

  href?: string;
  uri?: string;
  type?: "track" | string;

  artists?: Artist[];
  album?: Album;

  /** 있으면 유용한 필드들 */
  explicit?: boolean;
  popularity?: number;
  track_number?: number;
  is_playable?: boolean;
}

export interface Artist {
  id?: string;
  name?: string;
  external_urls?: ExternalUrls;

  href?: string;
  uri?: string;
  type?: "artist" | string;
}

export interface Album {
  id?: string;
  name?: string;
  images?: Image[];
  external_urls?: ExternalUrls;

  href?: string;
  uri?: string;
  type?: "album" | string;
}


export interface Episode {
  id?: string;
  name?: string;
  duration_ms?: number;
  audio_preview_url?: string | null;

  external_urls?: ExternalUrls;
  images?: Image[];

  href?: string;
  uri?: string;
  type?: "episode" | string;

  /** 있으면 유용 */
  explicit?: boolean;
  release_date?: string;
}

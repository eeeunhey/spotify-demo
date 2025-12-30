import type { ApiResponse } from './apiResponse';
import type { ExternalUrls, Image, Owner } from './commonType';
export interface GetCurrentUserPlaylistRequest {
    limit?:number,
    offset?:number
}

// 객체타입으로 데이터를 전달하는것이 아니기때문에 interface 사용이 어렵다
// 그래서 type로 지정
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>

export interface SimplifiedPlaylist {
  collaborative?: boolean;
  description?: string;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner:Owner;
  public?: boolean;
  snapshot_id?:string;
  tracks?: {
    href?:string;
    total?:number;
  };
  type?:string;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?:string;
  fields?:string;
  additional_types?: string;
}

export type GetPlaylistResponse = Playlist;

export interface Playlist extends SimplifiedPlaylist {
  followers?: {
    total?: number;
  };
  tracks?: {
    href?: string;
    total?: number;
    items?: PlaylistTrackItem[];
  };
}

export interface PlaylistTrackItem {
  added_at?: string;
  track?: Track;
}

export interface Track {
  id?: string;
  name?: string;
  duration_ms?: number;
  preview_url?: string | null;
  external_urls?: ExternalUrls;
  artists?: Artist[];
  album?: Album;
}
export interface Artist {
  id?: string;
  name?: string;
  external_urls?: ExternalUrls;
}

export interface Album {
  id?: string;
  name?: string;
  images?: Image[];
  external_urls?: ExternalUrls;
}
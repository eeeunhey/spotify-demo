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


import type { ApiResponse } from "./apiResponse";
import type { Artist } from "./artist";
import type { ExternalUrls, Image, Restriction } from "./commonType";
export interface getNewReleasesResponse {
  albums: ApiResponse<SimplifiedAlbum>;
}

export interface SimplifiedAlbum {
  album_type: string;
  total_tracks: number; 
  available_markets?: string[];
  external_urls: ExternalUrls;

  href: string;
  id: string;
  images: Image[];

  name: string;
  release_date: string;
  release_date_precition: string;
  restrictions?: Restriction;
  type: string;
  uri: string;

  artists: Artist[];
}

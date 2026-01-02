import type { ExternalUrls, Image } from "./commonType";


export interface Restriction {
  reason?: string;
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
  explicit?: boolean;
  popularity?: number;
  track_number?: number;
  is_playable?: boolean;


  available_markets?: string[];
  disc_number?: number;

  external_ids?: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };

  linked_from?: Track;
  restrictions?: Restriction;
  is_local?: boolean;
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

  explicit?: boolean;
  release_date?: string;
}

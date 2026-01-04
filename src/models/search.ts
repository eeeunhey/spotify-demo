import type { SimplifiedAlbum } from "./album";
import type { ApiResponse } from "./apiResponse";
import type { Artist } from "./artist";
import type { SimplifiedPlaylist } from "./playlist";
import type { Episode, Show, SimplifiedAudioBook, SimplifiedEpisode, Track } from "./track";

export enum SEARCH_TYPE {
  Track = "track",
  Album = "album",
  Playlist = "playlist",
  Show = "show",
  Episode = "episode",
  AudioBook = "audiobook",
  Artist = "artist",
}

export interface SearchRequestParams {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

export interface SearchResponse {
    artists?: ApiResponse<Artist>;
    albums?: ApiResponse<SimplifiedAlbum>;
    track?: ApiResponse<Track>;
    palylists?:ApiResponse<SimplifiedPlaylist>;
    show?:ApiResponse<Show>;
    episode?:ApiResponse<SimplifiedEpisode>;
    audiobook?:ApiResponse<SimplifiedAudioBook>
}

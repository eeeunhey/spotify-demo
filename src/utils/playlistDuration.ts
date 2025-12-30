// 곡 수에 따른 시간 계산기 위해 추가
import type { Playlist } from "../models/playlist";

export const sumPlaylistDurationMs = (playlist?: Pick<Playlist, "tracks">): number => {
  const items = playlist?.tracks?.items ?? [];
  return items.reduce((acc, item) => acc + (item.track?.duration_ms ?? 0), 0);
};

export const formatDurationKo = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}시간 ${String(minutes).padStart(2, "0")}분 ${String(seconds).padStart(2, "0")}초`;
  }
  return `${minutes}분 ${String(seconds).padStart(2, "0")}초`;
};

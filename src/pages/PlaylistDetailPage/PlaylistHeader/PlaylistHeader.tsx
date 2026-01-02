import { Grid, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import {
  HeaderWrap,
  CoverWrap,
  CoverImage,
  Title,
  Description,
  MetaRow,
  OwnerName,
} from "./playlistHeader.style";
import { formatDurationKo, sumPlaylistDurationMs } from "../../../utils/playlistDuration";
import type { Playlist } from "../../../models/playlist";
import DefaultImage from "../../../common/components/DefaultImage";

type Props = {
  playlist: Playlist;
};

const PlaylistHeader = ({ playlist }: Props) => {
  const title = playlist.name?.trim() || "제목 없는 플레이리스트";
  const imageUrl = playlist.images?.[0]?.url || "";
  const ownerName = playlist.owner?.display_name?.trim() || "알 수 없음";
  const totalTracks = playlist.tracks?.total ?? 0;

  // description 안전 처리
  const rawDesc = playlist.description?.trim();
  const description =
    !rawDesc || rawDesc.toLowerCase() === "null"
      ? "플레이리스트 설명이 없습니다."
      : rawDesc;

  const totalMs = sumPlaylistDurationMs(playlist);
  const durationText = totalMs > 0 ? formatDurationKo(totalMs) : "";

  return (
    <HeaderWrap>
      <Grid container spacing={3} alignItems="flex-end" wrap="nowrap">
        <Grid>
          <CoverWrap>
            {imageUrl ? (
              <CoverImage src={imageUrl} alt={title} />
            ) : (
              <DefaultImage
                sx={{
                  width: "100%",
                  height: "100%",
                  minWidth: "unset",
                  borderRadius: "inherit",
                  boxShadow: "none",
                }}
              >
                <MusicNoteIcon sx={{ fontSize: 64 }} />
              </DefaultImage>
            )}
          </CoverWrap>
        </Grid>

        <Grid>
          <Typography
            variant="overline"
            sx={{
              display: "block",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.14em",
              opacity: 0.9,
            }}
          >
            플레이리스트
          </Typography>

          <Title variant="h1">{title}</Title>

          <Description variant="body2">{description}</Description>

          <MetaRow>
            <OwnerName>{ownerName}</OwnerName>

            {totalTracks > 0 && (
              <>
                <span className="dot">•</span>
                <span>{totalTracks.toLocaleString()}곡</span>
              </>
            )}

            {durationText && (
              <>
                <span className="dot">•</span>
                <span>{durationText}</span>
              </>
            )}
          </MetaRow>
        </Grid>
      </Grid>
    </HeaderWrap>
  );
};

export default PlaylistHeader;

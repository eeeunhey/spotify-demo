
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DefaultImage from "../../common/components/DefaultImage";
import type { Playlist } from "../../models/playlist";
import {
  sumPlaylistDurationMs,
  formatDurationKo,
} from "../../utils/playlistDuration";

type Props = {
  playlist: Playlist;
};

const HeaderWrap = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 3),
  minHeight: 320,
  display: "flex",
  alignItems: "flex-end",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.55) 100%)",
}));

const CoverWrap = styled(Box)(({ theme }) => ({
  width: 232,
  height: 232,
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
  flexShrink: 0,
}));

const CoverImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(2rem, 5vw, 4.5rem)",
  fontWeight: 500,
  lineHeight: 1.18,
  letterSpacing: "-0.02em",
  wordBreak: "break-word",
  marginTop: theme.spacing(0.5),
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
  marginTop: theme.spacing(1),
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

const MetaRow = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.25),
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  color: theme.palette.common.white,
  fontSize: 14,
  "& .dot": { opacity: 0.8 },
}));

const OwnerName = styled("span")({ fontWeight: 700 });

const PlaylistHeader = ({ playlist }: Props) => {
  const title = playlist.name?.trim() || "제목 없는 플레이리스트";
  const imageUrl = playlist.images?.[0]?.url || "";
  const ownerName = playlist.owner?.display_name?.trim() || "알 수 없음";
  const totalTracks = playlist.tracks?.total ?? 0;

  // 2) 총 재생시간 계산 → 문자열로 변환
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

          {playlist.description ? (
            <Description variant="body2">{playlist.description}</Description>
          ) : null}

          <MetaRow>
            <OwnerName>{ownerName}</OwnerName>
            {totalTracks && (
              <>
                <span className="dot">•</span>
                <span>{totalTracks.toLocaleString()}곡</span>
              </>
            )}

            {durationText ? (
              <>
                <span className="dot">•</span>
                <span>{durationText}</span>
              </>
            ) : null}
          </MetaRow>
        </Grid>
      </Grid>
    </HeaderWrap>
  );
};

export default PlaylistHeader;

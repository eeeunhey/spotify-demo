import { TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { PlaylistTrack } from "../../../models/playlist";
import type { Episode, Track } from "../../../models/track";
import { formatDate, formatDuration } from "../../../utils/date";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": { backgroundColor: theme.palette.action.hover },
  "& .MuiTableCell-root": { borderBottom: "none" },
}));

function isEpisode(track: Track | Episode): track is Episode {
  return "description" in track;
}

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const track = item?.track ?? null;

  if (!track) {
    return (
      <StyledTableRow>
        <TableCell>{index}</TableCell>
        <TableCell>Unknown</TableCell>
        <TableCell>Unknown</TableCell>
        <TableCell>{formatDate(item?.added_at)}</TableCell>
        <TableCell align="right">{formatDuration(0)}</TableCell>
      </StyledTableRow>
    );
  }

  const title = track?.name ?? "Unknown";
  const album = isEpisode(track) ? "Episode" : track?.album?.name ?? "Unknown";
  const durationMs = track?.duration_ms ?? 0;

  return (
    <StyledTableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{album}</TableCell>
      <TableCell>{formatDate(item?.added_at)}</TableCell>
      <TableCell align="right">{formatDuration(durationMs)}</TableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;

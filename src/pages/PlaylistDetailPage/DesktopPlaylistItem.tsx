import { TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { PlaylistTrack } from "../../models/playlist";
import type { Episode, Track } from "../../models/track";
import { formatDate, formatDuration } from "../../utils/date";


interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

function isEpisode(track: Track | Episode): track is Episode {
  return "description" in track;
}

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const track = item?.track ?? null;

  if (!track) {
    return (
      <StyledTableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell>Unknown</TableCell>
        <TableCell>Unknown</TableCell>
        <TableCell>{formatDate(item?.added_at)}</TableCell>
        <TableCell align="right">00:00</TableCell>
      </StyledTableRow>
    );
  }

  const title = track.name ?? "no name";
  const albumName = isEpisode(track) ? "N/A" : track.album?.name ?? "Unknown";
  const addedAt = formatDate(item?.added_at ?? null);
  const duration = formatDuration(track.duration_ms);

  return (
    <StyledTableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{albumName}</TableCell>
      <TableCell>{addedAt}</TableCell>
      <TableCell align="right">{duration}</TableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;

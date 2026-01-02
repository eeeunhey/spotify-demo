import { TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { PlaylistTrack } from "../../models/playlist";
import type { Episode, Track } from "../../models/track";
import { formatDate, formatDuration } from "../../utils/date";


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

const isEpisode = (track?: Track | Episode | null): track is Episode => {
  return track?.type === "episode";
};

type Props = {
  item: PlaylistTrack;
  index: number; // 테이블에서 # 표시용
};

const DesktopPlaylistItem = ({ item, index }: Props) => {
  const track = item.track;

  return (
    <StyledTableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{track?.name ?? "Unknown"}</TableCell>
      <TableCell>
        {isEpisode(track) ? "—" : (track as Track)?.album?.name ?? "—"}
      </TableCell>
      <TableCell>{formatDate(item.added_at)}</TableCell>
      <TableCell align="right">
        {isEpisode(track) ? "N/A" : formatDuration((track as Track)?.duration_ms)}
      </TableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;

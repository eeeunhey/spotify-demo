import { TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { PlaylistTrack } from "../../../models/playlist";
import { formatDate, formatDuration } from "../../../utils/date";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const Row = styled(TableRow)(({ theme }) => ({
  "&:hover": { backgroundColor: theme.palette.action.hover },
  "& .MuiTableCell-root": { borderBottom: "none" },
}));

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const track = item?.track;
  const isEpisode = !!track && "description" in track;

  return (
    <Row>
      <TableCell>{index}</TableCell>
      <TableCell>{track?.name ?? "Unknown"}</TableCell>
      <TableCell>{isEpisode ? "Episode" : track?.album?.name ?? "Unknown"}</TableCell>
      <TableCell>{formatDate(item?.added_at)}</TableCell>
      <TableCell align="right">{formatDuration(track?.duration_ms ?? 0)}</TableCell>
    </Row>
  );
};

export default DesktopPlaylistItem;

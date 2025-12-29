import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  styled,
  Typography,
  Box,
} from "@mui/material";

const PlayListItemContainer = styled(ListItemButton)(({ theme, selected }) => ({
  padding: "10px 16px",
  borderRadius: "8px",
  marginBottom: "4px",
  transition: theme.transitions.create(["all"], {
    duration: theme.transitions.duration.shorter,
  }),
  backgroundColor: selected ? theme.palette.action.selected : "transparent",
  borderLeft: `4px solid ${selected ? "#DB5B05" : "transparent"}`,
  "&:hover": {
    background: `linear-gradient(90deg, rgba(219, 91, 5, 0.15) 0%, rgba(219, 91, 5, 0) 100%)`,
    transform: "translateX(4px)",
    borderLeft: `4px solid rgba(219, 91, 5, 0.5)`,
  },
}));

const PlaylistAvatar = styled(Avatar)(({ theme }) => ({
  width: "48px",
  height: "48px",
  borderRadius: "4px",
  boxShadow: theme.shadows[2],
}));

interface PlaylistItemProps {
  image: string | null;
  name: string;
  artistName: string | null;
  id: string;
  handleClick: (id: string) => void;
  selected?: boolean;
  totalTracks?: number;
}

const PlaylistItem = ({
  image,
  name,
  artistName,
  id,
  handleClick,
  selected,
  totalTracks,
}: PlaylistItemProps) => {
  return (
    <PlayListItemContainer
      onClick={() => handleClick(id)}
      selected={selected || false}
    >
      <ListItemAvatar sx={{ minWidth: "56px" }}>
        {image ? (
          <PlaylistAvatar src={image} alt={name} variant="rounded" />
        ) : (
          <PlaylistAvatar variant="rounded" sx={{ bgcolor: "divider" }}>
            🎵
          </PlaylistAvatar>
        )}
      </ListItemAvatar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box sx={{ overflow: "hidden", marginRight: "16px" }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {artistName}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: "text.disabled",
            fontWeight: 400,
            whiteSpace: "nowrap",
          }}
        >
          {totalTracks ?? 0} songs
        </Typography>
      </Box>
    </PlayListItemContainer>
  );
};

export default PlaylistItem;

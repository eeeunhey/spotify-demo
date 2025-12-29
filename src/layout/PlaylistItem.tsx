import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

const PlayListItemContainer = styled(ListItemButton)(({ theme, selected }) => ({
  padding: "12px 16px",
  borderRadius: "12px",
  marginBottom: "4px",
  transition: "all 0.2s ease",
  backgroundColor: selected ? "rgba(238, 140, 42, 0.12)" : "transparent",
  
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    transform: "scale(1.02)",
  },
}));

const PlaylistAvatar = styled(Avatar)({
  width: "56px", 
  height: "56px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
});

const PlaylistName = styled(Typography)({
  fontWeight: 600,
  fontSize: "1rem",
  color: "#DB5B05",
  marginBottom: "2px",
});

interface PlaylistItemProps {
  image: string | null;
  name: string;
  artistName: string | null;
  id: string;
  handleClick: (id: string) => void;
  selected?: boolean;
}

const PlaylistItem = ({
  image,
  name,
  artistName,
  id,
  handleClick,
  selected,
}: PlaylistItemProps) => {
  return (
    <PlayListItemContainer
      onClick={() => handleClick(id)}
      selected={selected || false}
    >
      <ListItemAvatar sx={{ marginRight: "8px" }}>
        {image ? (
          <PlaylistAvatar src={image} alt={name} />
        ) : (
          <PlaylistAvatar variant="rounded" sx={{ bgcolor: "#333" }}>🎵</PlaylistAvatar>
        )}
      </ListItemAvatar>
      
      <ListItemText
        primary={<PlaylistName>{name}</PlaylistName>}
        secondary={
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
            {artistName || "Unknown Artist"}
          </Typography>
        }
      />
    </PlayListItemContainer>
  );
};

export default PlaylistItem;
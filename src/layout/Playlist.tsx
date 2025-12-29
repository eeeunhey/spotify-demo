import { Box } from "@mui/material";
import type { SimplifiedPlaylist } from "../models/playlist";
import PlaylistItem from "./PlaylistItem";

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
  const handleEmptyClick = () => {

  };

  return (
    <Box sx={{ padding: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
      {playlists.map((item) => (
        <PlaylistItem
          key={item.id}
          id={item.id || ""}
          selected={false}
          handleClick={handleEmptyClick}
          name={item.name || "Untitled Playlist"}
          image={item.images?.[0]?.url || null}
          artistName={`Playlist • ${item.owner?.display_name || "Unknown"}`}
          totalTracks={item.tracks?.total || 0} 
        />
      ))}
    </Box>
  );
};

export default Playlist;
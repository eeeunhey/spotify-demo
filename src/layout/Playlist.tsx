import { Box } from "@mui/material";
import type { SimplifiedPlaylist } from "../models/playlist";
import PlaylistItem from "./PlaylistItem";
import { useNavigate } from "react-router";

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
  const navigate = useNavigate()
  const handleClick=(id:string)=>{
    navigate(`/playlist/${id}`)
  }

  return (
    <Box sx={{ padding: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
      {playlists.map((item) => (
        <PlaylistItem
         handleClick={handleClick}
          key={item.id}
          id={item.id || ""}
          selected={false}
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
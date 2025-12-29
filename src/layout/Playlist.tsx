import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import type { SimplifiedPlaylist } from "../models/playlist";
import PlaylistItem from "./PlaylistItem";

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    setSelectedId(id);
    navigate(`/playlist/${id}`);
  };

  return (
    <Box sx={{ padding: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
      {playlists.map((item) => (
        <PlaylistItem
          key={item.id}
          id={item.id || ""}
          selected={selectedId === item.id}
          handleClick={handleItemClick}
          name={item.name || "Untitled Playlist"}
          image={item.images?.[0]?.url || null}
          artistName={`Playlist • ${item.owner?.display_name || "Unknown"}`}
        />
      ))}
    </Box>
  );
};

export default Playlist;
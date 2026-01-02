
import { Navigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import PlaylistHeader from "./PlaylistHeader/PlaylistHeader";


const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <Navigate to="/" />;

  const { data: playlist, isLoading, isError } = useGetPlaylist({
    playlist_id: id,
  });

  if (isLoading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !playlist) {
    return (
      <Box p={3}>
        <Typography variant="h6">플레이리스트를 불러오지 못했어요.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <PlaylistHeader playlist={playlist} />

      <Box p={3}>
        <Typography variant="body1" color="text.secondary">
          PlaylistDetailPage
        </Typography>
      </Box>
    </Box>
  );
};

export default PlaylistDetailPage;

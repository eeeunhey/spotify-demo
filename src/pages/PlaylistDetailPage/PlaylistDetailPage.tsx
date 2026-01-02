import { Navigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import PlaylistHeader from "./PlaylistHeader/PlaylistHeader";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const playlistId = id ?? "";


  const {
    data: playlist,
    isLoading,
    isError,
  } = useGetPlaylist({
    playlist_id: playlistId,
  });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({
    playlist_id: playlistId,
    limit: 10,

  });

  // id 없으면 UI만 리다이렉트 (훅 호출은 이미 위에서 끝)
  if (!id) return <Navigate to="/" />;

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

  console.log("ddd", playlistItems);

  return (
    <Box>
      <PlaylistHeader playlist={playlist} />

      <Box p={3}>
        <Typography variant="body1" color="text.secondary">
          PlaylistDetailPage
        </Typography>

        {isPlaylistItemsLoading ? (
          <CircularProgress />
        ) : playlistItemsError ? (
          <Typography color="error">트랙을 불러오지 못했어요.</Typography>
        ) : (
          <Typography>items loaded</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PlaylistDetailPage;

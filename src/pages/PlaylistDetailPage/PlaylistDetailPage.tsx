import { Navigate, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import PlaylistHeader from "./PlaylistHeader/PlaylistHeader";
import DesktopPlaylistItem from "./DesktopPlaylistItem";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));

const LoadingSpinner = () => (
  <Box py={2} display="flex" justifyContent="center">
    <CircularProgress size={22} />
  </Box>
);

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const playlistId = id ?? ""; // 훅 순서 고정(룰 오브 훅스)

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    isError: isPlaylistError,
  } = useGetPlaylist({ playlist_id: playlistId });

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

  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!id) return <Navigate to="/" />;

  const flatItems = useMemo(() => {
    const pages = playlistItems?.pages ?? [];
    return pages.flatMap((p: any) => p.items ?? []);
  }, [playlistItems]);

  if (isPlaylistLoading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isPlaylistError || !playlist) {
    return (
      <Box p={3}>
        <Typography variant="h6">플레이리스트를 불러오지 못했어요.</Typography>
      </Box>
    );
  }

  return (
    <Box height="100%">
      <PlaylistHeader playlist={playlist} />

      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>앨범</TableCell>
              <TableCell>추가된 날짜</TableCell>
              <TableCell align="right">길이</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isPlaylistItemsLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <LoadingSpinner />
                </TableCell>
              </TableRow>
            ) : playlistItemsError ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography color="error">트랙을 불러오지 못했어요.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {flatItems.map((item: any, index: number) => (
                  <DesktopPlaylistItem
                    key={item?.track?.id ?? `${index}`}
                    item={item}
                    index={index}
                  />
                ))}

                {/* sentinel */}
                <TableRow sx={{ height: "5px" }} ref={ref}>
                  <TableCell colSpan={5} />
                </TableRow>

                {isFetchingNextPage && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <LoadingSpinner />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default PlaylistDetailPage;

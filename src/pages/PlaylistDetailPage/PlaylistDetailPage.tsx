import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import PlaylistHeader from "./PlaylistHeader/PlaylistHeader";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import LoginButton from "../../common/components/LoginButton";
import ErrorMessage from "../../common/components/ErrorMessage";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/" />;

  const {
    data: playlist,
    isLoading,
    isError,
    error: playlistError,
  } = useGetPlaylist({
    playlist_id: id,
  });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });

  const { ref, inView } = useInView({ threshold: 0, rootMargin: "600px" });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const anyError = playlistError || playlistItemsError;
  const is401 = (anyError as any)?.error?.status === 401;

  if (anyError || isError || !playlist) {
    return is401 ? (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        flexDirection="column"
      >
        <Typography variant="h2" fontWeight={700} mb="20px">
          다시 로그인 하세요
        </Typography>
        <LoginButton />
      </Box>
    ) : (
      <ErrorMessage errorMessage="Failed to load" />
    );
  }

  const isEmpty = (playlist?.tracks?.total ?? 0) === 0;

  return (
    <Box>
      <PlaylistHeader playlist={playlist} />

      <Box p={3}>
        {isPlaylistItemsLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : playlistItemsError ? (
          <Typography color="error">트랙을 불러오지 못했어요.</Typography>
        ) : isEmpty ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              py={8}
              gap={2}
            >
              <TextField
                name="search"
                placeholder="플레이리스트에서 검색"
                size="small"
                sx={{
                  width: 360,
                  "& .MuiOutlinedInput-root": { borderRadius: 999 },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="body2" color="text.secondary">
                이 플레이리스트에는 아직 트랙이 없어요.
              </Typography>
            </Box>
          </form>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              width: "100%",
              borderRadius: 2,
              overflow: "auto",
              maxHeight: "calc(100vh - 420px)",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              boxShadow: "none",
              "&::-webkit-scrollbar": { width: 0, height: 0 },
              "&::-webkit-scrollbar-thumb": { background: "transparent" },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <Table stickyHeader sx={{ width: "100%" }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: 56,
                      fontSize: 12,
                      color: "text.secondary",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      backgroundColor: "rgba(18,18,18,0.9)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    #
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      backgroundColor: "rgba(18,18,18,0.9)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      backgroundColor: "rgba(18,18,18,0.9)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    Album
                  </TableCell>
                  <TableCell
                    sx={{
                      width: 140,
                      fontSize: 12,
                      color: "text.secondary",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      backgroundColor: "rgba(18,18,18,0.9)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    Date added
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      width: 110,
                      fontSize: 12,
                      color: "text.secondary",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      backgroundColor: "rgba(18,18,18,0.9)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    Duration
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {playlistItems?.pages.map((page, pageIndex) =>
                  page.items.map((item, itemIndex) => (
                    <DesktopPlaylistItem
                      item={item}
                      key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                      index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    />
                  ))
                )}

                <TableRow>
                  <TableCell colSpan={5} sx={{ borderBottom: "none" }}>
                    <Box
                      ref={ref}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      py={2}
                      sx={{ color: "text.secondary" }}
                    >
                      {isFetchingNextPage ? (
                        <CircularProgress size={22} />
                      ) : hasNextPage ? (
                        <Typography variant="body2" color="text.secondary">
                          더 불러오는 중…
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          더 찾아보기
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default PlaylistDetailPage;

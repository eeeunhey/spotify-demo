import { Navigate, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import SearchIcon from "@mui/icons-material/Search";

import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import PlaylistHeader from "./PlaylistHeader/PlaylistHeader";
import DesktopPlaylistItem from "./DesktopPlaylistItem";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: 8,
  overflowY: "auto",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));

const HeadCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  fontWeight: 700,
  background: theme.palette.background.paper,
}));

const SkeletonRow = () => (
  <TableRow>
    <TableCell sx={{ borderBottom: "none", width: 56 }}>
      <Skeleton variant="text" width={18} />
    </TableCell>
    <TableCell sx={{ borderBottom: "none" }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Skeleton variant="rounded" width={48} height={48} />
        <Box flex={1} minWidth={0}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Box>
      </Box>
    </TableCell>
    <TableCell sx={{ borderBottom: "none" }}>
      <Skeleton variant="text" width="50%" />
    </TableCell>
    <TableCell sx={{ borderBottom: "none", width: 140 }}>
      <Skeleton variant="text" width="60%" />
    </TableCell>
    <TableCell sx={{ borderBottom: "none", width: 90 }} align="right">
      <Skeleton variant="text" width="50%" />
    </TableCell>
  </TableRow>
);

const EmptyState = () => (
  <Box px={3} py={6}>
    <Typography variant="h5" fontWeight={800} mb={2}>
      플레이리스트에 곡이 없어요
    </Typography>

    <Typography color="text.secondary" mb={3}>
      노래나 에피소드를 검색해서 플레이리스트를 채워보세요.
    </Typography>

    <TextField
      fullWidth
      placeholder="곡 또는 에피소드 검색"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      sx={{
        maxWidth: 520,
        "& .MuiOutlinedInput-root": {
          borderRadius: 999,
        },
      }}
    />
  </Box>
);

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const playlistId = id ?? "";

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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rootEl, setRootEl] = useState<Element | null>(null);

  useEffect(() => {
    setRootEl(containerRef.current);
  }, []);

  const [sentinelRef, inView] = useInView({
    root: rootEl,
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!id) return <Navigate to="/" replace />;

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

  const isEmpty = (playlist?.tracks?.total ?? 0) === 0 || flatItems.length === 0;

  return (
    <Box height="100%">
      <PlaylistHeader playlist={playlist} />

      <StyledTableContainer ref={containerRef}>
        {isEmpty && !isPlaylistItemsLoading && !playlistItemsError ? (
          <EmptyState />
        ) : (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <HeadCell sx={{ width: 56 }}>#</HeadCell>
                <HeadCell>제목</HeadCell>
                <HeadCell>앨범</HeadCell>
                <HeadCell sx={{ width: 140 }}>추가한 날짜</HeadCell>
                <HeadCell sx={{ width: 90 }} align="right">
                  <TimerOutlinedIcon fontSize="small" />
                </HeadCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isPlaylistItemsLoading ? (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </>
              ) : playlistItemsError ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ borderBottom: "none" }}>
                    <Typography color="error">
                      트랙을 불러오지 못했어요.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {flatItems.map((item: any, index: number) => (
                    <DesktopPlaylistItem
                      key={item?.track?.id ?? item?.track?.uri ?? `${index}`}
                      item={item}
                      index={index}
                    />
                  ))}

                  <TableRow ref={sentinelRef as any}>
                    <TableCell colSpan={5} sx={{ borderBottom: "none", height: 8 }} />
                  </TableRow>

                  {isFetchingNextPage && (
                    <>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <SkeletonRow key={`next-${i}`} />
                      ))}
                    </>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        )}
      </StyledTableContainer>
    </Box>
  );
};

export default PlaylistDetailPage;

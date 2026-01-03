import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  InputBase,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { useEffect, useMemo, useRef, useState } from "react";
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
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));

const SearchWrap = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1.2, 1.5),
  borderRadius: 12,
  background: theme.palette.action.hover,
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const playlistId = id ?? "";
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const { ref: sentinelRef, inView } = useInView({
    root: containerRef.current,
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const flatItems = useMemo(() => {
    const pages = playlistItems?.pages ?? [];
    return pages.flatMap((p: any) => p.items ?? []);
  }, [playlistItems]);

  if (!id) return <Navigate to="/" replace />;

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

  const isEmpty = !isPlaylistItemsLoading && !playlistItemsError && flatItems.length === 0;

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <Box height="100%">
      <PlaylistHeader playlist={playlist} />

      <StyledTableContainer ref={containerRef}>
        {isEmpty ? (
          <Box height="100%" display="flex" alignItems="center" justifyContent="center" px={2}>
            <Box width="min(520px, 100%)">
              <Typography variant="h6" mb={1.5}>
                플레이리스트에 트랙이 없어요
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2.5}>
                검색으로 음악을 찾아서 추가해보세요.
              </Typography>

              <Box component="form" onSubmit={onSubmitSearch}>
                <SearchWrap elevation={0}>
                  <SearchIcon fontSize="small" />
                  <InputBase
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="곡/앨범을 검색해보세요"
                  />
                </SearchWrap>
              </Box>
            </Box>
          </Box>
        ) : (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>앨범</TableCell>
                <TableCell>추가된 날짜</TableCell>
                <TableCell align="right">
                  <TimerOutlinedIcon />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isPlaylistItemsLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell width={60}>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="60%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell width={140}>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell width={90} align="right">
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))
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

                  <TableRow ref={sentinelRef}>
                    <TableCell colSpan={5} sx={{ p: 0, height: 1 }} />
                  </TableRow>

                  {isFetchingNextPage && (
                    <>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <TableRow key={`fetch-${i}`}>
                          <TableCell width={60}>
                            <Skeleton variant="text" />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="text" />
                            <Skeleton variant="text" width="60%" />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="text" />
                          </TableCell>
                          <TableCell width={140}>
                            <Skeleton variant="text" />
                          </TableCell>
                          <TableCell width={90} align="right">
                            <Skeleton variant="text" />
                          </TableCell>
                        </TableRow>
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

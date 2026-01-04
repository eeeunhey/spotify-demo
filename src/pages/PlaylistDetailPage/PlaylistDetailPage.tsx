import {
  Box,
  CircularProgress,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

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

import {
  PageWrap,
  BodyWrap,
  CenterCol,
  TableSurface,
  HeadCell,
  HeadCellIndex,
  HeadCellDate,
  HeadCellDuration,
  LoadMoreRow,
  BottomCell,
} from "./PlaylistDetailPage.styles";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/" />;

  const {
    data: playlist,
    isLoading,
    isError,
    error: playlistError,
  } = useGetPlaylist({ playlist_id: id });

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
    <PageWrap>
      <PlaylistHeader playlist={playlist} />
      {isEmpty && <EmptyPlaylistWithSearch />}
      <BodyWrap>
        {isPlaylistItemsLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : playlistItemsError ? (
          <Typography color="error">트랙을 불러오지 못했어요.</Typography>
        ) : isEmpty ? (
          <CenterCol>
            <Typography variant="h6" fontWeight={700}>
              아직 트랙이 없어요
            </Typography>
            <Typography variant="body2" color="text.secondary">
              트랙을 추가한 뒤 다시 확인해보세요.
            </Typography>
          </CenterCol>
        ) : (
          <TableContainer component={TableSurface as any}>
            <Table stickyHeader sx={{ width: "100%" }} size="small">
              <TableHead>
                <TableRow>
                  <HeadCellIndex>#</HeadCellIndex>
                  <HeadCell>Title</HeadCell>
                  <HeadCell>Album</HeadCell>
                  <HeadCellDate>Date added</HeadCellDate>
                  <HeadCellDuration align="right">Duration</HeadCellDuration>
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
                  <BottomCell colSpan={5}>
                    <LoadMoreRow ref={ref}>
                      {isFetchingNextPage ? (
                        <CircularProgress size={22} />
                      ) : hasNextPage ? (
                        <Typography variant="body2" color="text.secondary">
                          더 불러오는 중…
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        ></Typography>
                      )}
                    </LoadMoreRow>
                  </BottomCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </BodyWrap>
    </PageWrap>
  );
};

export default PlaylistDetailPage;

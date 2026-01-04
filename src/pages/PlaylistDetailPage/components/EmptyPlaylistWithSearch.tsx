import { Box, IconButton, TextField, Typography, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo, useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../layout/components/LodingSpinner";

const ResultArea = styled(Box)({
  marginTop: 12,
  height: 360,
  overflowY: "auto",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

const EmptyPlaylistWithSearch = ({ onClose }: { onClose?: () => void }) => {
  const [keyword, setKeyword] = useState("");

  const {
    data,
    isLoading,
    error,
    hasNextPage = false,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const tracks = useMemo(() => {
    return (
      data?.pages.flatMap((page: any) => page?.tracks?.items ?? page?.track?.items ?? []) ?? []
    );
  }, [data]);

  const hasResults = tracks.length > 0;
  const showLoading = isLoading && keyword.trim() !== "";
  const showNoResult = keyword.trim() !== "" && !showLoading && !hasResults;

  return (
    <Box
      sx={{
        position: "relative",
        p: 3,
        borderRadius: 2,
        backgroundColor: "rgba(41, 41, 41, 0.1)",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
      >
        <CloseIcon />
      </IconButton>

      <Typography fontSize={20} fontWeight={700} mb={2} color="white">
        플레이리스트에 추가할 곡을 찾아보세요
      </Typography>

      <TextField
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="곡 또는 에피소드 검색하기"
        size="small"
        sx={{
          width: 320,
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      />

      <ResultArea>
        {error ? (
          <Typography variant="body2" color="error" mt={2}>
            검색 중 오류가 발생했어요.
          </Typography>
        ) : showLoading ? (
          <Box py={2} display="flex" justifyContent="center">
            <LoadingSpinner />
          </Box>
        ) : hasResults ? (
          <SearchResultList
            list={tracks}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        ) : showNoResult ? (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {`No Result for "${keyword}"`}
          </Typography>
        ) : null}
      </ResultArea>
    </Box>
  );
};

export default EmptyPlaylistWithSearch;

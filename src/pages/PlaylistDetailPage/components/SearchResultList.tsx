import { useInView } from "react-intersection-observer";
import type { Track } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import LoadingSpinner from "../../../layout/components/LodingSpinner";

const StyledTableContainer = styled(TableContainer)(({  }) => ({
  width: "100%",
  background: "transparent",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": { backgroundColor: theme.palette.action.hover },
  "& .MuiTableCell-root": { borderBottom: "none" },
}));

const AlbumImage = styled("img")({
  borderRadius: 6,
  width: 44,
  height: 44,
  objectFit: "cover",
  flexShrink: 0,
});

interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <StyledTableContainer>
      <Table size="small" sx={{ tableLayout: "fixed" }}>
        <TableBody>
          {list.map((track) => {
            const imageUrl = track.album?.images?.[0]?.url;
            const artistName = track.artists?.[0]?.name ?? "Unknown Artist";
            const albumName = track.album?.name ?? "-";

            return (
              <StyledTableRow key={track.id}>
                {/* 왼쪽: 곡 + 아티스트 */}
                <TableCell sx={{ width: "60%" }}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    {imageUrl ? <AlbumImage src={imageUrl} alt={track.name} /> : null}

                    <Box minWidth={0}>
                      <Typography fontWeight={700} noWrap>
                        {track.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {artistName}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                {/* 가운데: 앨범 */}
                <TableCell sx={{ width: "28%" }}>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {albumName}
                  </Typography>
                </TableCell>

                {/* 오른쪽: 버튼 */}
                <TableCell sx={{ width: "12%" }} align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 999, px: 2 }}
                  >
                    추가하기
                  </Button>
                </TableCell>
              </StyledTableRow>
            );
          })}

          {/* 무한 스크롤 센티넬 */}
          <TableRow>
            <TableCell colSpan={3} sx={{ p: 0 }}>
              <div ref={ref} style={{ height: 1 }} />
              {isFetchingNextPage ? (
                <Box py={2} display="flex" justifyContent="center">
                  <LoadingSpinner />
                </Box>
              ) : null}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default SearchResultList;

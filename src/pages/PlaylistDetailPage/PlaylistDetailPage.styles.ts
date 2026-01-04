import { styled } from "@mui/material/styles";
import { Box, Paper, TableCell, Typography } from "@mui/material";

export const PageWrap = styled(Box)(() => ({
  width: "100%",
}));

export const BodyWrap = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const TopBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
}));

export const SearchForm = styled("form")(() => ({
  width: "100%",
}));

export const SearchRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const SearchHint = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontSize: 13,
}));

export const CenterCol = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(8, 0),
  textAlign: "center",
  gap: theme.spacing(1),
}));

export const TableSurface = styled(Paper)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.spacing(1),
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
}));

export const HeadCell = styled(TableCell)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  backgroundColor: "rgba(18,18,18,0.9)",
  backdropFilter: "blur(8px)",
}));

export const HeadCellIndex = styled(HeadCell)(() => ({
  width: 56,
}));

export const HeadCellDate = styled(HeadCell)(() => ({
  width: 140,
}));

export const HeadCellDuration = styled(HeadCell)(() => ({
  width: 110,
}));

export const BottomCell = styled(TableCell)(() => ({
  borderBottom: "none",
}));

export const LoadMoreRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2, 0),
  color: theme.palette.text.secondary,
}));

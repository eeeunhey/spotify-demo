// PlaylistDetailPage.styles.ts
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";

export const PageWrap = styled(Box)(({  }) => ({
  width: "100%",
}));

export const BodyWrap = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const CenterCol = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(8, 0),
  textAlign: "center",
}));

export const TableWrap = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  overflow: "auto",
}));

export const RightActionRow = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: "flex",
  justifyContent: "flex-end",
}));

export const ClickText = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

export const SearchPanel = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const SearchPanelHeader = styled(Box)(({  }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const SearchTitle = styled(Typography)(({  }) => ({
  fontSize: 28,
  fontWeight: 800,
  letterSpacing: -0.2,
}));

export const CloseX = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  fontSize: 28,
  lineHeight: 1,
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

export const LoadMoreWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(2, 0),
}));

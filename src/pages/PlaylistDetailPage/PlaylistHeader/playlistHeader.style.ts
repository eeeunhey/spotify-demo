import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HeaderWrap = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 3),
  minHeight: 320,
  display: "flex",
  alignItems: "flex-end",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.55) 100%)",
}));

export const CoverWrap = styled(Box)(({ theme }) => ({
  width: 232,
  height: 232,
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
  flexShrink: 0,
}));

export const CoverImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(2rem, 5vw, 4.5rem)",
  fontWeight: 500,
  lineHeight: 1.18,
  letterSpacing: "-0.02em",
  wordBreak: "break-word",
  marginTop: theme.spacing(0.5),
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
  marginTop: theme.spacing(1),
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

export const MetaRow = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.25),
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  color: theme.palette.common.white,
  fontSize: 14,
  "& .dot": { opacity: 0.8 },
}));

export const OwnerName = styled("span")({
  fontWeight: 700,
});

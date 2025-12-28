import { Box, Menu, MenuItem, styled } from "@mui/material";

export const ProfileContainer = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
  borderRadius: 999,
  padding: "4px 6px",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  transition: "background-color 0.15s ease",

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const ProfileMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: 160,
    borderRadius: 12,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    overflow: "hidden",
  },
  "& .MuiList-root": {
    padding: 6,
  },
}));

export const ProfileMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: 8,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

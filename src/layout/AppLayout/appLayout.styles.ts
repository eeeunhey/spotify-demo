
import { Box, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
  gap: "8px",
});


export const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));


export const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  marginBottom: "8px",
  marginRight: "8px",
}));


export const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});


export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "12px 16px",
  color: theme.palette.text.secondary,

  "&:hover": {
    color: theme.palette.text.primary,
  },

  "&.active": {
    color: theme.palette.text.primary,
  },

  "&.active::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "3px",
    height: "60%",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "2px",
  },
}));

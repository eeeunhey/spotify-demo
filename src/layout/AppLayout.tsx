import { Box, styled, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Library from "./components/library/Library";
import LibraryHead from "./components/library/LibraryHead";
import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "./components";

const Layout = styled("div")({
  display: "flex", // 양옆 배치
  height: "100vh",
  padding: "8px",
  gap: "8px",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%", // 100vh
  display: "flex", // 요소들을 쉽게 배치시키기 위해 사용
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%", //width:"331px" 100% 활용
  marginBottom: "8px",
  marginRight: "8px",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
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

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <li>
              <StyledNavLink to="/">
                <HomeIcon />
                <Typography variant="h2" fontWeight={700}>
                  Home
                </Typography>
              </StyledNavLink>
            </li>

            <li>
              <StyledNavLink to="/search">
                <SearchIcon />
                <Typography variant="h2" fontWeight={700}>
                  Search
                </Typography>
              </StyledNavLink>
            </li>
          </NavList>
        </ContentBox>

        <ContentBox height="100%">
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>

      <ContentBox>
        <div style={{ padding: "10px" }}>
          {" "}
          <Navbar />
        </div>

        <Outlet />
      </ContentBox>
    </Layout>
  );
};

export default AppLayout;

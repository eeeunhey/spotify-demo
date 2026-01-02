// AppLayout.tsx
import { Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet } from "react-router-dom";

import Library from "../components/library/Library";
import LibraryHead from "../components/library/LibraryHead";
import { Navbar } from "../components";

import {
  Layout,
  Sidebar,
  ContentBox,
  NavList,
  StyledNavLink,
} from "../AppLayout/appLayout.styles"

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
          <Navbar />
        </div>

        <Outlet />
      </ContentBox>
    </Layout>
  );
};

export default AppLayout;

// src/components/navbar/Navbar.tsx
import { Box } from "@mui/material";
import ProfileMenuView from "./ProfileMenu";
import { useAuth } from "../../../apis/useAuth";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import LoginButton from "../../../common/components/LoginButton";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const { logout } = useAuth();

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
      {userProfile ? (
        <ProfileMenuView
          imageUrl={userProfile.images?.[0]?.url}
          displayName={userProfile.display_name}
          onLogout={() => {
            logout();
            window.location.href = "/";
          }}
        />
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export {Navbar};

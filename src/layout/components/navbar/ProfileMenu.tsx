import { Avatar } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useId, useState } from "react";
import { ProfileContainer, ProfileMenu, ProfileMenuItem } from "./navbar.styles";

type Props = {
  imageUrl?: string;
  displayName?: string;
  onLogout: () => void;
};

const ProfileMenuView = ({ imageUrl, displayName, onLogout }: Props) => {
  const menuId = useId();

  // ✅ anchorEl 타입
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  // ✅ 이벤트 타입
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogoutClick = () => {
    handleClose();
    onLogout();
  };

  return (
    <>
      <ProfileContainer
        onClick={handleOpen}

        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          src={imageUrl}
          alt={displayName ?? "profile"}
          sx={{ width: 32, height: 32 }}
        />

        <ExpandMoreRoundedIcon sx={{ fontSize: 18, opacity: 0.9 }} />
      </ProfileContainer>

      <ProfileMenu

        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted

        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <ProfileMenuItem onClick={handleLogoutClick}>Log out</ProfileMenuItem>
      </ProfileMenu>
    </>
  );
};

export default ProfileMenuView;

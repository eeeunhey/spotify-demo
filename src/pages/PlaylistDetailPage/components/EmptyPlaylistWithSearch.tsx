import { Box, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const EmptyPlaylistWithSearch = ({ onClose }: { onClose?: () => void }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <Box
      sx={{
        position: "relative",
        p: 3,
        borderRadius: 2,
        backgroundColor: "rgba(41, 41, 41, 0.1)",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
      >
        <CloseIcon />
      </IconButton>

      <Typography fontSize={20} fontWeight={700} mb={2} color="white">
        플레이리스트에 추가할 곡을 찾아보세요
      </Typography>

      <TextField
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="곡 또는 에피소드 검색하기"
        size="small"
        sx={{
          width: 320,
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      />
    </Box>
  );
};

export default EmptyPlaylistWithSearch;

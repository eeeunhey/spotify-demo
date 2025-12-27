import { styled } from "@mui/material/styles";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";

type PlayButtonProps = {
  isPlaying?: boolean;
  onClick?: () => void;
  size?: number;
};

const Btn = styled("button")<{ $size: number }>(({ $size }) => ({
  width: $size,
  height: $size,
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  padding: 0,
  display: "grid",
  placeItems: "center",


  background: "rgba(255, 255, 255, 0.22)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",


  boxShadow: "0 8px 18px rgba(0,0,0,0.22)",
  transform: "translateZ(0)",


  transition:
    "transform .22s cubic-bezier(0.2, 0.9, 0.2, 1), " +
    "box-shadow .22s ease, " +
    "background-color .22s ease",

  "&:hover": {
    // scale만 살짝 + 그림자 조금만
    transform: "translateZ(0) scale(1.04)",
    boxShadow: "0 10px 22px rgba(0,0,0,0.26)",
    background: "rgba(255, 255, 255, 0.28)",
  },

  "&:active": {
    transform: "translateZ(0) scale(0.98)",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(255,255,255,0.35), 0 10px 22px rgba(0,0,0,0.26)",
  },

  willChange: "transform, box-shadow",
}));

export default function PlayButton({
  isPlaying = false,
  onClick,
  size = 46,
}: PlayButtonProps) {
  const iconSize = Math.round(size * 0.64);

  return (
    <Btn type="button" onClick={onClick} $size={size} aria-label={isPlaying ? "Pause" : "Play"}>
      {isPlaying ? (
        <PauseRoundedIcon sx={{ fontSize: iconSize, color: "#fff", filter: "drop-shadow(0 2px 8px rgba(0,0,0,.45))" }} />
      ) : (
        <PlayArrowRoundedIcon sx={{ fontSize: iconSize, color: "#fff", ml: "2px", filter: "drop-shadow(0 2px 8px rgba(0,0,0,.45))" }} />
      )}
    </Btn>
  );
}

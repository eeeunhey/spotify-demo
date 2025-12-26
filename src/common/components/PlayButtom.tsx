// PlayButton.tsx
import { styled } from "@mui/material/styles";

type PlayButtonProps = {
  isPlaying?: boolean;
  onClick?: () => void;
  size?: number;
};

const Btn = styled("button")<{ $size: number }>(({ theme, $size }) => ({
  width: $size,
  height: $size,
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",

  background: `linear-gradient(135deg,
    ${theme.palette.primary.main},
    ${theme.palette.primary.light}
  )`,

  display: "grid",
  placeItems: "center",
  boxShadow: "0 6px 18px rgba(0,0,0,.25)",
  transition: "transform .15s ease, box-shadow .15s ease",

  "&:hover": {
    transform: "scale(1.06)",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
  },
  "&:active": {
    transform: "scale(0.96)",
  },
}));

const Icon = styled("svg")({
  width: 24,
  height: 24,
  fill: "#111",
});

export default function PlayButton({
  isPlaying = false,
  onClick,
  size = 48,
}: PlayButtonProps) {
  return (
    <Btn type="button" onClick={onClick} $size={size}>
      {isPlaying ? (
        <Icon viewBox="0 0 24 24">
          <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
        </Icon>
      ) : (
        <Icon viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </Icon>
      )}
    </Btn>
  );
}

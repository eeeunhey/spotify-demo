import { styled, Typography } from "@mui/material";
import PlayButton from "./PlayButtom";

const CardContainer = styled("div")(({ theme }) => ({
  minWidth: "160px",
  width: "100%",
  height: "100%",

  borderRadius: "12px",
  transition: "background-color .2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover .overlay": {
    opacity: 1,
    transform: "translate3d(0, 0, 0) scale(1)",
  },
}));

const AlbumImageWrap = styled("div")({
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
});

const AlbumImage = styled("img")({
  width: "100%",
  height: "auto",
  display: "block",
  borderRadius: "12px",
});

const EllipsisTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",

  textOverflow: "ellipsis",
});

const Overlay = styled("div")({
  position: "absolute",
  right: 10,
  bottom: 10,

  opacity: 0,
  transform: "translate3d(0, 6px, 0) scale(0.96)",
  transition: "opacity .22s ease, transform .22s cubic-bezier(0.2, 0.9, 0.2, 1)",

  willChange: "opacity, transform",
  pointerEvents: "none",
});

interface CardProps {
  name: string | undefined;
  artistName?: string | undefined;
  image: string | undefined;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <CardContainer>
      <AlbumImageWrap>
        <AlbumImage src={image} />
        <Overlay className="overlay">

          <div style={{ pointerEvents: "auto" }}>
            <PlayButton />
          </div>
        </Overlay>
      </AlbumImageWrap>

      <EllipsisTypography variant="h2">{name || "No name"}</EllipsisTypography>
      <EllipsisTypography variant="body1" color="text.secondary">
        {artistName || "No artistName"}
      </EllipsisTypography>
    </CardContainer>
  );
};

export default Card;

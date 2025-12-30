import styled from "@emotion/styled";
import { Box } from "@mui/material";

const DefaultImage = styled(Box)({
  background: `
    linear-gradient(135deg,
      rgba(255,255,255,0.06),
      rgba(255,255,255,0.01)
    ),
    #121212
  `,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: "12px",
  minWidth: "128px",
  width: "20vh",
  height: "20vh",

  border: "1px solid rgba(255,255,255,0.06)",

  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",

  overflow: "hidden",
});

export default DefaultImage;

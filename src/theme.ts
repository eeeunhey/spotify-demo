import { createTheme } from "@mui/material";

const BRAND = {
  main: "#FF8A3D",
  soft: "#FFB26B",
  subtle: "#FFD6A5",
};

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: BRAND.main,
      light: BRAND.soft,
      dark: "#E06B1F",
    },

    secondary: {
      main: "#ffffff",
    },

    background: {
      default: "#0B0B0B",   // 완전 블랙보다 살짝 부드럽게
      paper: "#141414",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#CFCFCF",
    },

    action: {
      hover: "rgba(255, 138, 61, 0.08)", // 오렌지 톤 hover
      active: "rgba(255, 138, 61, 0.16)",
    },
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "24px",
    },
    h2: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "14px",
    },
    subtitle1: {
      fontSize: "0.6875rem",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: BRAND.main,
          color: "#000",
          "&:hover": {
            backgroundColor: BRAND.soft,
          },
        },
        containedSecondary: {
          backgroundColor: "#ffffff",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        },
        sizeLarge: {
          padding: "8px 32px",
          fontWeight: 700,
          fontSize: "16px",
        },
      },
    },
  },
});

export default theme;

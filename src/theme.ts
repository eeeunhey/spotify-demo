import { createTheme } from "@mui/material";

const BRAND = {
  main: "#DB5B05",    
  hover: "#E26412",    
  soft: "#FFB26B",    
  subtle: "#FFD6A5",
};

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: BRAND.main,
      light: BRAND.hover,     
      dark: "#B84A04",      
      contrastText: "#FFFFFF" 
    },

    secondary: {
      main: "#FFFFFF",
    },

    background: {
      default: "#151515",   
      paper: "#1F1F1F",    
    },

    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255,255,255,0.72)", 
    },

    action: {
      hover: "rgba(255,255,255,0.06)",  
      selected: "rgba(219, 91, 5, 0.16)",
      active: "rgba(255,255,255,0.12)",
    },

    divider: "rgba(255,255,255,0.10)",  
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontWeight: 700, fontSize: "24px" },
    h2: { fontSize: "1rem" },
    body1: { fontSize: "14px" },
    subtitle1: { fontSize: "0.6875rem" },
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
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: BRAND.hover,
          },
        },
        containedSecondary: {
          backgroundColor: "#FFFFFF",
          color: "#111111",
          "&:hover": {
            backgroundColor: "#E8E8E8",
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

import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../../apis/useAuth";

type Props = {
  title?: string;
  subtitle?: string;
};

const LoginRequiredPanel = ({
  title = "다시 로그인 하세요",
  subtitle,
}: Props) => {
  const { login } = useAuth();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      minHeight={420}
      flexDirection="column"
    >
      <Typography variant="h2" fontWeight={700} mb="16px">
        {title}
      </Typography>

      {subtitle && (
        <Typography variant="body2" color="text.secondary" mb="20px">
          {subtitle}
        </Typography>
      )}

      <Box display="flex" gap={1.5}>
        <Button
          variant="contained"
          color="inherit"
          sx={{
            borderRadius: 999,
            bgcolor: "grey.800",
            color: "grey.100",
            "&:hover": {
              bgcolor: "grey.700",
            },
          }}
          onClick={login}
        >
          Log in
        </Button>

        <Button
          variant="text"
          color="inherit"
          sx={{ color: "text.secondary" }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          메인페이지로
        </Button>
      </Box>
    </Box>
  );
};

export default LoginRequiredPanel;

import { Button, styled } from '@mui/material'



const CustomButton = styled(Button)(({ theme }) => ({
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,

    "&:hover":{
        backgroundColor:  "rgba(219, 91, 5, 0.08)",
        color:"#DB5B05",
        borderColor: theme.palette.secondary.main,
    },
}))

const LoginButton = () => {
  return (
    <CustomButton color="secondary" size="large" >
      Login
    </CustomButton>
  );
};

export default LoginButton;

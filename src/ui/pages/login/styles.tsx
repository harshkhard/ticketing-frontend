import { Box, Divider, Grid, styled } from "@mui/material";
import { motion } from "framer-motion";

export const LoginContainer = styled(Box)(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    height: "100%",
    width: "100%",
  };
});

export const LoginBox = styled(motion.div)(({ theme }) => {
  return {
    padding: theme.spacing(3),
    boxShadow: theme.shadows[5],
    borderRadius: theme.spacing(1),
    minWidth: "30%",
  };
});

export const LoginButtonContainer = styled(Grid)(({ theme }) => {
  return { marginTop: theme.spacing(3) };
});

export const LoginTitleDivider = styled(Divider)(({ theme }) => {
  return { marginTop: theme.spacing(1) };
});

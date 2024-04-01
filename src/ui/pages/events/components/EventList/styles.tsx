import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";

export const ListContainer = styled(motion.div)(({ theme }) => {
  return {
    display: "flex",
    gap: theme.spacing(2),
    flexDirection: "column",
    padding: theme.spacing(2),
    height: "100%",
  };
});

export const EmptyListContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  };
});

export const ListFlexContainer = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    gap: theme.spacing(2),
    flexWrap: "wrap",
    flexDirection: "row",
  };
});

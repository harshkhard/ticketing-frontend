import { styled } from "@mui/material";
import { motion } from "framer-motion";

export const ListContainer = styled(motion.div)(({ theme }) => {
  return {
    display: "flex",
    gap: theme.spacing(2),
    flexDirection: "column",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
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

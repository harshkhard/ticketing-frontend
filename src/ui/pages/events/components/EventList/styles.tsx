import { styled } from "@mui/material";
import { motion } from "framer-motion";

export const ListContainer = styled(motion.div)(({ theme }) => {
  return {
    display: "flex",
    gap: theme.spacing(2),
    flexDirection: "column",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    height: "100%",
  };
});

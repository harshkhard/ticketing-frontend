import { styled } from "@mui/material";
import { motion } from "framer-motion";

export const ListBox = styled(motion.div)(({ theme }) => {
  return {
    padding: theme.spacing(1),
    borderWidth: 1,
    borderRadius: theme.spacing(0.5),
    boxShadow: theme.shadows[1],
    width: "100%",
    cursor: "pointer",
    backgroundColor: theme.palette.common.white,
    boxSizing: "border-box",
  };
});

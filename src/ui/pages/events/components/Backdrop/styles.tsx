import { Box, styled } from "@mui/material";
import { ANIMATION_DURATION_EVENT } from "../../utils/utils";
import { motion } from "framer-motion";

export const StyledBackdrop = styled(motion.div)(({ theme }) => {
  return {
    backdropFilter: "blur(5px)",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: theme.spacing(1),
    zIndex: 100,
  };
});

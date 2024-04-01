import { styled } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

export const ListBox = styled(motion.div)<{ isDragging: boolean }>(
  ({ theme, isDragging }) => {
    const commonStyles: React.CSSProperties = {
      padding: theme.spacing(1),
      borderWidth: 1,
      borderRadius: theme.spacing(0.5),
      boxShadow: theme.shadows[1],
      cursor: "pointer",
      backgroundColor: theme.palette.common.white,
      position: "relative",
    };

    if (isDragging) {
      return {
        ...commonStyles,
        zIndex: theme.zIndex.modal,
      };
    }

    return {
      ...commonStyles,
    };
  }
);

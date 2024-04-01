import { Box, CircularProgress, Typography } from "@mui/material";
import { StyledBackdrop } from "./styles";
import { AnimatePresence } from "framer-motion";
import { ANIMATION_DURATION } from "../../../login/framer";
import { DEFAULT_LOADER_SÍZE } from "../../../../../utils/constants";

type ListBackdropProps = {
  title: string;
  isActive: boolean;
  isLoader: boolean;
};

export const ListBackdrop = (props: ListBackdropProps) => {
  return (
    <AnimatePresence>
      {props.isActive && (
        <StyledBackdrop
          key={"backdrop"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIMATION_DURATION }}
        >
          {props.isLoader ? (
            <CircularProgress size={DEFAULT_LOADER_SÍZE} />
          ) : (
            <Typography variant="h6" color={"ButtonText"}>
              {props.title}
            </Typography>
          )}
        </StyledBackdrop>
      )}
    </AnimatePresence>
  );
};

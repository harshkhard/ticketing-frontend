import { Box, Grid, styled } from "@mui/material";
import {
  ANIMATION_DURATION_EVENT,
  EVENT_LIST_ANIMATION_DURATION,
} from "./utils/constants";

export const ListsContainer = styled(Grid)(({ theme }) => {
  return {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    padding: theme.spacing(2),
  };
});

export const EventListContainer = styled(Box)<{ isActive?: Boolean }>(
  ({ theme, isActive }) => {
    const commonStyles: React.CSSProperties = {
      transitionDuration: EVENT_LIST_ANIMATION_DURATION,
      borderWidth: 2,
      borderColor: "transparent",
      borderStyle: "solid",
      borderRadius: theme.spacing(1),
    };

    if (isActive) {
      return {
        ...commonStyles,
        borderWidth: 2,
        borderColor: theme.palette.primary.main,
        borderStyle: "solid",
        backdropFilter: "blur(5px)",
      };
    }
    return {
      ...commonStyles,
    };
  }
);

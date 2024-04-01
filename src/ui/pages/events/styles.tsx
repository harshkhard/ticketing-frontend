import { Box, Grid, styled } from "@mui/material";
import {
  ANIMATION_DURATION_EVENT,
  EVENT_LIST_ANIMATION_DURATION,
} from "./utils/utils";

export const ListsContainer = styled(Grid)(({ theme }) => {
  return {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    padding: theme.spacing(2),
  };
});

export const EventListContainer = styled(Box)<{
  isActive?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}>(({ theme, isActive, isLoading, isError }) => {
  const commonStyles: React.CSSProperties = {
    transitionDuration: EVENT_LIST_ANIMATION_DURATION,
    borderWidth: 2,
    borderColor: "transparent",
    borderStyle: "solid",
    position: "relative",
    boxShadow: theme.shadows[5],
    borderRadius: theme.spacing(1),
  };

  if (isActive) {
    return {
      ...commonStyles,
      borderWidth: 2,
      borderColor: isError
        ? theme.palette.error.main
        : theme.palette.primary.main,
      borderStyle: "solid",
    };
  }

  if (isLoading) {
    return {
      ...commonStyles,
    };
  }

  return {
    ...commonStyles,
  };
});

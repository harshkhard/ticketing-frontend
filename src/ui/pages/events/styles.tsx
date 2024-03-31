import { Grid, styled } from "@mui/material";

export const ListsContainer = styled(Grid)(({ theme }) => {
  return {
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%",
    padding: theme.spacing(2),
  };
});

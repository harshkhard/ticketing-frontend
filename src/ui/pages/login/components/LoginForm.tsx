import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { LoginBox, LoginTitleDivider } from "../styles";
import { FORM_SPACING } from "../constants";
import { useLoginHook } from "../hooks/login";
import { DEFAULT_LOADER_SÍZE } from "../../../../utils/constants";

type LoginFormProps = {
  onFormStateChnage: () => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const { userName, handleUserNameChange, loginLoading, handleLogin } =
    useLoginHook();
  return (
    <Grid container direction={"column"} spacing={FORM_SPACING}>
      <Grid item container>
        <Grid item xs={12}>
          <Typography variant="h4">Login</Typography>
          <LoginTitleDivider />
        </Grid>
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          value={userName}
          onChange={handleUserNameChange}
          label={"Enter username"}
          fullWidth
        />
      </Grid>
      <Grid item container justifyContent={"space-between"}>
        <Grid item>
          <Button variant="outlined" onClick={handleLogin}>
            {loginLoading ? (
              <CircularProgress size={DEFAULT_LOADER_SÍZE} />
            ) : (
              "Login"
            )}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={props.onFormStateChnage}
          >
            Create an account
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { FORM_SPACING } from "../constants";
import { LoginBox, LoginTitleDivider } from "../styles";
import { useSignupHook } from "../hooks/signup";
import { DEFAULT_LOADER_SÍZE } from "../../../../utils/constants";

type SignupFormProps = {
  onFormStateChnage: () => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const {
    userName,
    name,
    handleNameChange,
    handleUserNameChange,
    handleSignup,
    signupLoading,
  } = useSignupHook();

  return (
    <Grid container direction={"column"} spacing={FORM_SPACING}>
      <Grid item container>
        <Grid item xs={12}>
          <Typography variant="h4">Create user</Typography>
          <LoginTitleDivider />
        </Grid>
      </Grid>
      <Grid item container spacing={2} direction={"column"}>
        <Grid item>
          <TextField
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            label={"Enter name"}
            fullWidth
          />
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
      </Grid>
      <Grid item container justifyContent={"space-between"}>
        <Grid item>
          <Button variant="outlined" onClick={handleSignup}>
            {signupLoading ? (
              <CircularProgress size={DEFAULT_LOADER_SÍZE} />
            ) : (
              "Sign up"
            )}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={props.onFormStateChnage}
          >
            Already a user?
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

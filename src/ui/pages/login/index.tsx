import { Slide } from "@mui/material";
import { Page } from "../../components/Page";
import { LoginBox, LoginContainer } from "./styles";
import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { FormState } from "./constants";
import { SignupForm } from "./components/SignupForm";

export const Login = () => {
  const [formState, setFormState] = useState(FormState.LOGIN);

  const handleFormStateChange = () => {
    if (formState === FormState.LOGIN) {
      setFormState(FormState.SIGNUP);
    } else {
      setFormState(FormState.LOGIN);
    }
  };

  return (
    <Page>
      <LoginContainer>
        <Slide
          in={formState === FormState.LOGIN}
          mountOnEnter
          unmountOnExit
          direction={"right"}
        >
          <LoginBox>
            <LoginForm onFormStateChnage={handleFormStateChange} />
          </LoginBox>
        </Slide>
        <Slide
          in={formState === FormState.SIGNUP}
          mountOnEnter
          unmountOnExit
          direction={"left"}
        >
          <LoginBox>
            <SignupForm onFormStateChnage={handleFormStateChange} />
          </LoginBox>
        </Slide>
      </LoginContainer>
    </Page>
  );
};

import { Slide } from "@mui/material";
import { Page } from "../../components/Page";
import { LoginBox, LoginContainer } from "./styles";
import { useEffect, useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { FormState } from "./constants";
import { SignupForm } from "./components/SignupForm";
import { AnimatePresence } from "framer-motion";
import {
  ANIMATION_DURATION,
  SlideLeftFrom100,
  SlideLeftFromZero,
  SlideRightFromZero,
} from "./framer";

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
        <AnimatePresence mode="wait">
          {formState === FormState.LOGIN && (
            <LoginBox
              key={"login"}
              initial={{ x: "-100%", opacity: 0 }}
              transition={{ duration: ANIMATION_DURATION }}
              animate={SlideLeftFrom100}
              exit={SlideLeftFromZero}
            >
              <LoginForm onFormStateChnage={handleFormStateChange} />
            </LoginBox>
          )}
          {formState === FormState.SIGNUP && (
            <LoginBox
              key={"signup"}
              initial={{ x: "100%", opacity: 0 }}
              animate={SlideLeftFrom100}
              exit={SlideRightFromZero}
              transition={{ duration: ANIMATION_DURATION }}
            >
              <SignupForm onFormStateChnage={handleFormStateChange} />
            </LoginBox>
          )}
        </AnimatePresence>
      </LoginContainer>
    </Page>
  );
};

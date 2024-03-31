import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { createUser } from "../../../../store/slices/authSlice";

export const useSignupHook = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const dispatch = useAppDispatch();
  const { signupLoading } = useAppSelector((store) => store.auth);

  const handleUserNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(ev.target.value);
  };

  const handleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value);
  };

  const handleSignup = () => {
    dispatch(createUser({ name: name, userName: userName }));
  };

  return {
    name,
    userName,
    handleNameChange,
    handleUserNameChange,
    signupLoading,
    handleSignup,
  };
};

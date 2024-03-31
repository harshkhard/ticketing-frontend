import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { createUser } from "../../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const useSignupHook = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  const { signupLoading } = useAppSelector((store) => store.auth);

  const handleUserNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(ev.target.value);
  };

  const handleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value);
  };

  const handleSignup = async () => {
    try {
      await dispatch(createUser({ name: name, userName: userName })).unwrap();
      onSignup();
    } catch (e) {}
  };

  const onSignup = () => {
    navigation("/events");
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

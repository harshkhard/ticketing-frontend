import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { loginUser } from "../../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const useLoginHook = () => {
  const dispatch = useAppDispatch();

  const { loginLoading } = useAppSelector((store) => store.auth);
  const [userName, setUserName] = useState("");
  const navigation = useNavigate();

  const handleUserNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(ev.target.value);
  };

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ userName: userName })).unwrap();
      onLogin();
    } catch (e) {}
  };

  const onLogin = () => {
    navigation("/events");
  };

  return {
    userName,
    handleUserNameChange,
    handleLogin,
    loginLoading,
  };
};

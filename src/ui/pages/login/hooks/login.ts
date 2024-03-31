import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { loginUser } from "../../../../store/slices/authSlice";

export const useLoginHook = () => {
  const dispatch = useAppDispatch();
  const { loginLoading } = useAppSelector((store) => store.auth);

  const [userName, setUserName] = useState("");

  const handleUserNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(ev.target.value);
  };

  const handleLogin = () => {
    dispatch(loginUser({ userName: userName }));
  };

  return {
    userName,
    handleUserNameChange,
    handleLogin,
    loginLoading,
  };
};

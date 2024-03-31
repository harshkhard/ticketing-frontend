import { useState } from "react";

export const useSignupHook = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  const handleUserNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(ev.target.value);
  };

  const handleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value);
  };

  return {
    name,
    userName,
    handleNameChange,
    handleUserNameChange,
  };
};

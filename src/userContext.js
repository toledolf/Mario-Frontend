import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLevel, setUserLevel] = useState();
  const [cpf, setCpf] = useState();

  useEffect(() => {
    const storedUserLevel = localStorage.getItem("userLevel");
    setUserLevel(storedUserLevel);
  }, []);

  useEffect(() => {
    const storedCpf = localStorage.getItem("cpf");
    setCpf(storedCpf);
  }, []);

  const setUserLevelWithLocalStorage = (newUserLevel) => {
    if (newUserLevel === 1) {
      setUserLevel(newUserLevel);
      localStorage.setItem("userLevel", newUserLevel.toString());
    } else if (newUserLevel === 1000) {
      setUserLevel(newUserLevel);
      localStorage.setItem("userLevel", newUserLevel.toString());
    }
  };

  const setCpfWithLocalStorage = (newCpf) => {
    if (newCpf) {
      setCpf(newCpf);
      localStorage.setItem("cpf", newCpf.toString());
    }
  };

  return (
    <UserContext.Provider
      value={{
        userLevel,
        setUserLevel: setUserLevelWithLocalStorage,
        cpf,
        setCpf: setCpfWithLocalStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};

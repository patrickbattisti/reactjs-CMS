import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setToken = ({ token }) => {
    api.defaults.headers.authorization = `Bearer ${token}`;
  };
  useEffect(() => {
    const userLocal = localStorage.getItem("@cms:user");

    if (userLocal) {
      const userParsed = JSON.parse(userLocal);
      setToken(userParsed);
      return setUser(userParsed);
    }

    setUser({});
  }, []);

  useEffect(() => {
    if (user?.token) {
      setToken(user);
      localStorage.setItem("@cms:user", JSON.stringify(user));
    }
  }, [user]);

  const onLogout = () => {
    localStorage.removeItem("@cms:user");
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, setUser, onLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

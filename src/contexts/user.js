import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLocal = localStorage.getItem("@cms:user");

    if (userLocal) {
      return setUser(JSON.parse(userLocal));
    }

    setUser({});
  }, []);

  useEffect(() => {
    if (user?.token) localStorage.setItem("@cms:user", JSON.stringify(user));
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

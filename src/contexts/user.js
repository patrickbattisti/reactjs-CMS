import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  console.log(user);
  useEffect(() => {
    const userLocal = localStorage.getItem("@cms:user");

    if (userLocal) {
      setUser(JSON.parse(userLocal));
    }
  }, []);

  useEffect(() => {
    if (user?.token) localStorage.setItem("@cms:user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

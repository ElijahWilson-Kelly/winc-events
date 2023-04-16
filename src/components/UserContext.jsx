import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      setCurrentUser(users[0]);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

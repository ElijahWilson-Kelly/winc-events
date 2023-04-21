import { createContext, useState, useEffect } from "react";

export const UsersContext = createContext(null);

export const UsersContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      setAllUsers(users);
      setCurrentUser(users[0]);
    })();
  }, []);

  return (
    <UsersContext.Provider value={{ currentUser, setCurrentUser, allUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

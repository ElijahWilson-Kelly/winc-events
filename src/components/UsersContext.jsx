import { createContext, useState, useEffect } from "react";

export const UsersContext = createContext(null);

/***
 * UserContextProvider
 *  - Provide users context for children
 *
 *  State
 *  - currentUser {object} - current selected user
 *  - allUsers {array} - all available users
 */

export const UsersContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://events-data.onrender.com/users");
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

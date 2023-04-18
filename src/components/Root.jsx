import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      setUsers(users);
    })();
  }, []);

  return (
    <Box>
      <Navigation users={users} setUsers={setUsers} />
      <Outlet context={users} />
    </Box>
  );
};

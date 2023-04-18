import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { Center, Text, useDisclosure } from "@chakra-ui/react";
import { ChangeUserModal } from "./ChangeUserModal";
import { UserContext } from "./UserContext";

export const Navigation = ({ users, setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      setUsers(users);
    })();
  }, []);

  return (
    <header>
      <Center gap={3}>
        <BsPersonCircle
          size="2rem"
          className="icon-hover-grow"
          onClick={onOpen}
        />
        <Text>{currentUser?.name || "Guest"}</Text>
      </Center>

      <nav className="navigation">
        <Link>New Event +</Link>
        <Link to="/">
          <AiOutlineHome size="1.4rem" className="icon-hover-grow" />
        </Link>
      </nav>
      <ChangeUserModal
        onClose={onClose}
        isOpen={isOpen}
        users={users}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </header>
  );
};

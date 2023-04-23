import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { Center, Text, useDisclosure } from "@chakra-ui/react";
import { ChangeUserModal } from "../modals/ChangeUserModal";
import { UsersContext } from "./UsersContext";

/**
 *  Navivation Bar Component
 *  - useDisclosure used for for {changeUserModal}
 *  - useContext used for retrieving users data from {UsersContext}
 */

export const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, setCurrentUser, allUsers } = useContext(UsersContext);

  return (
    <header>
      <Center gap={3}>
        <BsPersonCircle
          size="2rem"
          className="icon-hover-grow"
          onClick={onOpen}
        />
        <Text>Change User</Text>
      </Center>

      <nav className="navigation">
        <Text>{currentUser?.name || "Guest"}</Text>
        <Link to="/">
          <AiOutlineHome size="1.4rem" className="icon-hover-grow" />
        </Link>
      </nav>
      <ChangeUserModal
        onClose={onClose}
        isOpen={isOpen}
        allUsers={allUsers}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </header>
  );
};

import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { Center, Image, Text, useDisclosure } from "@chakra-ui/react";
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
        <Image
          src={currentUser?.image}
          alt="profile of current user"
          height={"40px"}
          width={"40px"}
          borderRadius={"50%"}
          objectFit={"cover"}
          className="icon-hover-grow current-user"
          onClick={onOpen}
        />
        <Text>{currentUser?.name || "Guest"}</Text>
      </Center>

      <nav className="navigation">
        <Link to="/">
          <AiOutlineHome size="1.4rem" className="icon-hover-grow" />
        </Link>
      </nav>

      <ChangeUserModal
        isOpen={isOpen}
        onClose={onClose}
        allUsers={allUsers}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </header>
  );
};

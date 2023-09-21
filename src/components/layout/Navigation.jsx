import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlinePlusCircle, AiOutlineHome } from "react-icons/ai";

import { Center, Image, Text, useDisclosure } from "@chakra-ui/react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export const Navigation = ({ users }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  return (
    <header className="main-header">
      <Center gap={3}>
        <Link to="/login">
          {currentUser ? (
            <Image
              src={currentUser?.image}
              alt="profile of current user"
              height={"40px"}
              width={"40px"}
              borderRadius={"50%"}
              objectFit={"cover"}
              className="icon-hover-grow current-user"
            />
          ) : (
            <BsPersonCircle className="icon-hover-grow" fontSize={"40px"} />
          )}
        </Link>
        <Text>{currentUser?.name || "Guest"}</Text>
      </Center>

      <nav className="navigation">
        <Link to="/event/new">
          <AiOutlinePlusCircle size="1.4rem" className="icon-hover-grow" />
        </Link>
        <Link to="/">
          <AiOutlineHome />
        </Link>
      </nav>
    </header>
  );
};

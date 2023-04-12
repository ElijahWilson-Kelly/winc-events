import React from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { Center, Text, useDisclosure } from "@chakra-ui/react";
import { UserSettingsModal } from "./UserSettingsModal";

export const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <header>
      <Center gap={3}>
        <BsPersonCircle
          size="2rem"
          className="icon-hover-grow"
          onClick={onOpen}
        />

        <Text>Jan Bennet</Text>
      </Center>

      <nav className="navigation">
        <Link to="/">Events</Link>

        <Link to="/event/1">Event</Link>
        <Link to="/">
          <AiOutlineHome size="1.4rem" className="icon-hover-grow" />
        </Link>
      </nav>
      <UserSettingsModal onClose={onClose} isOpen={isOpen} user="elijah" />
    </header>
  );
};

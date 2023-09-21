import {
  Heading,
  Center,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

import animalAvatars from "../../scripts/avaters";

export const NewUserDetails = ({ newUser, setNewUser }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [selectedAvatarIndex, setSelectAvatarIndex] = useState(0);

  let styles = {
    transform: "translateX(1000px)",
    opacity: 0,
  };

  if (newUser) {
    if (!newUser.name) {
      styles = {};
    } else {
      styles = {
        transform: "translateX(-1000px)",
        opacity: 0,
      };
    }
  }

  const handleNameInput = (e) => {
    if (e.keyCode == 16) return; // Shift Key
    if ((e.keyCode > 90 || e.keyCode < 65) && e.keyCode != 8) {
      setNameError("Names can only contain letters");
      return;
    }

    if (e.keyCode == 8) {
      setName((prevName) => prevName.slice(0, prevName.length - 1));
    } else {
      setName((prevName) => prevName + e.key);
    }
    setNameError(null);
  };

  const handleSubmit = () => {
    if (!name) {
      setNameError("No name entered");
    } else {
      setNewUser((user) => ({
        ...user,
        name,
        image: animalAvatars[selectedAvatarIndex].src,
      }));
    }
  };

  return (
    <Center className="change-user-panel" style={styles}>
      <Stack border={"3px solid #FFFFFF55"} borderRadius={"10px"} p={"20px"}>
        <Heading>New User Details</Heading>
        <FormControl isInvalid={nameError}>
          <FormLabel>Enter Name</FormLabel>
          <Input value={name} onChange={handleNameInput} />
          <FormErrorMessage>{nameError}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Select Avatar</FormLabel>
          <Flex gap={"10px"}>
            {animalAvatars.map((animal, index) => {
              let styles = null;
              if (index == selectedAvatarIndex) {
                styles = {
                  outline: "3px solid #66ff66",
                };
              }
              return (
                <Image
                  key={animal.key}
                  src={animal.src}
                  className="avatar"
                  _hover={{
                    cursor: "pointer",
                    transform: "translateY(-5px)",
                  }}
                  style={styles}
                  onClick={() => setSelectAvatarIndex(index)}
                />
              );
            })}
          </Flex>
        </FormControl>
        <Button color="purple" onClick={handleSubmit}>
          Next
        </Button>
      </Stack>
    </Center>
  );
};

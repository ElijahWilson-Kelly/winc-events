import { useState, useContext } from "react";
import {
  Heading,
  Center,
  Flex,
  Stack,
  PinInput,
  PinInputField,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useOutletContext } from "react-router-dom";

/***
 * Used for testing to be deleted!!!
 */
const deleteAllUsers = async () => {
  const users = await fetch("https://events-data.onrender.com/users").then(
    (res) => res.json()
  );
  const userIds = users.map((user) => user.id);

  for (const id of userIds) {
    if (id <= 2) continue;
    const response = await fetch(
      `https://events-data.onrender.com/users/${id}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      }
    );
  }
};

const addUser = async (user, dispatch) => {
  const ACTION = { type: "user_added", payload: user };
  try {
    const response = await fetch("https://events-data.onrender.com/users", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      console.log("error");
    }
  } catch (error) {
    console.log(error.message);
  }
  dispatch(ACTION);
};

export const Passcode = ({ newUser, returnToHomePage }) => {
  const [pinInput, setPinInput] = useState("");
  const [incorrectPin, setIncorrectPin] = useState(false);
  const { setCurrentUser } = useContext(CurrentUserContext);

  const {
    dispatch: { dispatchUsers },
  } = useOutletContext();

  let styles = null;
  if (!newUser?.name) {
    styles = {
      transform: "translateX(1000px)",
      opacity: 0,
    };
  }
  const handleChange = (input) => {
    setIncorrectPin(false);
    setPinInput(input);
  };

  const handleComplete = (passcode) => {
    if (!newUser.passcode) {
      // Creating new User
      const user = { ...newUser, passcode };
      console.log(user);
      setCurrentUser(user);
      addUser(user, dispatchUsers);
      returnToHomePage();
      return;
    }

    if (passcode == newUser.passcode) {
      // Login to old user
      setCurrentUser(newUser);
      returnToHomePage();
      return;
    }

    // Wrong Password
    setPinInput("");
    setIncorrectPin(true);
  };
  return (
    <Center className="change-user-panel" style={styles}>
      <Stack border={"2px solid white"} gap={5} p={20} borderRadius={10}>
        <Heading>Enter Pincode</Heading>
        <FormControl isInvalid={incorrectPin}>
          <Flex justify={"space-between"}>
            <PinInput
              mask
              w={"100%"}
              value={pinInput}
              onChange={handleChange}
              onComplete={handleComplete}
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </Flex>
          <FormErrorMessage>Incorrect Pin</FormErrorMessage>
        </FormControl>
      </Stack>
    </Center>
  );
};

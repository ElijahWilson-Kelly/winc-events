import { Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  return users;
};

export const SelectUserPage = () => {
  const users = useLoaderData();
  console.log(users);
  return (
    <Center className="overlay">
      <Stack>
        <Heading color="white">Select User</Heading>
        <Flex>
          {users.map((user) => (
            <Text key={user.id} color="white">
              {user.name}
            </Text>
          ))}
        </Flex>
      </Stack>
    </Center>
  );
};

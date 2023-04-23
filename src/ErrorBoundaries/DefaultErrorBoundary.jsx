import { Center, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export const DefaultErrorBoundary = () => {
  const error = useRouteError();
  return (
    <Center w={"100vw"} h={"100vh"} bg="blue.200">
      <Stack align={"center"}>
        <Heading>Oops something went wrong</Heading>
        <Text>{error.message}</Text>
      </Stack>
    </Center>
  );
};

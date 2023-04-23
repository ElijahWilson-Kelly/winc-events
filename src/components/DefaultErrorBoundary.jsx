import { useRouteError } from "react-router-dom";

import { Center, Heading, Stack, Text } from "@chakra-ui/react";

/***
 * Default Error Boundary
 *  - renders if there is an error in the app and displays error message
 */

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

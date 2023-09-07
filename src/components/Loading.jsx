import { Center, Stack, Text, Spinner, Heading } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Center py={["100px", "200px"]} px={"20px"}>
      <Stack
        bg={"blue.900"}
        p={["10px", "40px"]}
        borderRadius={"10px"}
        color="white"
        gap={["5px", "10px"]}
        align={"center"}
      >
        <Heading fontWeight={200}>Booting up server</Heading>
        <Text>This can take some time.</Text>
        <Text>Thank you for your patience.</Text>
        <Spinner size="xl" thickness="4px" speed="1s" />
      </Stack>
    </Center>
  );
};

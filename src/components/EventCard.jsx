import { Box, Text, Heading, Flex, Image } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";

export const EventCard = ({ event }) => {
  const maxParagraphLength = 80;
  const { categoryOptions } = useOutletContext();

  const { title, description, categoryIds } = event;
  const startTime = new Date(event.startTime)
    .toLocaleString("en-GB")
    .slice(0, -3);
  const endTime = new Date(event.endTime).toLocaleString("en-GB").slice(0, -3);
  return (
    <Flex
      className="event-card"
      direction={"column"}
      justifyContent={"space-between"}
    >
      <Box>
        <Heading
          fontSize="2xl"
          fontWeight={300}
          color="blue.900"
          mb={2}
          textAlign={"center"}
        >
          {title}
        </Heading>
        <Image
          src={event.image}
          objectFit="cover"
          w={"100%"}
          h={40}
          borderBottom={"5px solid black"}
          borderTop={"5px solid black"}
        />
        <Text color={"gray.600"} fontWeight={200}>
          {description.length > maxParagraphLength
            ? description.slice(0, maxParagraphLength) + "..."
            : description}
        </Text>
      </Box>
      <Box>
        <Flex gap={5} justifyContent={"center"} justifySelf={"flex-end"}>
          {categoryIds.map((id) => {
            const name =
              categoryOptions.find((category) => category.id === id)?.name ||
              "";
            return (
              <Text color={"green.400"} key={id}>
                {name}
              </Text>
            );
          })}
        </Flex>
        <Text fontSize={"xs"} textAlign={"center"} color="gray.500">
          {startTime} - {endTime}
        </Text>
      </Box>
    </Flex>
  );
};

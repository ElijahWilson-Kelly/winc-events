import { Box, Text, Heading, Flex } from "@chakra-ui/react";

export const EventCard = ({ event, categoriesData }) => {
  const maxParagraphLength = 80;

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
        <Heading fontSize="2xl" fontWeight={300} color="blue.900" mb={2}>
          {title}
        </Heading>
        <Text color={"gray.600"} fontWeight={200}>
          {description.length > maxParagraphLength
            ? description.slice(0, maxParagraphLength) + "..."
            : description}
        </Text>
      </Box>
      <Box>
        <Flex gap={5} justifyContent={"center"} justifySelf={"flex-end"}>
          {categoryIds.map((id) => {
            const { name } = categoriesData.find(
              (category) => category.id === id
            );
            return (
              <Text color={"green.400"} key={id}>
                {name}
              </Text>
            );
          })}
        </Flex>
        <Text fontSize={"sm"} textAlign={"center"} color="gray.500">
          {startTime} - {endTime}
        </Text>
      </Box>
    </Flex>
  );
};

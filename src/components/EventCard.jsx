import PropTypes from "prop-types";
import { Box, Text, Heading, Flex, Stack, Image } from "@chakra-ui/react";

export const EventCard = ({ event, categories }) => {
  const maxParagraphLength = 80;

  const { title, description, categoryIds } = event;
  const startTime = new Date(event.startTime)
    .toLocaleString("en-GB")
    .slice(0, -3);
  const endTime = new Date(event.endTime).toLocaleString("en-GB").slice(0, -3);
  return (
    <Stack className="event-card">
      <Image
        src={event.image}
        fallbackSrc="https://www.pikpng.com/pngl/m/106-1069399_iam-add-group1-sorry-no-image-available-clipart.png"
        objectFit="cover"
        w={"100%"}
        height={"180px"}
        minH={"180px"}
        borderBottom={"2px solid"}
        borderColor={"blue.700"}
      />
      <Stack gap={2} p={2}>
        <Box>
          <Text fontSize={"xs"} fontWeight={600} color="gray.600">
            {startTime} - {endTime}
          </Text>
          <Heading fontSize={"1rem"} fontWeight={800}>
            {title}
          </Heading>

          <Text color={"gray.800"} fontWeight={400}>
            {description.length > maxParagraphLength
              ? description.slice(0, maxParagraphLength) + "..."
              : description}
          </Text>
          <Flex gap={5}>
            {categoryIds.map((id) => {
              const { name, color } = categories.find(
                (category) => category.id == id
              );

              return (
                <Text color={color} key={id}>
                  {name}
                </Text>
              );
            })}
          </Flex>
        </Box>
      </Stack>
    </Stack>
  );
};

EventCard.propTypes = {
  event: PropTypes.exact({
    createdBy: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    categoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    attendedBy: PropTypes.arrayOf(PropTypes.number).isRequired,
    location: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.exact({
        comment: PropTypes.string.isRequired,
        commentedBy: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

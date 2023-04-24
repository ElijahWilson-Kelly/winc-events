import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Text, Heading, Flex, Image } from "@chakra-ui/react";

/***
 * Event Card - renders are card component for an event on EventsPage
 *
 *  Props
 *  - event {object}
 *
 *  Hooks
 *  - useOutletContext - get function {getCategoryNameFromId} from Root
 */

export const EventCard = ({ event }) => {
  const maxParagraphLength = 80;
  const { getCategoryNameFromId } = useOutletContext();

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
          fontSize="3xl"
          fontWeight={400}
          color="blue.900"
          m={4}
          textAlign={"center"}
        >
          {title}
        </Heading>
        <Image
          src={event.image}
          fallbackSrc="https://www.pikpng.com/pngl/m/106-1069399_iam-add-group1-sorry-no-image-available-clipart.png"
          objectFit="cover"
          w={"100%"}
          h={40}
          borderBottom={"2px solid"}
          borderTop={"2px solid"}
          borderColor={"blue.700"}
        />
        <Text color={"gray.800"} fontWeight={400} mx={4} my={2}>
          {description.length > maxParagraphLength
            ? description.slice(0, maxParagraphLength) + "..."
            : description}
        </Text>
      </Box>
      <Box>
        <Flex gap={5} justifyContent={"center"} justifySelf={"flex-end"}>
          {categoryIds.map((id) => {
            const name = getCategoryNameFromId(id);
            return (
              <Text color={"green.400"} key={id}>
                {name}
              </Text>
            );
          })}
        </Flex>
        <Text fontSize={"xs"} textAlign={"center"} color="gray.500" mb={5}>
          {startTime} - {endTime}
        </Text>
      </Box>
    </Flex>
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

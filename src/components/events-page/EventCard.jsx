import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Text,
  Heading,
  Flex,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  addAttendanceOnEvent,
  removeAttendanceOnEvent,
} from "../../scripts/middlewareApiCalls";
import { useOutletContext } from "react-router-dom";

export const EventCard = ({ event, categories }) => {
  const maxParagraphLength = 80;

  const { currentUser } = useContext(CurrentUserContext);
  const {
    dispatch: { dispatchEvents },
  } = useOutletContext();

  const { title, description, categoryIds } = event;
  const startTime = new Date(event.startTime)
    .toLocaleString("en-GB")
    .slice(0, -3);
  const endTime = new Date(event.endTime).toLocaleString("en-GB").slice(0, -3);

  const numberOfPeopleAttending = event.attendedBy.length;

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
      <Stack p={2} flexGrow={1} justify={"space-between"}>
        <Box>
          <Text fontSize={"xs"} fontWeight={600} color="gray.600">
            {startTime} - {endTime}
          </Text>
          <Heading fontSize={"1rem"} fontWeight={800}>
            {title}
          </Heading>

          <Text color={"gray.800"} fontSize={"0.8rem"} fontWeight={400}>
            {description.length > maxParagraphLength
              ? description.slice(0, maxParagraphLength) + "..."
              : description}
          </Text>
          <Flex gap={5}>
            {categories.length == 0 ||
              categoryIds.map((id) => {
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
        <Box>
          <Flex align="center" gap={"4px"} pt={"20px"}>
            <Link to={`/event/${event.id}`}>
              <Button>Event</Button>
            </Link>
            {event.attendedBy.includes(currentUser?.id) ? (
              <Button
                onClick={() =>
                  removeAttendanceOnEvent(
                    currentUser.id,
                    event.id,
                    dispatchEvents
                  )
                }
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={() =>
                  addAttendanceOnEvent(currentUser.id, event.id, dispatchEvents)
                }
              >
                Join
              </Button>
            )}
            <Text>
              {numberOfPeopleAttending == 1
                ? "1 person attending"
                : `${numberOfPeopleAttending} people attending`}
            </Text>
          </Flex>
        </Box>
      </Stack>
    </Stack>
  );
};

// EventCard.propTypes = {
//   event: PropTypes.exact({
//     createdBy: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string,
//     categoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,
//     attendedBy: PropTypes.arrayOf(PropTypes.number).isRequired,
//     location: PropTypes.string.isRequired,
//     startTime: PropTypes.string.isRequired,
//     endTime: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     comments: PropTypes.arrayOf(
//       PropTypes.exact({
//         comment: PropTypes.string.isRequired,
//         commentedBy: PropTypes.number.isRequired,
//         id: PropTypes.number.isRequired,
//       })
//     ),
//   }).isRequired,
// };

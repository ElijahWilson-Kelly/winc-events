import React, { useContext } from "react";
import {
  Heading,
  Button,
  Text,
  Image,
  Flex,
  Stack,
  ButtonGroup,
} from "@chakra-ui/react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { UserContext } from "../components/UserContext";

export const loader = async ({ params }) => {
  const response = await fetch(
    `http://localhost:3000/events?id=${params.eventId}`
  );
  const event = (await response.json())[0];
  return event;
};

export const EventPage = () => {
  const users = useOutletContext();
  const { currentUser } = useContext(UserContext);
  const {
    title,
    description,
    image,
    startTime,
    endTime,
    categories,
    createdBy: createdById,
  } = useLoaderData();
  const createdByUser = users.find((user) => user.id === createdById);
  const [startTimeFormated, endTimeFormated] = [startTime, endTime].map(
    (time) => new Date(time).toLocaleString("en-GB").slice(0, -3)
  );
  const createdByCurrentUser = createdById === currentUser?.id;

  return (
    <Flex p={30}>
      <Stack>
        <Heading fontWeight={200} fontSize="3rem">
          {title}
        </Heading>
        <Image src={image} w={"400px"} objectFit="cover" borderRadius={5} />
        <Heading fontWeight={100}>What?</Heading>
        <Text>{description}</Text>
        <Heading fontWeight={100}>When?</Heading>
        <Text>
          {startTimeFormated} - {endTimeFormated}
        </Text>
        <Flex align={"center"} gap={2}>
          <Text>Created By: {createdByUser?.name || "...loading"}</Text>
          <Image
            src={createdByUser?.image || ""}
            boxSize={"50px"}
            borderRadius={"50%"}
            className={createdByCurrentUser ? "current-user" : ""}
          />
        </Flex>

        <ButtonGroup isDisabled={!createdByCurrentUser}>
          <Button
            colorScheme="green"
            variant="outline"
            fontWeight={300}
            w={100}
          >
            Edit
          </Button>
          <Button colorScheme="red" variant="outline" fontWeight={300} w={100}>
            Delete
          </Button>
        </ButtonGroup>
        {!createdByCurrentUser ? (
          <Text color="purple.500">
            ! Only the user that created the event can edit and delete event.
          </Text>
        ) : undefined}
      </Stack>
    </Flex>
  );
};

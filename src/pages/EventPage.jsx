import React, { useContext, useState } from "react";
import {
  Heading,
  Button,
  Text,
  Image,
  Flex,
  Stack,
  ButtonGroup,
  Grid,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { UsersContext } from "../components/UsersContext";

import { CommentsSection } from "../components/CommentSections";
import { EventFormModal } from "../modals/EventFormModal";
import { ConfirmDeleteModal } from "../modals/ConfirmDeleteModal";

export const loader = async ({ params }) => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  return await fetchData(
    `https://events-data.onrender.com/events/${params.eventId}`
  );
};

export const EventPage = () => {
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirmDelete,
    onOpen: onOpenConfirmDelete,
    onClose: onCloseConfirmDelete,
  } = useDisclosure();

  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser, allUsers } = useContext(UsersContext);
  const {
    data: { categories },
    dispatch,
  } = useOutletContext();

  const [formData, setFormData] = useState(useLoaderData);
  const {
    id,
    title,
    description,
    image,
    location,
    categoryIds,
    startTime,
    endTime,
    createdBy: createdById,
    comments = [],
  } = formData;

  const submitEdittedEvent = async (eventDetails) => {
    dispatch({ type: "event_edited", payload: eventDetails });
    setFormData((prevData) => ({
      ...prevData,
      ...eventDetails,
    }));
    try {
      const response = await fetch(
        `https://events-data.onrender.com/events/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
          body: JSON.stringify(eventDetails),
        }
      );
      if (response.ok) {
        toast({
          title: "Event edited",
          description: `Event "${eventDetails.title}" has been edited.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: `Sorry. Something went wrong. Please try again later.`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
      onCloseForm();
    } catch (err) {
      throw Error(err.message);
    }
  };

  const deleteEvent = async () => {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
    if (response.ok) {
      toast({
        title: "Event deleted",
        description: `Event "${title}" has been deleted.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: `Sorry. Something went wrong. Please try again later.`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    navigate("/");
  };

  const createdByUser = allUsers.find((user) => user.id === createdById);
  const [startTimeFormated, endTimeFormated] = [startTime, endTime].map(
    (time) => new Date(time).toLocaleString("en-GB").slice(0, -3)
  );
  const createdByCurrentUser = createdById === currentUser?.id;

  return (
    <>
      <Grid p={30} gap={10} templateColumns={["1fr", null, "1fr 2fr"]}>
        <Stack gap={2}>
          <Heading fontWeight={200} fontSize="3rem">
            {title}
          </Heading>
          <Image src={image} w={"400px"} objectFit="cover" borderRadius={5} />
          <Flex gap={5}>
            {categoryIds.map((id) => {
              const { name, color } = categories.find(
                (category) => category.id == id
              );

              return (
                <Text color={color} key={id} fontSize={"1.2rem"}>
                  {name}
                </Text>
              );
            })}
          </Flex>
          <Heading fontWeight={100}>What?</Heading>
          <Text>{description}</Text>
          <Heading fontWeight={100}>When?</Heading>
          <Text>
            {startTimeFormated} - {endTimeFormated}
          </Text>
          <Heading fontWeight={100}>Created By</Heading>
          <Flex align={"center"} gap={2}>
            <Text>{createdByUser?.name}</Text>
            <Image
              src={createdByUser?.image}
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
              onClick={onOpenForm}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              fontWeight={300}
              w={100}
              onClick={onOpenConfirmDelete}
            >
              Delete
            </Button>
          </ButtonGroup>
          {!createdByCurrentUser ? (
            <Text color="purple.500">
              Only the user that created the event can edit and delete event.
            </Text>
          ) : undefined}
        </Stack>
        <CommentsSection commentsFromServer={comments} eventId={id} />
      </Grid>
      <EventFormModal
        isOpen={isOpenForm}
        onClose={onCloseForm}
        formData={formData}
        onSubmit={submitEdittedEvent}
        id={id}
        categories={categories}
        submitButtonText={"Save"}
      />
      <ConfirmDeleteModal
        isOpen={isOpenConfirmDelete}
        onClose={onCloseConfirmDelete}
        deleteEvent={deleteEvent}
      />
    </>
  );
};

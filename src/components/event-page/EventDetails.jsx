import { useState, useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import {
  Heading,
  Text,
  Image,
  Box,
  Stack,
  Flex,
  ButtonGroup,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { BsCalendar2DateFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import { EditableEventText } from "./EditableEventText";
import {
  EditEventBaseModal,
  ImageSelecterModalBody,
  DateSelecterModalBody,
  CategoriesSelecterModalBody,
} from "../../modals/EditEventBaseModal";
import { useToastDispatch } from "../../hooks/useToastDispatch";

import { editEvent, createEvent } from "../../scripts/middlewareApiCalls";

export const EventDetails = ({ eventData }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    data: { categories, users },
    dispatch: { dispatchEvents },
  } = useOutletContext();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenConfirmDelete,
    onOpen: onOpenConfirmDelete,
    onClose: onCloseConfirmDelete,
  } = useDisclosure();

  const toastDispatch = useToastDispatch();

  const [formData, setFormData] = useState(eventData); // Holds state for changes to event
  const [editing, setEditing] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    setFormData(eventData);
  }, [eventData]);
  useEffect(() => {
    setEditing(formData.id ? false : true);
  }, [formData.id]);

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
  } = formData;

  const createdByUser = users.find((user) => user.id === createdById);
  const [startTimeFormated, endTimeFormated] = [startTime, endTime].map(
    (time) => new Date(time).toLocaleString("en-GB").slice(0, -3)
  );
  const createdByCurrentUser = createdById === currentUser?.id;

  const deleteEvent = () => {};

  const saveEvent = async () => {
    if (id) {
      const success = await editEvent(formData, dispatchEvents);
      if (success) {
        toastDispatch({ type: "event_edited", payload: formData.title });
      }
    } else {
      const success = await createEvent(formData, dispatchEvents);
    }
  };

  // Change form data for given key to given value. Only if value is not dependant on previous value
  const changeFormData = (value, key) => {
    setFormData((previousData) => ({
      ...previousData,
      [key]: value,
    }));
  };

  return (
    <>
      <Stack gap={2}>
        <EditableEventText
          editing={editing}
          value={title}
          placeholder={"Title"}
          styles={{
            fontSize: "3rem",
            fontWeight: 200,
          }}
          onChange={(value) => changeFormData(value, "title")}
        />
        <Box
          position="relative"
          w={"400px"}
          borderRadius={5}
          overflow={"hidden"}
        >
          <Image
            src={image}
            w={"inherit"}
            h={"300px"}
            fallbackSrc="https://www.pikpng.com/pngl/m/106-1069399_iam-add-group1-sorry-no-image-available-clipart.png"
            objectFit="cover"
          />
          <Box
            display={editing || "none"}
            position="absolute"
            top={2}
            right={2}
            bg={"#00000099"}
            p={1}
            borderRadius={10}
            className="icon-hover-grow"
          >
            <FiEdit
              color="white"
              fontSize={"2rem"}
              onClick={() => {
                setModalContent(<ImageSelecterModalBody />);
                onOpen();
              }}
            />
          </Box>
        </Box>

        <Flex gap={5} align={"center"}>
          {categories.length == 0 ||
            categoryIds.map((id) => {
              const { name, color } = categories.find(
                (category) => category.id == id
              );

              return (
                <Text color={color} key={id} fontSize={"1.2rem"}>
                  {name}
                </Text>
              );
            })}
          <Box display={editing || "none"}>
            <AiOutlinePlusCircle
              color="green"
              className="icon-hover-grow"
              fontSize="1.3rem"
              onClick={() => {
                onOpen();
                setModalContent(
                  <CategoriesSelecterModalBody categories={categories} />
                );
              }}
            />
          </Box>
        </Flex>

        <Heading fontWeight={100}>What?</Heading>
        <EditableEventText
          editing={editing}
          value={description}
          placeholder={"Description"}
          onChange={(value) => changeFormData(value, "description")}
        />

        <Heading fontWeight={100}>When?</Heading>
        <Flex gap={"5px"}>
          <Text>
            {startTimeFormated} - {endTimeFormated}
          </Text>
          {editing && (
            <BsCalendar2DateFill
              color="lightgreen"
              fontSize="1.6rem"
              className="icon-hover-grow"
              onClick={() => {
                onOpen();
                setModalContent(<DateSelecterModalBody />);
              }}
            />
          )}
        </Flex>

        <Heading fontWeight={100}>Where?</Heading>
        <EditableEventText
          editing={editing}
          value={location}
          placeholder={"Location"}
          onChange={(value) => changeFormData(value, "location")}
        />
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
          {editing ? (
            <Button
              colorScheme={editing ? "green" : "blue"}
              variant="outline"
              fontWeight={300}
              w={100}
              onClick={() => {
                setEditing(false);
                saveEvent();
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              colorScheme={editing ? "green" : "blue"}
              variant="outline"
              fontWeight={300}
              w={100}
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit
            </Button>
          )}

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

      <EditEventBaseModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        setFormData={setFormData}
        body={modalContent}
      />

      <ConfirmDeleteModal
        isOpen={isOpenConfirmDelete}
        onClose={onCloseConfirmDelete}
        deleteEvent={deleteEvent}
      />
    </>
  );
};

import { useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import {
  Heading,
  Text,
  Image,
  Box,
  Stack,
  Flex,
  Editable,
  EditablePreview,
  EditableTextarea,
  ButtonGroup,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { BsCalendar2DateFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { ImageSelecterModal } from "../../modals/ImageSelecterModal";
import { CategoriesSelecterModal } from "../../modals/CategoriesSelecterModal";
import { DateSelecterModal } from "../../modals/DateSelecterModal";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";

export const EventDetails = ({ eventData }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    data: { categories, users },
    dispatch: { dispatchEvents },
  } = useOutletContext();

  const {
    isOpen: isOpenImageSelecter,
    onOpen: onOpenImageSelecter,
    onClose: onCloseImageSelecter,
  } = useDisclosure();
  const {
    isOpen: isOpenDateSelecter,
    onOpen: onOpenDateSelecter,
    onClose: onCloseDateSelecter,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirmDelete,
    onOpen: onOpenConfirmDelete,
    onClose: onCloseConfirmDelete,
  } = useDisclosure();

  const [formData, setFormData] = useState(eventData); // Holds state for changes to event
  const [editing, setEditing] = useState(formData.id ? false : true);

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
  const [startTimeFormated, endTimeFormated] = [
    formData.startTime,
    formData.endTime,
  ].map((time) => new Date(time).toLocaleString("en-GB").slice(0, -3));
  const createdByCurrentUser = createdById === currentUser?.id;

  const deleteEvent = function () {};

  return (
    <>
      <Stack gap={2}>
        <Editable
          fontWeight={200}
          fontSize="3rem"
          defaultValue={title}
          selectAllOnFocus={false}
          placeholder="Title"
          isDisabled={!editing}
          onChange={(input) =>
            setFormData((prevData) => ({
              ...prevData,
              title: input,
            }))
          }
        >
          <EditablePreview className={editing && "editable-event-details"} />
          <EditableTextarea p={"5px"} />
        </Editable>
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
            <FiEdit color="white" fontSize={"2rem"} />
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
            />
          </Box>
        </Flex>
        <Heading fontWeight={100}>What?</Heading>
        <Editable
          defaultValue={description}
          isDisabled={!editing}
          selectAllOnFocus={false}
          placeholder="description"
          onChange={(input) =>
            setFormData((prevData) => ({
              ...prevData,
              description: input,
            }))
          }
        >
          <EditablePreview className={editing && "editable-event-details"} />
          <EditableTextarea p={"5px"} />
        </Editable>
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
              onClick={onOpenDateSelecter}
            />
          )}
        </Flex>
        <Heading fontWeight={100}>Where?</Heading>

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
                handleSubmit();
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
      <ImageSelecterModal
        isOpen={isOpenImageSelecter}
        onClose={onCloseImageSelecter}
        originalURL={formData.image}
        setFormData={setFormData}
      />
      <DateSelecterModal
        isOpen={isOpenDateSelecter}
        onClose={onCloseDateSelecter}
        originalStartTime={formData.startTime}
        originalEndTime={formData.endTime}
        setFormData={setFormData}
      />
      <ConfirmDeleteModal
        isOpen={isOpenConfirmDelete}
        onClose={onCloseConfirmDelete}
        deleteEvent={deleteEvent}
      />
    </>
  );
};

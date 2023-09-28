import React, { useEffect, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  ModalFooter,
  Button,
  Stack,
  Box,
  Center,
  Flex,
} from "@chakra-ui/react";

export const EditEventBaseModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  body,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      isCentered
      blockScrollOnMount={false}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalBody p={5}>
          {body && React.cloneElement(body, { formData, setFormData })}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>X</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const ImageSelecterModalBody = ({ formData, setFormData }) => {
  return (
    <FormControl>
      <FormLabel>URL:</FormLabel>
      <Textarea
        resize={"none"}
        value={formData.image}
        onChange={(e) => {
          setFormData((prevData) => ({
            ...prevData,
            image: e.target.value,
          }));
        }}
      ></Textarea>
    </FormControl>
  );
};

export const DateSelecterModalBody = ({ formData, setFormData }) => {
  const [endTimeError, setEndTimeError] = useState(null);

  const isValidEndTime = (endTime) => {
    return new Date(endTime).getTime() > new Date(formData.startTime).getTime();
  };

  return (
    <>
      <FormControl>
        <FormLabel>Start Time:</FormLabel>
        <Input
          size="md"
          type="datetime-local"
          value={formData.startTime}
          onChange={(e) => {
            console.log(e.target.value);
            setEndTimeError(null);
            setFormData((prevData) => ({
              ...prevData,
              startTime: e.target.value,
            }));
          }}
        />
      </FormControl>

      <FormControl isInvalid={endTimeError}>
        <FormLabel>End Time:</FormLabel>
        <Input
          size="md"
          type="datetime-local"
          value={formData.endTime}
          min={formData.startTime}
          onChange={(e) => {
            setEndTimeError(null);
            if (isValidEndTime(e.target.value)) {
              setFormData((prevData) => ({
                ...prevData,
                endTime: e.target.value,
              }));
            } else {
              setEndTimeError("Invalid End Time!");
            }
          }}
        />
        <FormErrorMessage>{endTimeError}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export const CategoriesSelecterModalBody = ({
  formData,
  setFormData,
  categories,
}) => {
  return (
    <Flex gap={2} wrap={"wrap"}>
      {categories.map((category) => (
        <Center
          color={"white"}
          bg={category.color}
          opacity={formData.categoryIds.includes(category.id) ? 1 : 0.2}
          w={100}
          h={50}
          borderRadius={50}
          _hover={{
            cursor: "pointer",
          }}
          onClick={() => {
            setFormData((prevData) => {
              const newCategoryIds = prevData.categoryIds.filter(
                (id) => id != category.id
              );
              // If nothing was removed then id wasn't present so we need to add it
              if (newCategoryIds.length == prevData.categoryIds.length) {
                newCategoryIds.push(category.id);
              }

              return {
                ...prevData,
                categoryIds: newCategoryIds,
              };
            });
          }}
        >
          {category.name}
        </Center>
      ))}
    </Flex>
  );
};

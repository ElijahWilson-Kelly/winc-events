import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";

export const DateSelecterModal = ({
  isOpen,
  onClose,
  originalStartTime,
  originalEndTime,
  setFormData,
}) => {
  const [startTime, setStartTime] = useState(originalStartTime);
  const [endTime, setEndTime] = useState(originalEndTime);
  const [endTimeError, setTimeError] = useState(null);

  const handleSubmit = () => {
    const startTimeMilliseconds = new Date(startTime).getTime();
    const endTimeMilliseconds = new Date(endTime).getTime();

    if (endTimeMilliseconds < startTimeMilliseconds) {
      setTimeError("End time must be after start time!");
    } else {
      setFormData((prevData) => ({
        ...prevData,
        startTime,
        endTime,
      }));
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" isCentered>
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalHeader bg="green.900" color={"white"}>
          Date
        </ModalHeader>
        <ModalCloseButton color={"white"} border="1px solid white" />
        <ModalBody>
          <FormControl>
            <FormLabel>Start Time:</FormLabel>
            <Input
              size="md"
              type="datetime-local"
              value={startTime}
              onChange={(e) => {
                setTimeError(null);
                setStartTime(e.target.value);
              }}
            />
          </FormControl>

          <FormControl isInvalid={endTimeError}>
            <FormLabel>End Time:</FormLabel>
            <Input
              size="md"
              type="datetime-local"
              value={endTime}
              min={startTime}
              onChange={(e) => {
                setTimeError(null);
                setEndTime(e.target.value);
              }}
            />
            <FormErrorMessage>{endTimeError}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ButtonGroup justifyContent={"space-between"} p={4}>
          <Button colorScheme="green" onClick={handleSubmit}>
            Save
          </Button>
          <Button colorScheme="blue" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

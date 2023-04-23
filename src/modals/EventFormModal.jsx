import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { EventForm } from "../components/EventForm";
import { useOutletContext } from "react-router-dom";

export const EventFormModal = ({
  isOpen,
  onClose,
  formData = {},
  onSubmit,
  id,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" size="xl">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>New Event</ModalHeader>
        <ModalCloseButton color="white" border="1px solid white" />
        <ModalBody>
          <EventForm
            formData={formData}
            onClose={onClose}
            onSubmit={onSubmit}
            id={id}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

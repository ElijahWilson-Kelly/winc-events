import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { EventForm } from "../components/EventForm";

export const EventFormModal = ({
  isOpen,
  onClose,
  formData = {},
  onSubmit,
  submitButtonText,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" size="xl">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Event</ModalHeader>
        <ModalCloseButton color="white" border="1px solid white" />
        <ModalBody>
          <EventForm
            formData={formData}
            onClose={onClose}
            onSubmit={onSubmit}
            submitButtonText={submitButtonText}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

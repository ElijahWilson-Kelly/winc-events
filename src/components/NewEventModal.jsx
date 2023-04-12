import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { NewEventForm } from "./NewEventForm";

export const NewEventModal = ({ isOpen, onClose, categoriesData }) => {
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
          <NewEventForm categoriesData={categoriesData} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

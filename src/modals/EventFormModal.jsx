import PropTypes from "prop-types";
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
  categories,
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
            categories={categories}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

EventFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.exact({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    categoryIds: PropTypes.arrayOf(PropTypes.number),
    location: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    id: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};

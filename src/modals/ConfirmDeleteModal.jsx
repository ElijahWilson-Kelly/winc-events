import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export const ConfirmDeleteModal = ({ isOpen, onClose, deleteEvent }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" isCentered>
      <ModalOverlay
        bg="blackAlpha.800"
        backdropFilter="blur(1px) hue-rotate(10deg)"
      />
      <ModalContent colorScheme="red">
        <ModalHeader bg="red.800">Confirm Delete</ModalHeader>
        <ModalCloseButton color="white" border="1px solid white" />
        <ModalBody>
          <Text>Are you sure this cannot be undone!</Text>
        </ModalBody>
        <ButtonGroup justifyContent={"space-between"} p={4}>
          <Button colorScheme="red" onClick={deleteEvent}>
            Delete
          </Button>
          <Button colorScheme="blue" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

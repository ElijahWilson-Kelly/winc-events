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

export const ConfirmDeleteModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale">
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
          <Button colorScheme="red">Delete</Button>
          <Button colorScheme="green" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

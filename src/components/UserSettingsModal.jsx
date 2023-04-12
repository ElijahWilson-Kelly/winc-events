import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";

export const UserSettingsModal = ({ isOpen, onClose, user }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" size="xl">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Heading textAlign={"center"} fontWeight={200}>
            Welcome {user}
          </Heading>
          <Text className="user-setting">Change Name</Text>
          <Text className="user-setting">Change Pincode</Text>
          <Flex justify={"space-between"}>
            <Button variant="ghost" colorScheme="green" type="submit">
              Change User
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={onClose}>
              Delete User
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Heading,
  Stack,
  Center,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useResetProjection } from "framer-motion";
import { useContext } from "react";

export const ChangeUserModal = ({
  isOpen,
  onClose,
  users,
  currentUser,
  setCurrentUser,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="none" size="full">
      <ModalOverlay />
      <ModalContent bg="blackAlpha.900">
        <ModalCloseButton color="white" />
        <ModalBody display="flex" justifyContent="center" alignItems="center">
          <Center color="white">
            <Stack gap={10}>
              <Heading color="white" textAlign="center">
                Select User:
              </Heading>
              <Flex gap={10} maxWidth={400}>
                {users.map((user) => {
                  const isCurrentUser = user.id === currentUser.id;
                  return (
                    <Flex
                      direction="column"
                      align="center"
                      key={user.id}
                      gap={4}
                    >
                      <Heading size="sml">{user.name}</Heading>
                      <Image
                        className={isCurrentUser ? "current-user" : ""}
                        src={user.image}
                        borderRadius="full"
                        boxSize="150px"
                        _hover={{
                          transform: "translateY(-10px)",
                          opacity: "0.4",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setCurrentUser(user);
                          onClose();
                        }}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Stack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

import PropTypes from "prop-types";
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

export const ChangeUserModal = ({
  isOpen,
  onClose,
  allUsers,
  currentUser,
  setCurrentUser,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="none" size="full">
      <ModalOverlay />
      <ModalContent bg={"#170826F5"}>
        <ModalCloseButton color="white" />
        <ModalBody display="flex" justifyContent="center" alignItems="center">
          <Center color="white">
            <Stack gap={10}>
              <Heading color="white" textAlign="center" fontWeight={200}>
                Select User
              </Heading>
              <Flex
                gap={10}
                maxWidth={[300, 400]}
                overflowX={"scroll"}
                p={"30px"}
              >
                {allUsers.map((user) => {
                  const isCurrentUser = user.id === currentUser?.id;
                  return (
                    <Flex
                      direction="column"
                      align="center"
                      key={user.id}
                      gap={4}
                    >
                      <Heading size="sml" fontWeight={100}>
                        {user.name}
                      </Heading>
                      <Image
                        className={isCurrentUser ? "current-user" : ""}
                        src={user.image}
                        borderRadius="full"
                        w={"150px"}
                        minW={"150px"}
                        h={"150px"}
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

ChangeUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  allUsers: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  currentUser: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  setCurrentUser: PropTypes.func.isRequired,
};

import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

export const CategoriesSelecterModal = ({
  isOpen,
  onClose,
  originalData,
  setFormData,
}) => {
  const [categories, setCategories] = useState(originalData);

  const handleSubmit = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" isCentered>
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalHeader bg="green.900" color={"white"}>
          Categories
        </ModalHeader>
        <ModalCloseButton color={"white"} border="1px solid white" />
        <ModalBody>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Textarea
              type="url"
              resize={"none"}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            ></Textarea>
            <FormErrorMessage>{"hey"}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ButtonGroup justifyContent={"space-between"} p={4}>
          <Button colorScheme="green" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button colorScheme="blue" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

import { useState } from "react";

import { Form, useNavigate } from "react-router-dom";
import {
  Input,
  Textarea,
  Button,
  Flex,
  Checkbox,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

export const NewEventForm = ({ categoriesData, onClose }) => {
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());
    body.categoryIds = Array.from(formData)
      .filter((entry) => entry[0] === "categoryIds")
      .map((entry) => +entry[1]);
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/events/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          toast({
            title: "Event Created.",
            description: "Your event has been created.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/");
          onClose();
        } else {
          toast({
            title: "Error",
            description: "Sorry we were unable to create your event.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <Input placeholder="title" name="title" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          placeholder="description"
          resize={"none"}
        ></Textarea>
      </FormControl>

      <FormControl>
        <FormLabel>Categories</FormLabel>
        <Flex gap={10}>
          {categoriesData.map((category) => {
            return (
              <Checkbox
                key={category.id}
                value={category.id}
                name="categoryIds"
              >
                {category.name[0].toLowerCase() + category.name.slice(1)}
              </Checkbox>
            );
          })}
        </Flex>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Location</FormLabel>
        <Input name="location" placeholder="location" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Start Time</FormLabel>
        <Input name="startTime" type="datetime-local" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>End Time</FormLabel>
        <Input name="endTime" type="datetime-local" />
      </FormControl>

      <Flex justify={"space-between"}>
        <Button variant="outline" colorScheme="cyan" type="submit">
          Add Event
        </Button>
        <Button variant="ghost" colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
      </Flex>
    </Form>
  );
};

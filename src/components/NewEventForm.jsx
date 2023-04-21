import { useState } from "react";

import { Form, useOutletContext } from "react-router-dom";
import {
  Input,
  Textarea,
  Button,
  Flex,
  Checkbox,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

// Controlled Form
export const NewEventForm = ({ onClose, formData, onSubmit, id }) => {
  const categoryOptions = useOutletContext();

  const dateNow = (offsetHours = 0) => {
    let date = new Date();
    if (offsetHours != 0) {
      const milliseconds = date.getTime();
      date = new Date(milliseconds + offsetHours * 3600000);
    }
    const pad = (n) => `${n}`.padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth()) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes())
    );
  };

  const defaultStartTime = () => dateNow();
  const defaultEndTime = () => dateNow(2);

  const [title, setTitle] = useState(formData.title || "");
  const [description, setDescription] = useState(formData.description || "");
  const [categories, setCategories] = useState(formData.categories || []);
  const [location, setLocation] = useState(formData.location || "");
  const [startTime, setStartTime] = useState(
    formData.startTime || defaultStartTime
  );
  const [endTime, setEndTime] = useState(formData.endTime || defaultEndTime);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      location,
      categories,
      startTime,
      endTime,
      id,
    };
    onSubmit(formData);
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
        <Input
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          placeholder="description"
          resize={"none"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
      </FormControl>

      <FormControl>
        <FormLabel>Categories</FormLabel>
        <Flex gap={10}>
          {categoryOptions.map((category) => {
            return (
              <Checkbox
                key={category.id}
                value={category.id}
                name="categoryIds"
                checked={categories.some((id) => id === category.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCategories((prevCategories) => [
                      ...prevCategories,
                      category.id,
                    ]);
                  } else {
                    setCategories((prevCategories) =>
                      prevCategories.filter((id) => id != category.id)
                    );
                  }
                }}
              >
                {category.name[0].toLowerCase() + category.name.slice(1)}
              </Checkbox>
            );
          })}
        </Flex>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Location</FormLabel>
        <Input
          name="location"
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Start Time</FormLabel>
        <Input
          name="startTime"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>End Time</FormLabel>
        <Input
          name="endTime"
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
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

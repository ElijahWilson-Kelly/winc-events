import { useState } from "react";
import { Form, useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Input,
  Textarea,
  Button,
  Flex,
  Checkbox,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { categoriesColors } from "../../categoryToColor";

/***
 * EventForm - controlled Form
 *
 *  Props
 *  - onClose() {function} - used to close the modal that renders the form
 *  - formData {object}  - populates form with data provided
 *  - onSubmit(formData) {function} - function to be called when submitting data
 *  - submitButtonText {string} - text to be used for submit button
 *
 *  Hooks
 *  - useOutletContext() - for getting categoryOptions
 *
 *  State
 *  - (All form fields as is a controlled form)
 */

export const EventForm = ({
  onClose,
  formData,
  onSubmit,
  submitButtonText,
  categories,
}) => {
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
  const [image, setImage] = useState(formData.image || "");
  const [categoryIds, setCategoryIds] = useState(formData.categoryIds || []);
  const [location, setLocation] = useState(formData.location || "");
  const [startTime, setStartTime] = useState(
    formData.startTime?.slice(0, 16) || defaultStartTime
  );
  const [endTime, setEndTime] = useState(
    formData.endTime?.slice(0, 16) || defaultEndTime
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      image,
      description,
      location,
      categoryIds,
      startTime,
      endTime,
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
        <FormLabel>Image url</FormLabel>
        <Input
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Categories</FormLabel>
        <Flex gap={10}>
          {categories.map((category) => {
            const color = categoriesColors[category.name];
            return (
              <Checkbox
                key={category.id}
                value={category.id}
                name="categoryIds"
                isChecked={categoryIds.some((id) => id === category.id)}
                color={color}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCategoryIds((prevCategories) => [
                      ...prevCategories,
                      category.id,
                    ]);
                  } else {
                    setCategoryIds((prevCategories) =>
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
        <Button variant="outline" colorScheme="cyan" type="submit" w={40}>
          {submitButtonText}
        </Button>
        <Button variant="ghost" colorScheme="red" onClick={onClose} w={40}>
          Cancel
        </Button>
      </Flex>
    </Form>
  );
};

EventForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.exact({
    title: PropTypes.string,
    description: PropTypes.string,
    categoryIds: PropTypes.arrayOf(PropTypes.number),
    location: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};

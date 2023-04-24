import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import { Checkbox, Flex, Text, Stack } from "@chakra-ui/react";

export const Categories = ({ setFilteredCategories }) => {
  const { categoryOptions } = useOutletContext();

  const handleChange = (e, category) => {
    if (e.target.checked) {
      setFilteredCategories((prevState) => prevState.concat(category.id));
    } else {
      setFilteredCategories((prevState) =>
        prevState.filter((item) => item != category.id)
      );
    }
  };

  return (
    <Stack align={"center"}>
      <Text fontWeight={200} fontSize={["1rem", "1.4rem", "1.7rem", "2rem"]}>
        Filter Categories
      </Text>
      <Flex gap={10} wrap={true}>
        {categoryOptions.map((category) => (
          <Checkbox
            key={category.id}
            onChange={(e) => handleChange(e, category)}
            fontWeight={300}
          >
            {category.name}
          </Checkbox>
        ))}
      </Flex>
    </Stack>
  );
};

Categories.propTypes = {
  setFilteredCategories: PropTypes.func.isRequired,
};

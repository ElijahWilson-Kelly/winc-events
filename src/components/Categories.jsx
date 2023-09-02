import PropTypes from "prop-types";
import { Button, Flex, Stack } from "@chakra-ui/react";

export const Categories = ({ categories, setCategories }) => {
  const toggleCategory = (id) => {
    setCategories((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.id != id) return category;

        return {
          ...category,
          selected: !category.selected,
        };
      });
    });
  };

  return (
    <Stack>
      <Flex gap={5} wrap={true} color={"white"}>
        {categories.map((category, i) => {
          let backgroundColor = category.color;
          let fontColor = "white";
          if (!category.selected) {
            backgroundColor += "22";
            fontColor = "black";
          }
          return (
            <Button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              fontWeight={400}
              bg={backgroundColor}
              color={fontColor}
              borderRadius={"40px"}
              _hover={{
                opacity: "0.7",
              }}
            >
              {category.name}
            </Button>
          );
        })}
      </Flex>
    </Stack>
  );
};

Categories.propTypes = {
  setFilteredCategories: PropTypes.func.isRequired,
};

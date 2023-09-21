import PropTypes from "prop-types";
import { Button, Flex, Stack } from "@chakra-ui/react";

export const Categories = ({
  categories,
  deselectedCategories,
  setDeselectedCategories,
}) => {
  const toggleCategory = (id) => {
    setDeselectedCategories((previousIds) => {
      if (previousIds.includes(id)) {
        return previousIds.filter((i) => i != id);
      } else {
        return [...previousIds, id];
      }
    });
  };

  return (
    <Stack>
      <Flex gap={5} wrap={true} color={"white"}>
        {categories.map((category, i) => {
          let backgroundColor = category.color;
          let fontColor = "white";
          if (deselectedCategories.includes(category.id)) {
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
  categories: PropTypes.array.isRequired,
  deselectedCategories: PropTypes.array.isRequired,
  setDeselectedCategories: PropTypes.func.isRequired,
};

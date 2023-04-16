import { Checkbox, Flex, Text, Stack } from "@chakra-ui/react";

export const Categories = ({ categories, setFilteredCategories }) => {
  const handleChange = (e, category) => {
    if (e.target.checked) {
      setFilteredCategories((prevState) => prevState.concat(category.name));
    } else {
      setFilteredCategories((prevState) =>
        prevState.filter((item) => item != category.name)
      );
    }
  };

  return (
    <Stack align={"center"}>
      <Text fontWeight={100} fontSize={"2rem"}>
        Filter Categories
      </Text>
      <Flex gap={10} wrap={true}>
        {categories.map((category) => (
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

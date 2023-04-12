import {
  Box,
  Center,
  Input,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Center>
      <InputGroup w={"60%"}>
        <InputLeftElement
          pointerEvents="none"
          children={<BsSearch color="gray.300" />}
        />
        <Input
          value={searchTerm}
          type="text"
          placeholder="search"
          variant={"filled"}
          fontSize={"2rem"}
          colorScheme="blue"
          onChange={handleChange}
        />
      </InputGroup>
    </Center>
  );
};

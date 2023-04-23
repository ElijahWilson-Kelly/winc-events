import {
  Box,
  Center,
  Input,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

/***
 * Search Bar
 *  Props
 *  - searchTerm {string}
 *  - setSearchTerm {function}
 *
 */

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Center m={4} alignSelf={"stretch"}>
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
          fontSize={["1.4rem"]}
          fontWeight={200}
          onChange={handleChange}
        />
      </InputGroup>
    </Center>
  );
};

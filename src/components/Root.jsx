import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/categories");
      const categories = await response.json();
      setCategoryOptions(categories);
    })();
  }, []);

  return (
    <Box>
      <Navigation />
      <Outlet context={categoryOptions} />
    </Box>
  );
};

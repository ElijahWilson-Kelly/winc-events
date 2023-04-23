import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

/**
 * Root level element
 *
 * State -
 *  categoryOptions {object} - category data retrieved from server.
 *
 * Functions -
 *  getCategoryNameFromId - returns category name for a given id. if no name exists returns an empty string
 *
 */

export const Root = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const getCategoryNameFromId = (id) =>
    categoryOptions.find((category) => category.id === id)?.name || "";

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
      <Outlet context={{ categoryOptions, getCategoryNameFromId }} />
    </Box>
  );
};

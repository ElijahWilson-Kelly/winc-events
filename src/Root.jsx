import { useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Navigation } from "./components/Navigation";
import { Loading } from "./components/Loading";
import { Footer } from "./components/Footer";

import { reducer } from "./scripts/reducer";

export const Root = () => {
  const [data, dispatch] = useReducer(reducer, {
    events: null,
    categories: null,
  });
  console.log(data);

  useEffect(() => {
    (async function () {
      const fetchData = async (url) => {
        const response = await fetch(url);
        return await response.json();
      };
      const [events, categories] = await Promise.all([
        fetchData("https://events-data.onrender.com/events"),
        fetchData("https://events-data.onrender.com/categories"),
      ]);

      dispatch({ type: "populate", payload: { events, categories } });
    })();
  }, []);

  return (
    <Box>
      <Navigation />
      {data.events ? <Outlet context={{ data, dispatch }} /> : <Loading />}
      <Footer />
    </Box>
  );
};

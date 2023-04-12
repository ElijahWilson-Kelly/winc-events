import React, { useState } from "react";
import {
  Box,
  Center,
  Grid,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";

import { SearchBar } from "../components/SearchBar";
import { Event } from "../components/Event";
import { NewEventModal } from "../components/NewEventModal";

export const loader = async () => {
  try {
    const responses = await Promise.all([
      fetch(`http://localhost:3000/events`),
      fetch(`http://localhost:3000/categories`),
    ]);
    if (responses.some((response) => !response.ok)) {
      return new Error("Server Error");
    }
    return await Promise.all(responses.map((response) => response.json()));
  } catch (err) {
    return new Error(err.message);
  }
};

// export const action = async ({ params, request }) => {
//   const formData = Array.from(await request.formData());
//   const categoryIds = formData
//     .filter((entry) => entry[0] === "category")
//     .map((entry) => +entry[1]);
//   const body = Object.fromEntries(formData);
//   body.categoryIds = categoryIds;
//   delete body.category;
//   try {
//     const response = await fetch("http://localhost:3000/events/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });
//     if (!response.ok) {
//       console.log(response.message);
//     }
//     return redirect("/");
//   } catch (err) {
//     return null;
//   }
// };

export const EventsPage = () => {
  const [eventsData, categoriesData] = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  const filteredEvents = eventsData.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Grid templateColumns={"80px 1fr 80px"}>
      <Box className="side-bar" />
      <Box>
        <Heading textAlign={"center"} p={10} size={"3xl"} fontWeight={300}>
          Events
        </Heading>
        <SearchBar value={searchTerm} setSearchTerm={setSearchTerm} />
        <Grid
          templateColumns={[
            "repeat(1,1fr)",
            null,
            "repeat(2,1fr)",
            "repeat(3,1fr)",
            "repeat(4, 1fr)",
          ]}
        >
          {filteredEvents.map((event) => {
            return (
              <Link to={`event/${event.id}`} key={event.id}>
                <Event event={event} categoriesData={categoriesData} />
              </Link>
            );
          })}
          <Center className="event-card new-card" onClick={onOpen}>
            <AiOutlinePlusSquare />
          </Center>
        </Grid>
      </Box>
      <Box className="side-bar" />
      <NewEventModal
        isOpen={isOpen}
        onClose={onClose}
        categoriesData={categoriesData}
      />
    </Grid>
  );
};

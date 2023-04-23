import React, { useContext, useState } from "react";
import {
  Box,
  Center,
  Grid,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";

import { SearchBar } from "../components/SearchBar";
import { Categories } from "../components/Categories";
import { EventCard } from "../components/EventCard";
import { EventFormModal } from "../modals/EventFormModal";
import { UsersContext } from "../components/UsersContext";

export const loader = async () => {
  try {
    const response = await fetch(`http://localhost:3000/events`);
    if (!response.ok) {
      if (response.status === 404) {
        throw Error("Resource not found!");
      }
      throw Error("Server Error!");
    }
    return response.json();
  } catch (err) {
    throw Error(err.message);
  }
};

export const EventsPage = () => {
  const eventsData = useLoaderData() || [];
  const toast = useToast();
  const navigate = useNavigate();
  const { categoryOptions } = useOutletContext();
  const { currentUser } = useContext(UsersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  let filteredEvents = eventsData.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (filteredCategories.length > 0) {
    filteredEvents = filteredEvents.filter((event) =>
      event.categoryIds.some((id) => {
        const categoryName =
          categoryOptions.find((category) => category.id === id)?.name || "";
        return filteredCategories.includes(categoryName);
      })
    );
  }

  const findNextHighestId = (eventsData) => {
    let highest = 0;
    for (const { id } of eventsData) {
      if (id > highest) {
        highest = id;
      }
    }
    return highest + 1;
  };

  const submitNewEvent = async (eventDetails) => {
    eventDetails.createdBy = currentUser.id;
    try {
      const response = await fetch(`http://localhost:3000/events/`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(eventDetails),
      });
      if (response.ok) {
        toast({
          title: "Event Added",
          description: `Event ${eventDetails.title} has been added.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
      onClose();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid templateColumns={"80px 1fr 80px"}>
      <Box className="side-bar" />
      <Box>
        <Heading textAlign={"center"} p={10} size={"4xl"} fontWeight={200}>
          Events
        </Heading>
        <SearchBar value={searchTerm} setSearchTerm={setSearchTerm} />
        <Categories
          categories={categoryOptions}
          setFilteredCategories={setFilteredCategories}
        />
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
                <EventCard event={event} />
              </Link>
            );
          })}
          <Center className="event-card new-card" onClick={onOpen}>
            <AiOutlinePlusSquare />
          </Center>
        </Grid>
      </Box>
      <Box className="side-bar" />
      <EventFormModal
        isOpen={isOpen}
        onClose={onClose}
        id={findNextHighestId(eventsData)}
        onSubmit={submitNewEvent}
      />
    </Grid>
  );
};

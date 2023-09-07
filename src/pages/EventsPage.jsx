import { useContext, useState, useEffect } from "react";
import {
  Box,
  Center,
  Grid,
  Heading,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, useOutletContext } from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";

import { Categories } from "../components/Categories";
import { EventCard } from "../components/EventCard";
import { EventFormModal } from "../modals/EventFormModal";
import { UsersContext } from "../components/UsersContext";

export const EventsPage = () => {
  const toast = useToast();
  const { currentUser } = useContext(UsersContext);

  const {
    data: { events, categories },
    dispatch,
  } = useOutletContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState("");
  const [deselectedCategories, setDeselectedCategories] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    let newEvents = [];

    for (const event of events) {
      if (!event.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        continue;
      }
      if (event.categoryIds.every((id) => deselectedCategories.includes(id))) {
        continue;
      }
      newEvents.push(event);
    }
    setFilteredEvents(newEvents);
  }, [searchTerm, deselectedCategories, events]);

  const findNextHighestId = () => {
    let highest = 0;
    for (const { id } of events) {
      if (id > highest) {
        highest = id;
      }
    }
    return highest + 1;
  };

  const submitNewEvent = async (eventDetails) => {
    if (!eventDetails.id) {
      eventDetails.id = findNextHighestId();
    }
    eventDetails.attendedBy = [];
    eventDetails.createdBy = currentUser.id;

    dispatch({ type: "event_added", payload: eventDetails });
    try {
      const response = await fetch(`https://events-data.onrender.com/events`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(eventDetails),
      });
      if (response.ok) {
        toast({
          title: "Event added",
          description: `Event "${eventDetails.title}" has been added.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: `Sorry. Something went wrong. Please try again later.`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box p={10}>
        <Stack>
          <Heading
            size={"xl"}
            fontWeight={300}
            borderBottom={"2px solid black"}
          >
            Events
          </Heading>
          <Categories
            categories={categories}
            deselectedCategories={deselectedCategories}
            setDeselectedCategories={setDeselectedCategories}
          />
          <Grid
            templateColumns={[
              "repeat(1,1fr)",
              null,
              "repeat(2,1fr)",
              "repeat(3,1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={"15px"}
          >
            {filteredEvents.map((event) => {
              return (
                <Link to={`event/${event.id}`} key={event.id}>
                  <EventCard event={event} categories={categories} />
                </Link>
              );
            })}
            <Center className="event-card new-card" onClick={onOpen}>
              <AiOutlinePlusSquare />
            </Center>
          </Grid>
        </Stack>
      </Box>
      <EventFormModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={submitNewEvent}
        submitButtonText={"Add Event"}
        categories={categories}
      />
    </>
  );
};

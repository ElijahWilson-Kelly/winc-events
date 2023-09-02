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
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";

import { Categories } from "../components/Categories";
import { EventCard } from "../components/EventCard";
import { EventFormModal } from "../modals/EventFormModal";
import { UsersContext } from "../components/UsersContext";

/***
 * Loader for EventsPage
 *  - retrieves events data from server.
 *  returns events { array = [{object}, {object}, ...] }
 */

export const loader = async () => {
  try {
    const eventsPromise = fetch(`https://events-data.onrender.com/events`);
    const categoryPromise = fetch(
      `https://events-data.onrender.com/categories`
    );
    const responses = await Promise.all([eventsPromise, categoryPromise]);
    const [eventsData, categoriesData] = await Promise.all(
      responses.map((res) => res.json())
    );
    return {
      eventsData,
      categoriesData,
    };
  } catch (err) {
    throw Error(err.message);
  }
};

/***
 * Events Page
 *  Hooks
 *  - useLoaderData() - returns {array} events from server
 *  - useToast() - for displaying success and failure messages
 *  - useNavigate() - for refereshing the page and causing loader to re-run
 *  - useContext() - for getting {currentUser}
 *  - useDisclosure() - for displaying {EventFormModal}
 *
 *  State
 *  - searchTerm {string} - for filtering events by heading and paragraph.
 *  - filteredCategories {array = [id, id,....]} - for filtering events by categories
 *
 *  Functions
 *  - submitNewEvent(eventDetails) - sends eventData to server with "Post" request.
 */

export const EventsPage = () => {
  const { eventsData, categoriesData } = useLoaderData() || {
    eventsData: [],
    categoriesData: [],
  };
  const toast = useToast();
  const navigate = useNavigate();
  const { currentUser } = useContext(UsersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setCategories(
      categoriesData.map((category) => {
        return {
          ...category,
          selected: true,
        };
      })
    );
  }, [categoriesData]);

  useEffect(() => {
    let newEvents = [];
    const filteredCategoryIds = categories
      .filter((category) => category.selected)
      .map((category) => category.id);

    for (const event of eventsData) {
      if (!event.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        continue;
      }
      if (event.categoryIds.every((id) => !filteredCategoryIds.includes(id))) {
        continue;
      }
      newEvents.push(event);
    }
    setEvents(newEvents);
  }, [searchTerm, categories]);

  // let filteredEvents = eventsData.filter((event) =>
  //   event.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // if (filteredCategories.length > 0) {
  //   filteredEvents = filteredEvents.filter((event) =>
  //     event.categoryIds.some((id) => filteredCategories.includes(id))
  //   );
  // }

  const findNextHighestId = () => {
    let highest = 0;
    for (const { id } of eventsData) {
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
      navigate("/");
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
          <Categories categories={categories} setCategories={setCategories} />
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
            {events.map((event) => {
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

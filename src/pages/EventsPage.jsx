import { useContext, useState, useEffect } from "react";
import { Box, Heading, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";

import { Categories } from "../components/events-page/Categories";
import { EventFormModal } from "../modals/EventFormModal";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { sortEventsByDate } from "../scripts/utils";
import { EventsSubsection } from "../components/events-page/EventsSubsection";

export const EventsPage = () => {
  const toast = useToast();
  const { currentUser } = useContext(CurrentUserContext);

  const {
    data: { events: allEvents, categories },
    dispatch: { dispatchEvents },
  } = useOutletContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState("");
  const [deselectedCategories, setDeselectedCategories] = useState([]);

  const [sortedEvents, setSortedEvents] = useState(() =>
    sortEventsByDate(allEvents)
  );
  const [filteredEvents, setFilteredEvents] = useState(sortedEvents);

  useEffect(() => {
    setSortedEvents(() => {
      return sortEventsByDate(allEvents);
    });
  }, [allEvents]);

  useEffect(() => {
    const newFilteredEvents = {};

    for (const key in sortedEvents) {
      const filteredSection = [];
      for (const event of sortedEvents[key]) {
        if (!event.title.toLowerCase().includes(searchTerm.toLowerCase()))
          continue;

        if (event.categoryIds.some((id) => deselectedCategories.includes(id)))
          continue;

        filteredSection.push(event);
      }
      newFilteredEvents[key] = filteredSection;
    }
    setFilteredEvents(newFilteredEvents);
  }, [deselectedCategories, searchTerm, sortedEvents]);

  const { thisWeekEvents, thisMonthEvents, futureEvents, pastEvents } =
    filteredEvents;

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
          <EventsSubsection
            heading="This Week"
            events={thisWeekEvents}
            categories={categories}
          />
          <EventsSubsection
            heading="This Month"
            events={thisMonthEvents}
            categories={categories}
          />
          <EventsSubsection
            heading="Future"
            events={futureEvents}
            categories={categories}
          />
          <EventsSubsection
            heading="Past Events"
            events={pastEvents}
            categories={categories}
          />
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

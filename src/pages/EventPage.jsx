import { useContext } from "react";
import { Grid, useToast } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { CommentsSection } from "../components/event-page/CommentSections";

import { createEvent, editEvent } from "../scripts/middlewareApiCalls";
import { getDefaultStartTime, getDefaultEndTime } from "../scripts/utils";
import { EventDetails } from "../components/event-page/EventDetails";

export const loader = async ({ params }) => {
  // Return New Event
  if (params.eventId == "new") {
    return {
      title: "",
      description: "",
      image: "",
      location: "",
      categoryIds: [],
      startTime: "",
      endTime: "",
      comments: [],
      attendedBy: [],
    };
  }
  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  return await fetchData(
    `https://events-data.onrender.com/events/${params.eventId}`
  );
};

export const EventPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useContext(CurrentUserContext);
  const eventData = useLoaderData();

  // If new Event add some details to eventData
  if (!eventData.id) {
    eventData.createdBy = currentUser.id;
    eventData.startTime = getDefaultStartTime();
    eventData.endTime = getDefaultEndTime();
  }

  const handleSubmit = async () => {
    try {
      let apiCallSuccess;
      if (id) {
        apiCallSuccess = await editEvent(formData, dispatchEvents);
      } else {
        apiCallSuccess = await createEvent(formData, dispatchEvents);
      }
      if (apiCallSuccess) {
        toast({
          title: `Event ${id ? "edited" : "created"}.`,
          description: `Event "${formData.title}" has been ${
            id ? "edited" : "created"
          }.`,
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
    } catch (err) {
      throw Error(err.message);
    }
  };

  const deleteEvent = async () => {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
    if (response.ok) {
      toast({
        title: "Event deleted",
        description: `Event "${title}" has been deleted.`,
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
    navigate("/");
  };
  const comments = [];
  return (
    <>
      <Grid p={30} gap={10} templateColumns={["1fr", null, null, "1fr 2fr"]}>
        <EventDetails eventData={eventData} />
        {eventData.id && (
          <CommentsSection
            commentsFromServer={comments}
            eventId={eventData.id}
          />
        )}
      </Grid>
    </>
  );
};

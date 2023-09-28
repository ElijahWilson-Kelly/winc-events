import { Text, Box, Center, Grid } from "@chakra-ui/react";

import { EventCard } from "./EventCard";

export const EventsSubsection = ({ heading, events, categories }) => {
  return (
    <Box borderBottom={"2px solid black"} py={"20px"}>
      <Text fontWeight={400} fontSize={"1.6rem"}>
        {heading}
      </Text>
      <Grid
        templateColumns={[
          "repeat(1,1fr)",
          null,
          "repeat(2,1fr)",
          "repeat(3,1fr)",
          "repeat(4, 1fr)",
        ]}
        opacity={heading == "Past Events" && 0.6}
        gap={"15px"}
      >
        {events.map((event) => {
          return (
            <EventCard key={event.id} event={event} categories={categories} />
          );
        })}
        {events.length == 0 && (
          <Center className="event-card placeholder">
            <Text>No events</Text>
          </Center>
        )}
      </Grid>
    </Box>
  );
};

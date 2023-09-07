const addEvent = (previousState, eventDetails) => {
  console.log(eventDetails);
  return {
    ...previousState,
    events: [...previousState.events, eventDetails],
  };
};

const editEvent = (previousState, eventDetails) => {
  return {
    ...previousState,
    events: previousState.events.map((event) =>
      event.id == eventDetails.id ? eventDetails : event
    ),
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "populate":
      return action.payload;
    case "event_added":
      return addEvent(state, action.payload);
    case "event_edited":
      return editEvent(state, action.payload);
  }
  return state;
};

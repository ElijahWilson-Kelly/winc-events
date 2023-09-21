const createEvent = (state, eventDetails) => {
  return [...state, eventDetails];
};

const editEvent = (state, eventDetails) => {
  return state.map((event) => {
    if (event.id != eventDetails.id) {
      return event;
    } else {
      return eventDetails;
    }
  });
};

const addAttendance = (state, { userId, eventId }) => {
  return state.map((event) => {
    if (eventId == event.id) {
      return {
        ...event,
        attendedBy: [...event.attendedBy, userId],
      };
    } else {
      return event;
    }
  });
};

const removeAttendance = (state, { userId, eventId }) => {
  return state.map((event) => {
    if (eventId == event.id) {
      return {
        ...event,
        attendedBy: event.attendedBy.filter((id) => id != userId),
      };
    } else {
      return event;
    }
  });
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "populate":
      return action.payload;
    case "event_created":
      return createEvent(state, action.payload);
    case "event_edited":
      return editEvent(state, action.payload);
    case "attendance_added":
      return addAttendance(state, action.payload);
    case "attendance_removed":
      return removeAttendance(state, action.payload);
  }
  return state;
};

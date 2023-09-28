export const BASEURLEVENTS = "https://events-data.onrender.com/events";
export const BASEURLUSERS = "https://events-data.onrender.com/users";
export const BASEURLCATEGORIES = "https://events-data.onrender.com/categories";

const HEADERS = {
  "Content-Type": "application/json",
};

/***
 * Intermediate Functions to make calls to API then dispatch actions to reducers
 */

// Events
export const addAttendanceOnEvent = async (userId, eventId, dispatch) => {
  dispatch({ type: "attendance_added", payload: { userId, eventId } });
  try {
    // Get attendees from database
    let response = await fetch(`${BASEURLEVENTS}/${eventId}`);
    const eventDetails = await response.json();
    const attendees = eventDetails.attendedBy;

    response = await fetch(`${BASEURLEVENTS}/${eventId}`, {
      headers: HEADERS,
      method: "PATCH",
      body: JSON.stringify({
        attendedBy: [attendees.push(userId)],
      }),
    });
    if (!response.ok) {
      console.log("Failed to add attendance to server");
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeAttendanceOnEvent = async (userId, eventId, dispatch) => {
  dispatch({ type: "attendance_removed", payload: { userId, eventId } }); // Update State for quicker repsonse time
  try {
    // Get attendees from database
    let response = await fetch(`${BASEURLEVENTS}/${eventId}`);
    const eventDetails = await response.json();
    const attendees = eventDetails.attendedBy;

    response = await fetch(`${BASEURLEVENTS}/${eventId}`, {
      headers: HEADERS,
      method: "PATCH",
      body: JSON.stringify({
        attendedBy: attendees.filter((id) => id != userId),
      }),
    });
    if (!response.ok) {
      console.log("Failed to remove attendance from server");
    }
  } catch (err) {
    console.log(err);
  }
};

export const editEvent = async (event, dispatch) => {
  dispatch({ type: "event_edited", payload: event });

  try {
    const response = await fetch(`${BASEURLEVENTS}/${event.id}`, {
      headers: HEADERS,
      method: "PATCH",
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      console.log("Failed to edit event");
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createEvent = async (event, dispatch) => {
  try {
    const response = await fetch(BASEURLEVENTS, {
      headers: HEADERS,
      method: "POST",
      body: JSON.stringify(event),
    });
    const eventWithID = await response.json();
    dispatch({ type: "event_created", payload: eventWithID });
    if (response.ok) {
      return true;
    }
  } catch (err) {}
  return false;
};

export const deleteEvent = async (event, dispatch) => {
  const response = await fetch(`${BASEURLEVENTS}/${event.id}`, {
    headers: HEADERS,
    method: "DELETE",
  });
};

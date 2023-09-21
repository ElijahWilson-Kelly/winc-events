const getDateNextWeek = (year, month, day, dateNow) => {
  const daysTillNextWeek = 8 - dateNow.getDay(); // Next Monday

  return new Date(year, month, day + daysTillNextWeek);
};

export const sortEventsByDate = (events) => {
  const dateNow = new Date();
  const day = dateNow.getDate();
  const month = dateNow.getMonth();
  const year = dateNow.getFullYear();

  const dateNextWeek = getDateNextWeek(year, month, day, dateNow);

  const dateNextMonth = new Date(year, month + 1, 1);

  const pastEvents = [],
    thisWeekEvents = [],
    thisMonthEvents = [],
    futureEvents = [];

  for (let event of events) {
    const eventDateMilliseconds = new Date(event.startTime).getTime();

    if (eventDateMilliseconds < dateNow.getTime()) {
      pastEvents.push(event);
    } else if (eventDateMilliseconds < dateNextWeek.getTime()) {
      thisWeekEvents.push(event);
    } else if (eventDateMilliseconds < dateNextMonth.getTime()) {
      thisMonthEvents.push(event);
    } else {
      futureEvents.push(event);
    }
  }

  pastEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  thisWeekEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  thisMonthEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  futureEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return {
    pastEvents,
    thisWeekEvents,
    thisMonthEvents,
    futureEvents,
  };
};

export const getDefaultStartTime = () => {
  return new Date().toISOString();
};

export const getDefaultEndTime = () => {
  const MILLISECONDSPERHOUR = 3600000;

  const endTime = new Date().getTime() + 2 * MILLISECONDSPERHOUR;

  return new Date(endTime).toISOString();
};

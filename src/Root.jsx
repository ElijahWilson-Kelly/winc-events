import { useContext, useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Navigation } from "./components/layout/Navigation";
import { Loading } from "./components/Loading";
import { Footer } from "./components/layout/Footer";

import { reducer as eventsReducer } from "./reducers/eventsReducer";
import { reducer as categoriesReducer } from "./reducers/categoriesReducer";
import { reducer as usersReducer } from "./reducers/usersReducer";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

/***
 * Root Component.
 *
 * State
 *  - events
 *  - categories
 *  - users
 */

export const Root = () => {
  const [events, dispatchEvents] = useReducer(eventsReducer, []);
  const [categories, dispatchCategories] = useReducer(categoriesReducer, []);
  const [users, dispatchUsers] = useReducer(usersReducer, []);

  const { setCurrentUser } = useContext(CurrentUserContext);
  useEffect(() => {
    setCurrentUser(users[0]);
  }, users);

  useEffect(() => {
    (async function () {
      const fetchData = async (url) => {
        const response = await fetch(url);
        return await response.json();
      };
      const [events, categories, users] = await Promise.all([
        fetchData("https://events-data.onrender.com/events"),
        fetchData("https://events-data.onrender.com/categories"),
        fetchData("https://events-data.onrender.com/users"),
      ]);
      console.log(events, categories, users);
      dispatchEvents({
        type: "populate",
        payload: events,
      });
      dispatchCategories({
        type: "populate",
        payload: categories,
      });
      dispatchUsers({
        type: "populate",
        payload: users,
      });
    })();
  }, []);

  return (
    <Box>
      <Navigation users={users} />
      {events ? (
        <Outlet
          context={{
            data: { events, categories, users },
            dispatch: { dispatchEvents, dispatchCategories, dispatchUsers },
          }}
        />
      ) : (
        <Loading />
      )}
      <Footer />
    </Box>
  );
};

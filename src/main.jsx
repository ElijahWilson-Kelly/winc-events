import "./style.css";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { UsersContextProvider } from "./components/UsersContext";
import { EventPage, loader as eventPageLoader } from "./pages/EventPage";
import { EventsPage, loader as eventsPageLoader } from "./pages/EventsPage";
import {
  SelectUserPage,
  loader as selectUserLoader,
} from "./pages/SelectUserPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsPageLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventPageLoader,
      },
      {
        path: "/select_user",
        element: <SelectUserPage />,
        loader: selectUserLoader,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <UsersContextProvider>
        <RouterProvider router={router} />
      </UsersContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

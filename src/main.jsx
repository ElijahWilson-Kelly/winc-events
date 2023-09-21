import "./style.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";
import { DefaultErrorBoundary } from "./components/DefaultErrorBoundary";
import { EventPage, loader as eventPageLoader } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";

import { Root } from "./Root";
import { ChangeUserPage } from "./pages/ChangeUserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <DefaultErrorBoundary />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventPageLoader,
      },
      {
        path: "/login",
        element: <ChangeUserPage />,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <CurrentUserContextProvider>
        <RouterProvider router={router} />
      </CurrentUserContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

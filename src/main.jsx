import "./style.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { UsersContextProvider } from "./components/UsersContext";
import { DefaultErrorBoundary } from "./components/DefaultErrorBoundary";
import { EventPage, loader as eventPageLoader } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";

import { Root } from "./Root";

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

import { createBrowserRouter } from "react-router-dom";
import { Login } from "../ui/pages/login";
import { Events } from "../ui/pages/events";

export const appRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/events", element: <Events /> },
]);

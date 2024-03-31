import { createBrowserRouter } from "react-router-dom";
import { Login } from "../ui/pages/login";

export const appRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
]);

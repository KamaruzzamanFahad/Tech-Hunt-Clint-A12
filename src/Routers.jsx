import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./Pages/Root";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import LogRegiProtect from "./Protected/LogRegiProtect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <LogRegiProtect><Login></Login></LogRegiProtect>
      },
      {
        path: '/register',
        element: <LogRegiProtect><Register></Register></LogRegiProtect>
      },
    ]
  },
]);

export default router;
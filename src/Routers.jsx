import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./Pages/Root";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import LogRegiProtect from "./Protected/LogRegiProtect";
import DashBoard from "./Dashboard/DashBoard";
import UserHome from "./Dashboard/UsersPages/UserHome";
import AddProducts from "./Dashboard/UsersPages/AddProducts";
import ProtectedRout from "./Protected/ProtectedRout";
import MyProduct from "./Dashboard/UsersPages/MyProduct";
import UpdateProduct from "./Dashboard/UsersPages/UpdateProduct";

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



  //Dashboard
  {
    path: '/dashboard',
    element: <ProtectedRout><DashBoard></DashBoard></ProtectedRout>,
    children: [
      {
        path: '/dashboard/home',
        element: <ProtectedRout><UserHome></UserHome></ProtectedRout>,
      },
      {
        path: '/dashboard/add',
        element: <ProtectedRout><AddProducts></AddProducts></ProtectedRout>
      },
      {
        path: '/dashboard/myproducts',
        element: <ProtectedRout><MyProduct></MyProduct></ProtectedRout>
      },
      {
        path: '/dashboard/updatemyproduct/:id',
        element: <ProtectedRout><UpdateProduct></UpdateProduct></ProtectedRout>
      },
    ]
  }
]);

export default router;
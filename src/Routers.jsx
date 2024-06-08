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
import AllProducts from "./Pages/AllProducts";
import ProductDetils from "./Pages/ProductDetils";
import UserProfile from "./Dashboard/UsersPages/UserProfile";
import ProductReview from "./Dashboard/ModaratorPages/ProductReview";
import ReportContent from "./Dashboard/ModaratorPages/ReportContent";

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
      {
        path: '/products',
        element: <AllProducts></AllProducts>,
      },
      {
        path: '/product/:id',
        element: <ProtectedRout><ProductDetils></ProductDetils></ProtectedRout>,
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
      {
        path: '/dashboard/myprofile',
        element: <ProtectedRout><UserProfile></UserProfile></ProtectedRout>
      },
      //moderator routs
      {
        path: '/dashboard/reviewproducts',
        element: <ProtectedRout><ProductReview></ProductReview></ProtectedRout>
      },
      {
        path: '/dashboard/reportcontent',
        element: <ProtectedRout><ReportContent></ReportContent></ProtectedRout>
      },
    ]
  }
]);

export default router;
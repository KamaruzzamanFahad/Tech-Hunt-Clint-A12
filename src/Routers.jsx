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
import AddProducts from "./Dashboard/UsersPages/AddProducts";
import ProtectedRout from "./Protected/ProtectedRout";
import MyProduct from "./Dashboard/UsersPages/MyProduct";
import UpdateProduct from "./Dashboard/UsersPages/UpdateProduct";
import AllProducts from "./Pages/AllProducts";
import ProductDetils from "./Pages/ProductDetils";
import UserProfile from "./Dashboard/UsersPages/UserProfile";
import ProductReview from "./Dashboard/ModaratorPages/ProductReview";
import ReportContent from "./Dashboard/ModaratorPages/ReportContent";
import StatisticsPage from "./Dashboard/AdminPages/StatisticsPage";
import ManageUsers from "./Dashboard/AdminPages/ManageUsers";
import ManageCoupons from "./Dashboard/AdminPages/ManageCoupons";
import AdminProtected from "./Protected/AdminProtected";
import ModeratorProtected from "./Protected/ModeratorProtected";
import ErrorPage from "./Pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
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
        element: <ModeratorProtected><ProductReview></ProductReview></ModeratorProtected>
      },
      {
        path: '/dashboard/reportcontent',
        element: <ModeratorProtected><ReportContent></ReportContent></ModeratorProtected>
      },
      //Admin routs
      {
        path: '/dashboard/statistics',
        element: <AdminProtected><StatisticsPage></StatisticsPage></AdminProtected>
      },
      {
        path: '/dashboard/manageusers',
        element: <AdminProtected><ManageUsers></ManageUsers></AdminProtected>
      },
      {
        path: '/dashboard/managecupons',
        element: <AdminProtected><ManageCoupons></ManageCoupons></AdminProtected>
      },
    ]
  }
]);

export default router;
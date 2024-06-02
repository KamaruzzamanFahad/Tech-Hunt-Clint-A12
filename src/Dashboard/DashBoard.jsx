import { NavLink, Outlet } from "react-router-dom";
import { IoIosAddCircle, IoMdHome } from "react-icons/io";
import { FaBook, FaCalendarAlt, FaList, FaUser, FaUsers } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { IoMdCart } from "react-icons/io";
import { MdRateReview } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FaShoppingBag } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiForkAndKnife } from "react-icons/ci";
import { ImSpoonKnife } from "react-icons/im";
// import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {

  // const [Admina, refetch] = useAdmin();
  const isAdmin = false;
  // console.log(Admina);


  return (
    <div className="flex">
      <div className="w-96 cinzel bg-[#ffe6a1] p-10 bashbord h-[100vh]">
        <div className="w-full flex flex-col gap-1 justify-center items-center">
          <img src="/techhunt.png" alt="" className="w-36" />
          <h1 className="text-4xl">USER</h1>
          <p>email</p>
        </div>
        {isAdmin ? (
          <>
            <NavLink
              className={"flex items-center gap-3"}
              activeclassname="active"
              to={"/dashboard/adminhome"}
            >
              <IoMdHome className="text-3xl" />
              <p className="uppercase font-semibold text-lg">Admin Home</p>
            </NavLink>
            <NavLink
              className={"flex items-center gap-3 mt-5"}
              activeclassname="active"
              to={"/dashboard/additems"}
            >
              <ImSpoonKnife className="text-3xl" />
              <p className="uppercase font-semibold text-lg">Add Product</p>
            </NavLink>
            <NavLink
              className={"flex items-center gap-3 mt-5"}
              activeclassname="active"
              to={"/dashboard/manageitems"}
            >
              <FaList className="text-3xl" />
              <p className="uppercase font-semibold text-lg">manage items</p>
            </NavLink>
            <NavLink
              className={"flex items-center gap-3 mt-5"}
              activeclassname="active"
              to={"/dashboard/managebooking"}
            >
              <FaBook className="text-3xl" />
              <p className="uppercase font-semibold text-lg">Manage bookings</p>
            </NavLink>
            <NavLink
              className={"flex items-center gap-3 mt-5 mb-5"}
              activeclassname="active"
              to={"/dashboard/allusers"}
            >
              <FaUsers className="text-3xl" />
              <p className="uppercase font-semibold text-lg">all users</p>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className={"flex items-center gap-3"}
              activeclassname="active"
              to={"/dashboard"}
            >
              <IoMdHome className="text-3xl" />
              <p className="uppercase font-semibold text-lg">User Home</p>
            </NavLink>
            <NavLink
              className={"flex items-center gap-3 mt-5"}
              activeclassname="active"
              to={"/dashboard/reservation"}
            >
              <IoIosAddCircle className="text-3xl" />
              <p className="uppercase font-semibold text-lg">Add Product</p>
            </NavLink>
            <NavLink
              className={"flex items-center gap-3 mt-5"}
              activeclassname="active"
              to={"/dashboard/paymenthistory"}
            >
              <GiWallet className="text-3xl" />
              <p className="uppercase font-semibold text-lg">payment history</p>
            </NavLink>
            <NavLink
              className={"flex items-center gap-3 mt-5"}
              activeclassname="active"
              to={"/dashboard/cart"}
            >
              <IoMdCart className="text-3xl" />
              <p className="uppercase font-semibold text-lg">my cart</p>
            </NavLink>
            <NavLink
              className={"flex items-center gap-3 mt-5"}
              activeclassname="active"
              to={"/dashboard/addreview"}
            >
              <MdRateReview className="text-3xl" />
              <p className="uppercase font-semibold text-lg">add review</p>
            </NavLink>
            <NavLink
              className={"flex items-center gap-3 mt-5 mb-5"}
              activeclassname="active"
              to={"/dashboard/mybooking"}
            >
              <FaCalendarCheck className="text-3xl" />
              <p className="uppercase font-semibold text-lg">my booking</p>
            </NavLink>
          </>
        )}
        <hr />
        <NavLink
          className={"flex items-center gap-3 mt-5"}
          activeclassname="active"
          to={"/dashboard/home"}
        >
          <IoMdHome className="text-3xl" />
          <p className="uppercase font-semibold text-lg">Home</p>
        </NavLink>
        <NavLink
          className={"flex items-center gap-3 mt-5"}
          activeclassname="active"
          to={"/dashboardmenu"}
        >
          <TiThMenu className="text-3xl" />
          <p className="uppercase font-semibold text-lg">Menu</p>
        </NavLink>
        <NavLink
          className={"flex items-center gap-3 mt-5"}
          activeclassname="active"
          to={"/dashboard/shop"}
        >
          <FaShoppingBag className="text-3xl" />
          <p className="uppercase font-semibold text-lg">Shop</p>
        </NavLink>
        <NavLink
          className={"flex items-center gap-3 mt-5"}
          activeclassname="active"
          to={"/dashboard/contact"}
        >
          <MdEmail className="text-3xl" />
          <p className="uppercase font-semibold text-lg">Contact</p>
        </NavLink>
      </div>
      <div className=" flex flex-1 justify-center">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;

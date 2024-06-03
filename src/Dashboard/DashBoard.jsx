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
import { CgProfile } from "react-icons/cg";
import { AiFillProduct, AiOutlineMenuUnfold } from "react-icons/ai";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
// import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
  const { user } = useContext(AuthContext)
  // const [Admina, refetch] = useAdmin();
  const isAdmin = false;
  // console.log(Admina);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (






    <div className="relative flex flex-col md:flex-row ">
      {/* Button for small screens */}
      <div>
      <AiOutlineMenuUnfold onClick={toggleDrawer} className="pl-3 text-5xl pt-2  md:hidden" />
       
      </div>

      {/* Drawer */}
      <div onClick={toggleDrawer}
        className={`fixed inset-y-0 left-0 bg-gray-100  z-[10] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 w-full md:w-72 md:h-full bg-transparent`}
      >
        <div className="w-72 cinzel bg-[#ffe6a1] p-10 bashbord h-[130vh]">
          <div className="w-full flex flex-col gap-1 justify-center items-center mb-10">
            <img src={user.photoURL} alt="" className="w-20" />
            <h1 className="text-3xl text-center">{user.displayName}</h1>
            <p>{user.email}</p>
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
                <p className="uppercase font-semibold text-lg">dsdsda</p>
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
                to={"/dashboard/profile"}
              >
                <CgProfile className="text-3xl" />
                <p className="uppercase font-semibold text-lg">My Profile</p>
              </NavLink>
              <NavLink
                className={"flex items-center gap-3 mt-5"}
                activeclassname="active"
                to={"/dashboard/add"}
              >
                <IoIosAddCircle className="text-3xl" />
                <p className="uppercase font-semibold text-lg">Add Product</p>
              </NavLink>
              <NavLink
                className={"flex items-center gap-3 mt-5"}
                activeclassname="active"
                to={"/dashboard/myproducts"}
              >
                <AiFillProduct className="text-3xl" />
                <p className="uppercase font-semibold text-lg">My Products</p>
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        <div className=" flex flex-1 justify-center">
          <Outlet></Outlet>
        </div>
      </div>
    </div>

  );
};

export default DashBoard;

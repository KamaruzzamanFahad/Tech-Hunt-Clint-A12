import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoIosAddCircle, IoMdHome } from "react-icons/io";
import { FaBook, FaCalendarAlt, FaList, FaUser, FaUsers } from "react-icons/fa";
import { MdOutlinePendingActions, MdRateReview, MdReport } from "react-icons/md";
import { ImSpoonKnife } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { AiFillProduct, AiOutlineMenuUnfold } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiousSecure from "../hooks/useAxiousSecure";
import { Helmet } from "react-helmet-async";

const DashBoard = () => {
  const { user } = useContext(AuthContext)
  const axiosSecure = useAxiousSecure()
  const [userdata, setuserdata] = useState([])
  useEffect(() => {
    axiosSecure.get(`/user?email=${user.email}`)
      .then(res => setuserdata(res.data))
  }, [])
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const divRef = useRef(null);
  const [divHeight, setDivHeight] = useState(0);

  useEffect(() => {
    if (divRef.current) {
      const height = divRef.current.clientHeight;
      setDivHeight(height);
    }
  }, [window.innerHeight]);


  return (
    <div ref={divRef} className="relative flex flex-col md:flex-row h-[100vh]">
      <Helmet>
        <title>Dasshboard</title>
      </Helmet>
      <div>
        <AiOutlineMenuUnfold onClick={toggleDrawer} className="pl-3 text-5xl pt-2  md:hidden" />

      </div>
      <div onClick={toggleDrawer}
        className={`fixed inset-y-0 left-0 bg-gray-100  z-[10] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 w-full md:w-72 md:h-full bg-transparent`}
      >
        <div className={`w-[350px] flex flex-col gap-4 cinzel bg-[#ffe6a1] p-10 bashbord  h-full`}>
          <div className="w-full flex flex-col gap-1 justify-center items-center mb-10">
            <img src={user.photoURL} alt="" className="w-20" />
            <h1 className="text-3xl text-center">{user.displayName}</h1>
            <p>{user.email}</p>
          </div>

          {userdata.role == 'admin' ? (
            <>
              <NavLink
                className={"flex items-center gap-3"}
                activeclassname="active"
                to={"/dashboard/statistics"}
              >
                <IoMdHome className="text-3xl" />
                <p className="uppercase font-semibold text-lg">Statistics</p>
              </NavLink>
              <NavLink
                className={"flex items-center gap-3 mt-5"}
                activeclassname="active"
                to={"/dashboard/manageusers"}
              >
                <ImSpoonKnife className="text-3xl" />
                <p className="uppercase font-semibold text-lg">Manage Users</p>
              </NavLink>
              <NavLink
                className={"flex items-center gap-3 mt-5"}
                activeclassname="active"
                to={"/dashboard/managecupons"}
              >
                <FaList className="text-3xl" />
                <p className="uppercase font-semibold text-lg">Manage Coupons</p>
              </NavLink>
            </>
          ) : userdata.role == 'moderator' ?
            <>
              <NavLink
                className={"flex items-center gap-3"}
                activeclassname="active"
                to={"/dashboard/reviewproducts"}
              >
                <MdOutlinePendingActions className="text-3xl" />
                <p className="uppercase font-semibold text-lg">Product Review</p>
              </NavLink>
              <NavLink
                className={"flex items-center gap-3"}
                activeclassname="active"
                to={"/dashboard/reportcontent"}
              >
                <MdReport className="text-3xl" />
                <p className="uppercase font-semibold text-lg">Reported Contents</p>
              </NavLink>
            </>
            : userdata.role == "user" && (
              <>
                <NavLink
                  className={"flex items-center gap-3"}
                  activeclassname="active"
                  to={"/dashboard/myprofile"}
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
      <div className="flex-grow p-4 overflow-y-scroll">
        <div className=" flex flex-1 justify-center  ">
          <Outlet ></Outlet>
        </div>
      </div>
    </div >

  );
};

export default DashBoard;

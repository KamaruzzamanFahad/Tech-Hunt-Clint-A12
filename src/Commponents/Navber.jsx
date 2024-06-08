import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiousSecure from '../hooks/useAxiousSecure';




const Navber = () => {
    const { user, LogOut } = useContext(AuthContext)
    const axiosSecure = useAxiousSecure()
    const [dashbordlink, setdashbordlink] = useState('/dashboard')

    useEffect(() => {
        user?.email &&
            axiosSecure.get(`/user?email=${user.email}`)
                .then(res => {
                    if (res.data.role == "user") {
                        setdashbordlink('/dashboard/myprofile')
                    } else if (res.data.role == 'moderator') {
                        setdashbordlink('/dashboard/reviewproducts')
                    } else if (res.data.role == 'admin') {
                        setdashbordlink('/dashboard/statistics')
                    } else {
                        setdashbordlink('/dashboard')
                    }
                })
    }, [user])



    return (
        <div className='py-5'>


            <div className="navbar ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[10]">
                            <li><NavLink
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : ""
                                }
                                to={'/'}>Home</NavLink></li>
                            <li><NavLink to={'/products'}>Products</NavLink></li>
                        </ul>
                    </div>
                    <Link to={'/'}>
                        <div>
                            <img className='w-32' src="/techhunt.png" alt="" />
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">

                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'/products'}>Products</NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                            <div className="dropdown dropdown-end dropdown-hover z-[10]">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar z-[10]">
                                    <div className="w-10 rounded-full">
                                        <img alt="user" src={user.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-0 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#ececec] rounded-box w-52">
                                    <li className='p-2 px-3'>{user.displayName}</li>
                                    <li><Link to={dashbordlink}>Dashboard</Link ></li>
                                    <li><a onClick={LogOut}>Logout</a ></li>
                                </ul>
                            </div>
                        </>
                            : <div className='flex justify-end items-center flex-row'>
                                <NavLink to={'/login'}><button className=" text-black bg-[#2BC7FA]">Log In</button></NavLink>
                                <NavLink to={'/register'}><button className=" text-black bg-[#2BC7FA] ml-4">Register</button></NavLink>
                            </div>


                    }


                </div>


            </div>

        </div>
    );
};

export default Navber;
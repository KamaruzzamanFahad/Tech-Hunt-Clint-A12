import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiousSecure from '../hooks/useAxiousSecure';




const Navber = () => {
    const { user, LogOut } = useContext(AuthContext)
    const axiosSecure = useAxiousSecure()
    const [dashbordlink, setdashbordlink] = useState('/dashboard')

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                if (user?.email) {
                    const res = await axiosSecure.get(`/user?email=${user.email}`);
                    if (res.data && res.data.role) {
                        switch (res.data.role) {
                            case 'user':
                                setdashbordlink('/dashboard/myprofile');
                                break;
                            case 'moderator':
                                setdashbordlink('/dashboard/reviewproducts');
                                break;
                            case 'admin':
                                setdashbordlink('/dashboard/statistics');
                                break;
                            default:
                                setdashbordlink('/dashboard');
                        }
                    } else {
                        console.error('Invalid response data:', res.data);
                        fetchUserRole();
                        setdashbordlink('/dashboard'); // Fallback link in case of invalid data
                    }
                }
            } catch (err) {
                console.error('Error fetching user role:', err);
                fetchUserRole();
                setdashbordlink('/dashboard'); // Fallback link in case of error
            }
        };

        fetchUserRole();
    }, [user]);

    const screewidth = window.innerWidth;
    return (
        <div className='py-5'>


            <div className="navbar ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[10]">
                            <NavLink activeclassname="active" className={'text-lg'} to={'/'}>Home</NavLink>
                            <NavLink activeclassname="active" className={'text-lg'} to={'/products'}>Products</NavLink>
                        </ul>
                    </div>

                    <Link hidden={screewidth < 500 && !user?.email ? true : false} to={'/'}>
                        <div>
                            <img className='w-32' src="/techhunt.png" alt="" />
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">

                    <ul className="menu menu-horizontal px-1">
                        <NavLink activeclassname="active" className={'text-lg mr-2'} to={'/'}>Home</NavLink>
                        <NavLink activeclassname="active" className={'text-lg ml-2'} to={'/products'}>Products</NavLink>
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
                                <NavLink to={'/login'}><button className=" w-28 text-black bg-[#2BC7FA]">Log In</button></NavLink>
                                <NavLink to={'/register'}><button className=" text-black bg-[#2BC7FA] ml-4">Register</button></NavLink>
                            </div>


                    }


                </div>


            </div>

        </div>
    );
};

export default Navber;
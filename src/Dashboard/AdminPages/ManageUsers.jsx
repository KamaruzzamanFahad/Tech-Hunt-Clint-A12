


import React, { useContext, useEffect, useState } from 'react';
import useAxiousSecure from '../../hooks/useAxiousSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ManageUsers = () => {

    const goto = useNavigate()
    const [reload, setreload] = useState(0)
    const axiosSecure = useAxiousSecure()
    const [product, setproduct] = useState([])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        axiosSecure.get(`/users`)
            .then(res => {
                setproduct(res.data)
            })
    }, [reload])


   


    const handleupdatestatus = (id, role) => {
        axiosSecure.patch('/user-role-update', { role, id })
            .then(res => {
                setreload(Math.random())
                if (res.data.modifiedCount > 0) {
                    setreload(Math.random())
                    Swal.fire({
                        title: "Status Updated",
                        text: "User Rule Status Successfully Updated",
                        icon: "success"
                    });
                }
            })
    }



    return (
        <div className='w-full md:px-40 md:mt-20'>
            <Helmet>
                <title>Manage Users</title>
            </Helmet>

            <div className="overflow-x-auto w-full ">
                <table className="table w-full ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>User name</th>
                            <th>User email</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product.map((item, i) => (
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                                <div className="text-sm opacity-50">Rule: {item.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{item.email}</p>
                                    </td>
                                    <th>
                                        <button disabled={item.role == 'moderator' ? true : false} onClick={() => handleupdatestatus(item._id, 'moderator')} className="btn btn-ghost btn-xs bg-[#debbff96]">Make Moderator</button>
                                    </th>
                                    <th>
                                        <button disabled={item.role == 'admin' ? true : false} onClick={() => handleupdatestatus(item._id, 'admin')} className="btn btn-ghost btn-xs bg-[#bbe4ff96]">Make Admin</button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
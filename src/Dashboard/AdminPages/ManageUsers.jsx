


import React, { useContext, useEffect, useState } from 'react';
import useAxiousSecure from '../../hooks/useAxiousSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {

    const goto = useNavigate()
    const [reload, setreload] = useState(0)
    const axiosSecure = useAxiousSecure()
    const [product, setproduct] = useState([])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        axiosSecure.get(`/users`)
            .then(res => {
                console.log(res.data)
                setproduct(res.data)
            })
    }, [reload])


    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };


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

    const handledelet = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deletmyproduct?id=${item._id}`)
                    .then(res => {
                        setreload(Math.random())
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='w-full md:px-40 md:mt-20'>




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
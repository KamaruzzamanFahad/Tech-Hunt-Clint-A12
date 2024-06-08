

import React, { useContext, useEffect, useState } from 'react';
import useAxiousSecure from '../../hooks/useAxiousSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ProductReview = () => {

    const goto = useNavigate()
    const [reload, setreload] = useState(0)
    const axiosSecure = useAxiousSecure()
    const [product, setproduct] = useState([])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        axiosSecure.get(`/pendingproducts`)
            .then(res => {
                console.log(res.data)
                setproduct(res.data)
            })
    }, [reload])


    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };


    const handleupdatestatus = (id,status) => {
       axiosSecure.patch('/')
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
                            <th>Products</th>
                            <th>Action</th>
                            <th>Action</th>
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
                                            <div className="avatar hidden sm:inline-block">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                                <div className="text-sm opacity-50">votes: {item.votes.length}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>
                                        <button onClick={() => goto(`/product/${item._id}`)} className="btn btn-ghost btn-xs bg-[#bbffe696]">View Details</button>
                                    </th>
                                    <th>
                                        <button onClick={() => handleupdate(item)} className="btn btn-ghost btn-xs bg-[#debbff96]">Make Featured</button>
                                    </th>
                                    <th>
                                        <button onClick={() => handledelet(item)} className="btn btn-ghost btn-xs bg-[#bbe4ff96]">Accept</button>
                                    </th>
                                    <th>
                                        <button onClick={() => handledelet(item)} className="btn btn-ghost btn-xs bg-[#ffbbbb96]">Reject</button>
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

export default ProductReview;
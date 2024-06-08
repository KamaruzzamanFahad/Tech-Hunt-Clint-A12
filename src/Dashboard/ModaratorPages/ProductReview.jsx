import React, { useContext, useEffect, useState } from 'react';
import useAxiousSecure from '../../hooks/useAxiousSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ProductReview = () => {

    const goto = useNavigate()
    const [reload, setreload] = useState(0)
    const axiosSecure = useAxiousSecure()
    const [product, setproduct] = useState([])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        axiosSecure.get(`/pendingproducts`)
            .then(res => {
                setproduct(res.data)
            })
    }, [reload])



    const handleupdatestatus = (id, status) => {
        axiosSecure.patch('/product-status-update', { status, id })
            .then(res => {
                setreload(Math.random())
                if (res.data.modifiedCount > 0) {
                    setreload(Math.random())
                    Swal.fire({
                        title: "Status Updated",
                        text: "Status Successfully Updated",
                        icon: "success"
                    });
                }
            })
    }



    return (
        <div className='w-full md:px-40 md:mt-20'>
            <Helmet>
                <title>Product Review</title>
            </Helmet>
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
                                                <div className="text-sm opacity-50">Status: {item.Status}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>
                                        <button onClick={() => goto(`/product/${item._id}`)} className="btn btn-ghost btn-xs bg-[#bbffe696]">View Details</button>
                                    </th>
                                    <th>
                                        <button disabled={item.Status == 'featured' ? true : false} onClick={() => handleupdatestatus(item._id, 'featured')} className="btn btn-ghost btn-xs bg-[#debbff96]">Make Featured</button>
                                    </th>
                                    <th>
                                        <button disabled={item.Status == 'accepted' ? true : false} onClick={() => handleupdatestatus(item._id, 'accepted')} className="btn btn-ghost btn-xs bg-[#bbe4ff96]">Accept</button>
                                    </th>
                                    <th>
                                        <button disabled={item.Status == 'rejected' ? true : false} onClick={() => handleupdatestatus(item._id, 'rejected')} className="btn btn-ghost btn-xs bg-[#ffbbbb96]">Reject</button>
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
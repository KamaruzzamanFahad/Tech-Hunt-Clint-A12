import React, { useContext, useEffect, useState } from 'react';
import useAxiousSecure from '../../hooks/useAxiousSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ReportContent = () => {

    const goto = useNavigate()
    const [reload, setreload] = useState(0)
    const axiosSecure = useAxiousSecure()
    const [product, setproduct] = useState([])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        axiosSecure.get(`/report`)
            .then(res => {
                setproduct(res.data)
            })
    }, [reload])


    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };


    const handledelet = (reporedid, _id) => {
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
                axiosSecure.delete(`/deletmyproduct?id=${reporedid}`)
                    .then(res => {
                        setreload(Math.random())
                        if (res.data.deletedCount > 0) {
                            axiosSecure.delete(`/report?id=${_id}`)
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
                    })
            }
        });
    }

    return (
        <div className='w-full md:px-40 md:mt-20'>
            <Helmet>
                <title>Reported Content</title>
            </Helmet>
            <div className="overflow-x-auto w-full ">
                <table className="table w-full ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Reported Products</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product.map((item, i) => (
                                <tr>
                                    <td>
                                        <p>{item.reportedProductName}</p>
                                    </td>
                                    <th>
                                        <button onClick={() => goto(`/product/${item.reportedProductId}`)} className="btn btn-ghost btn-xs bg-[#bbffe696]">View Details</button>
                                    </th>
                                    <th>
                                        <button disabled={item.Status == 'featured' ? true : false} onClick={() => handledelet(item.reportedProductId, item._id)} className="btn btn-ghost btn-xs bg-[#debbff96]">Delete</button>
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

export default ReportContent;
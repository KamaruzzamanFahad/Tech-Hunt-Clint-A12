import React, { useContext, useEffect, useState } from 'react';
import useAxiousSecure from '../../hooks/useAxiousSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const MyProduct = () => {
    const axiosSecure = useAxiousSecure()
    const [product, setproduct] = useState([])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        axiosSecure.get(`/myproduct?email=${user.email}`)
            .then(res => {
                console.log(res.data)
                setproduct(res.data)
            })
    }, [])


        const [isOpen, setIsOpen] = useState(false);
      
        const toggleDrawer = () => {
          setIsOpen(!isOpen);
        };
        
    return (
        <div className='w-full md:px-40 md:mt-20'>

            


            <div className="overflow-x-auto w-full ">
                <table className="table w-full ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Products</th>
                            <th>Status</th>
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
                                                <div className="text-sm opacity-50">votes: {item.votes}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm -ml-2">{item.Status}</span>
                                    </td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs bg-[#bbf5ff96]">Update</button>
                                    </th>
                                    <th>
                                        <button className="btn btn-ghost btn-xs bg-[#ffbbbb96]">Delete</button>
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

export default MyProduct;
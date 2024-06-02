import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'

import { Helmet } from "react-helmet-async";
// import usePostData from '../CustomHooks/usePostData';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';

const AddProducts = () => {
    const ImgBBKey = import.meta.env.VITE_imgbbApi;
    const ImgBBApi = `https://api.imgbb.com/1/upload?key=${ImgBBKey}`

    const { user } = useContext(AuthContext)

    const handlesubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const detils = form.detils.value;
        const image = form.image.value;
        const OwnerName = user.displayName;
        const OwnerEmail = user.email;
        const OwnerImage = user.photoURL;
        const item = { name, detils, image, OwnerName, OwnerEmail, OwnerImage }
        console.log(item)

        axios.post('https://server-electronic-item-repairing-services.vercel.app/AddService', item, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    form.reset();
                    Swal.fire({
                        title: 'Success !',
                        text: 'Service Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }
            })




    }


    return (
        <div className='px-[0%] sm:px-[10%]  w-full pt-40'>
            <Helmet>
                <title>Add Product </title>
            </Helmet>
            <div className=' p-12 px-5 md:px-20 rounded-3xl bg-[#2dcafa2d]'>

                <form onSubmit={handlesubmit} action="" className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>

                    <div className='md:col-span-2'>
                        <h2 className='mb-2 font-semibold'>Product Image</h2>
                        <input type="file" className="file-inpu file-input-bordered w-full" />
                    </div>
                    <div className='md:col-span-2'>
                        <h2 className='mb-2 font-semibold'>Product Name</h2>
                        <input required className='w-full p-2 outline-none' type="text" placeholder='Enter Product Name' name='name' />
                    </div>
                    <div className='md:col-span-2'>
                        <h2 className='mb-2 font-semibold'>Description</h2>
                        <textarea required className='w-full p-2 outline-none' name="detils" cols="30" rows="5" placeholder='Enter Product Description'></textarea>

                    </div>
                    <button className='md:col-span-2 bg-[#2dcafa] text-[#ffffff] rounded-xl font-bold'>Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProducts;
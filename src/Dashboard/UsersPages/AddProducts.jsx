import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'

import { Helmet } from "react-helmet-async";
// import usePostData from '../CustomHooks/usePostData';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';

import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'
import useAxiousSecure from '../../hooks/useAxiousSecure';


const AddProducts = () => {
    const ImgBBKey = import.meta.env.VITE_imgbbApi;
    const ImgBBApi = `https://api.imgbb.com/1/upload?key=${ImgBBKey}`

    const { user } = useContext(AuthContext)
    const [tags, setTags] = useState([]);

    const handleChange = (tags) => {
        setTags(tags);
    };

    const axiosSecure = useAxiousSecure()

    const handlesubmit = async (event) => {
        event.preventDefault();
        const form = event.target;


        const Image = form.image.files[0];
        console.log(Image)
        console.log(ImgBBApi)

        const formData = new FormData();
        // console.log(formData)
        formData.append("image", Image);
        console.log(formData.append)
        const res = await axios.post(ImgBBApi, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success && res.data.data.url) {
            const name = form.name.value;
            const image = res.data.data.url;
            const detils = form.detils.value;
            const ProductLink = form.ProductLink.value;
            const OwnerName = user.displayName;
            const OwnerEmail = user.email;
            const OwnerImage = user.photoURL;
            const Tags = tags;
            const Time = new Date();
            const Status = 'pending';
            const votes = 0;
            const item = { name, detils, ProductLink, Tags, image, OwnerName, OwnerEmail, OwnerImage, Time, Status, votes }
            console.log(item)

            axiosSecure.post('/addproduct', item,)
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


        // const response = await axios.post(
        //     'https://api.cloudinary.com/v1_1/dczzan7us/image/upload', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     auth: {
        //         username: '788574336458564',
        //         password: '23N6RtNkRYQuthVOTIaJAHCfaOw'
        //     }
        // }
        // );
        // console.log(response)
    }

    return (
        <div className='px-[0%] sm:px-[10%]  w-full md:pt-10'>
            <Helmet>
                <title>Add Product </title>
            </Helmet>
            <div className=' p-12 px-5 md:px-20 rounded-3xl bg-[#2dcafa2d]'>

                <form onSubmit={handlesubmit} action="" className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>

                    <div className='md:col-span-2'>
                        <h2 className='mb-2 font-semibold'>Product Image</h2>
                        <input type="file" name='image' required className="file-inpu file-input-bordered w-full" />
                    </div>
                    <div className='md:col-span-2'>
                        <h2 className='mb-2 font-semibold'>Product Name</h2>
                        <input required className='w-full p-2 outline-none' type="text" placeholder='Enter Product Name' name='name' />
                    </div>
                    <div className='md:col-span-2'>
                        <h2 className='mb-2 font-semibold'>Description</h2>
                        <textarea required className='w-full p-2 outline-none' name="detils" cols="30" rows="5" placeholder='Enter Product Description'></textarea>
                    </div>
                    <div className='md:col-span-2'>
                        <h2 className='mb-2 font-semibold'>Product Link</h2>
                        <input required className='w-full p-2 outline-none' type="text" placeholder='Enter Product Link' name='ProductLink' />
                    </div>
                    <div>
                        <h2 className='mb-2 font-semibold'>Tag</h2>
                        <TagsInput required value={tags} onChange={handleChange} />
                    </div>
                    <button className='md:col-span-2 bg-[#2dcafa] text-[#ffffff] rounded-xl font-bold'>Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProducts;
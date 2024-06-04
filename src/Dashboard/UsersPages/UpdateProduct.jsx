import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'

import { Helmet } from "react-helmet-async";
// import usePostData from '../CustomHooks/usePostData';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';

import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'
import useAxiousSecure from '../../hooks/useAxiousSecure';
import { useParams } from 'react-router-dom';


const UpdateProduct = () => {
    const axiosSecure = useAxiousSecure()
    const ImgBBKey = import.meta.env.VITE_imgbbApi;
    const ImgBBApi = `https://api.imgbb.com/1/upload?key=${ImgBBKey}`

    const { user } = useContext(AuthContext)
    const [tags, setTags] = useState([]);

    const handleChange = (tags) => {
        setTags(tags);
    };
    const [product, setprodut] = useState({})
    const { id } = useParams()
    useEffect(() => {
        axiosSecure.get(`singleproduct?id=${id}`)
            .then(res => {
                setprodut(res.data)
                setTags(res.data.Tags)
                console.log(res.data)
            })
    }, [])

    const handlesubmit = async (event) => {

        event.preventDefault();
        const form = event.target;

        if (form.image.files[0]) {
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
                const detils = form.detils.value;
                const ProductLink = form.ProductLink.value;
                const OwnerName = user.displayName;
                const OwnerEmail = user.email;
                const OwnerImage = user.photoURL;
                const Tags = tags;
                const Time = product.Time
                const Status = product.Status;
                const votes = product.votes;
                const image = res.data.data.url;
                const item = { name, detils, ProductLink, image, Tags, OwnerName, OwnerEmail, OwnerImage, Time, Status, votes }
                axiosSecure.patch(`/updateproduct?id=${product._id}`, item,)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            form.reset();
                            Swal.fire({
                                title: 'Success !',
                                text: 'Service Updated Successfully',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                            })
                        }
                    })

            }
        }
        else {
            const name = form.name.value;
            const detils = form.detils.value;
            const ProductLink = form.ProductLink.value;
            const OwnerName = user.displayName;
            const OwnerEmail = user.email;
            const OwnerImage = user.photoURL;
            const Tags = tags;
            const Time = product.Time
            const Status = product.Status;
            const votes = product.votes;
            const image = product.image;
            const item = { name, detils, ProductLink, image, Tags, OwnerName, OwnerEmail, OwnerImage, Time, Status, votes }
            axiosSecure.patch(`/updateproduct?id=${product._id}`, item,)
                .then(res => {
                    console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        form.reset();
                        Swal.fire({
                            title: 'Success !',
                            text: 'Service Updated Successfully',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                    }
                })
        }
    }



    return (
        <div className='px-[0%] sm:px-[10%]  w-full md:pt-10'>
            <Helmet>
                <title>Update Product </title>
            </Helmet>

            <h1 className='text-center mb-5 text-4xl md:text-5xl'>Update Product</h1>
            <div className=' p-12 px-5 md:px-20 rounded-3xl bg-[#2dcafa2d]'>

                <form onSubmit={handlesubmit} action="" className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>

                    <div className='md:col-span-2'>
                        <h2 className='mb-2 font-semibold'>Product Image</h2>
                        <input type="file" name='image' className="file-inpu file-input-bordered w-full" />
                    </div>
                    <div className='md:col-span-2'>
                        <h2 className='mb-2 font-semibold'>Product Name</h2>
                        <input defaultValue={product.name} required className='w-full p-2 outline-none' type="text" placeholder='Enter Product Name' name='name' />
                    </div>
                    <div className='md:col-span-2'>
                        <h2 className='mb-2 font-semibold'>Description</h2>
                        <textarea defaultValue={product.detils} required className='w-full p-2 outline-none' name="detils" cols="30" rows="5" placeholder='Enter Product Description'></textarea>
                    </div>
                    <div className='md:col-span-2'>
                        <h2 className='mb-2 font-semibold'>Product Link</h2>
                        <input defaultValue={product.ProductLink} required className='w-full p-2 outline-none' type="text" placeholder='Enter Product Link' name='ProductLink' />
                    </div>
                    <div>
                        <h2 className='mb-2 font-semibold'>Tag</h2>
                        <TagsInput required value={tags} onChange={handleChange} />
                    </div>
                    <button className='md:col-span-2 bg-[#2dcafa] text-[#ffffff] rounded-xl font-bold'>Update Product</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiousSecure from '../hooks/useAxiousSecure';
import { AuthContext } from '../Provider/AuthProvider';
import { BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import { MdOutlineReport, MdReport } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import ReactStarsRating from 'react-awesome-stars-rating';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const ProductDetils = () => {
    const { id } = useParams()
    const axiosSecure = useAxiousSecure()
    const [data, setdata] = useState(null)
    const [reviews, setreviews] = useState([])
    const { user } = useContext(AuthContext)
    const [reload, setreload] = useState(0)
    const [rating, setRating] = useState(0)
    const [screensize, setscreensize] = useState(0)
    useEffect(() => {
        axiosSecure.get(`/singleproduct?id=${id}`)
            .then(res => {
                setdata(res.data)

                axiosSecure.get(`/reviews?id=${res.data._id}`)
                    .then(res => {
                        setreviews(res.data)
                    })
            })
    }, [reload])



    const upvotehandle = (id) => {
        const email = user?.email;
        if (user && user?.email) {
            axiosSecure.patch('/upvote', { email, id })
                .then(res => {
                    setreload(Math.random())
                })
        }
        else {
            goto('/login')
        }
    }

    const handlereport = (id) => {
        const email = user?.email;
        const name = data.name;
        if (user && user?.email) {
            axiosSecure.post('/report', { email, id, name })
                .then(res => {
                    setreload(Math.random())
                    setreload(Math.random())
                    toast.success('reported')
                })
        }
        else {
            goto('/login')
        }
    }



    const handleratting = (event) => {
        event.preventDefault();
        const fromma = event.target;
        const name = user.displayName;
        const image = user.photoURL;
        const review = fromma.review.value;
        const ratting = rating;
        const productid = data._id;
        const item = { productid, name, image, review, ratting }
        axiosSecure.post(`/add-product-review?id=${data._id}`, item)
            .then(res => {
                if (res.data.insertedId) {
                    setreload(Math.random())
                    Swal.fire({
                        title: "Good job!",
                        text: "Your Reviews has been added!",
                        icon: "success"
                    });
                }

            })
    }
    window.addEventListener('resize', () => {
        setscreensize(window.innerWidth)
    });


    if (data) {
        const { _id, name, image, detils, Tags, ProductLink, votes, OwnerEmail, Report } = data;
        return (
            <div>
                <Helmet>
                    <title>Products Detils</title>
                </Helmet>
                <div className='flex flex-col xl:flex-row md:px-20 py-10 gap-10'>
                    <div className='w-full xl:w-[50%]'>
                        <img src={image} alt="" className='w-full' />
                    </div>
                    <div className='w-full xl:w-[50%]'>
                        <h1>{name}</h1>
                        <h2 className='text-xl mt-3 mb-3'>{detils}</h2>
                        {
                            Tags.map((item, i) => (
                                <li key={i}><a className='text-lg'>#{item}</a></li>
                            ))
                        }
                        <h2 className='text-xl mt-3 mb-3'>ProductLink <a target='_blank' href={ProductLink}>{ProductLink}</a></h2>
                        <div className='flex flex-wrap items-center w-full mt-4'>
                            <Link className='mr-5' target='_blank' to={ProductLink}>
                                <button className='text-xl w-full bg-[#034ea2] text-white'>Visit NOw</button>
                            </Link>

                            <div disabled={OwnerEmail == user?.email && true} onClick={() => upvotehandle(_id)} className={`btn bg-[#C2F3FD] hover:bg-transparent`}>Upvote
                                {votes?.includes(user?.email) ? <BiSolidUpvote className='text-2xl' /> : <BiUpvote className='text-2xl' />}
                                <span>{votes?.length}</span>
                            </div>
                            <div className='px-3'></div>


                            <div disabled={OwnerEmail == user?.email || Report?.includes(user?.email) && true} onClick={() => handlereport(_id)} className={`btn bg-[#C2F3FD] hover:bg-transparent mt-3 sm:mt-0`}>Report
                                {Report?.includes(user?.email) ? <MdReport className='text-2xl ' /> : <MdOutlineReport className='text-2xl' />}
                            </div>
                        </div>

                        <div className='mt-5  '>
                            <h1 className='text-3xl py-2'>Reviews: {reviews ? reviews.length : ''}</h1>
                            <Swiper
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={screensize < 690 ? 2 : 3}
                                coverflowEffect={{
                                    rotate: 10,
                                    stretch: -50,
                                    depth: 50,
                                    modifier: 1,
                                    slideShadows: true,
                                }}
                                pagination={true}
                                modules={[EffectCoverflow, Pagination]}
                                className="mySwiper"

                            >
                                {
                                    reviews ?
                                        reviews.map((item, i) => (
                                            <SwiperSlide key={i} className=''>
                                                <div className='rounded-lg p-5 border-[1px] border-[#00000024] '>
                                                    <div className="rating mb-3 w-96">
                                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"
                                                            checked={item.ratting == 1 && true} />
                                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"
                                                            checked={item.ratting == 2 && true} />
                                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"
                                                            checked={item.ratting == 3 && true} />
                                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"
                                                            checked={item.ratting == 4 && true} />
                                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"
                                                            checked={item.ratting == 5 && true} />
                                                    </div>
                                                    <h2>“{item.review}”</h2>
                                                    <div className='flex items-center gap-4 mt-2'>
                                                        <img src={item.image} alt="" className='avatar w-10 rounded-full' />
                                                        <p>{item.name}</p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))

                                        : <p>there are no reviews for this product</p>
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className='md:px-20'>
                    <h1 className='text-3xl py-2'>Post Reviews:</h1>
                    <form onSubmit={handleratting}>
                        <label className='mb-2'>Name</label>
                        <input readOnly value={user.displayName} type="text" placeholder="Type here" className="input input-bordered w-full my-2 mb-2" />
                        <label className='mb-2'>Image</label>
                        <input readOnly value={user.photoURL} type="text" placeholder="Type here" className="input input-bordered w-full mt-1 mb-2" />
                        <label className='mb-2'>Review</label>
                        <textarea name='review' required className="textarea textarea-bordered w-full my-2" placeholder="Write Your Review heare"></textarea>
                        <label className='mb-2'>Ratting</label>
                        <br />
                        <div className="rating">
                            <input type="radio" onChange={() => setRating(1)} name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                            <input type="radio" onChange={() => setRating(2)} name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" onChange={() => setRating(3)} name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" onChange={() => setRating(4)} name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" onChange={() => setRating(5)} name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <br />
                        <button disabled={rating ? false : true} className={rating ? ` w-full my-4 bg-[#29C4FB]` : `w-full my-4 bg-[#5b7883]`}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }

};

export default ProductDetils;
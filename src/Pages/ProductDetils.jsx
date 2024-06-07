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
const ProductDetils = () => {
    const { id } = useParams()
    const axiosSecure = useAxiousSecure()
    const [data, setdata] = useState(null)
    const { user } = useContext(AuthContext)
    const [reload, setreload] = useState(0)
    useEffect(() => {
        axiosSecure.get(`/singleproduct?id=${id}`)
            .then(res => {
                console.log(res.data)
                setdata(res.data)
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
            console.log('goto')
        }
    }

    const review = [1, 2, 3, 4];

    if (data) {
        const { _id, name, image, detils, Tags, ProductLink, votes, OwnerEmail } = data;
        return (
            <div>
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
                        <div className='flex w-full mt-4'>
                            <Link className='w-full mr-5' target='_blank' to={ProductLink}>
                                <button className='text-xl w-full bg-[#034ea2] text-white'>Visit NOw</button>
                            </Link>

                            <div disabled={OwnerEmail == user?.email && true} onClick={() => upvotehandle(_id)} className={`btn bg-[#C2F3FD] hover:bg-transparent`}>Upvote
                                {votes?.includes(user?.email) ? <BiSolidUpvote className='text-2xl' /> : <BiUpvote className='text-2xl' />}
                                <span>{votes?.length}</span>
                            </div>
                            <div className='px-3'></div>
                            <div disabled={OwnerEmail == user?.email && true} onClick={() => upvotehandle(_id)} className={`btn bg-[#C2F3FD] hover:bg-transparent`}>Report
                                {votes?.includes(user?.email) ? <MdOutlineReport className='text-2xl' /> : <MdReport className='text-2xl' />}
                                <span>{votes?.length}</span>
                            </div>
                        </div>

                        <div className='mt-5  '>
                            <h1 className='text-3xl py-2'>Reviews:</h1>
                            <Swiper
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={3}
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
                                    review.map((index, i) => (
                                        <SwiperSlide className=''>
                                            <div className='rounded-lg p-5 border-[1px] border-[#00000024]'>
                                                <div className="rating mb-3 w-96">
                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                </div>
                                                <h2>“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page,”</h2>
                                                <div className='flex items-center gap-4 mt-2'>
                                                    <img src="/techhunt.png" alt="" className='avatar w-20' />
                                                    <p>name</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className='md:px-20'>
                    <h1 className='text-3xl py-2'>Post Reviews:</h1>
                    <form>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        <textarea className="textarea textarea-bordered" placeholder="Bio"></textarea>
                        
                    </form>
                </div>
            </div>
        );
    }

};

export default ProductDetils;
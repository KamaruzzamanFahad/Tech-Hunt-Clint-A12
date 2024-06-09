import React, { useEffect, useState, useRef } from 'react';
import Banner from '../Commponents/Banner';
import FeaturedProducts from '../Commponents/FeaturedProducts';
import TrandingProducts from '../Commponents/TrandingProducts';
import { Helmet } from 'react-helmet-async';
import useAxiousSecure from '../hooks/useAxiousSecure';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules'

const Home = () => {
    const [cupondata, setcupondata] = useState([])
    const axiosSecure = useAxiousSecure()
    useEffect(() => {
        axiosSecure.get('/cupon')
            .then(res => setcupondata(res.data))
    }, [])

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrandingProducts></TrandingProducts>
            <h1 className='text-center text-4xl mb-10 mt-5'>Membership Discount Coupon</h1>
            <div className='flex justify-center items-center mb-20'>

                <div className='w-[370px] sm:w-[450px]'>

                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"
                    >
                        {
                            cupondata.map((item, i) => (

                                <SwiperSlide>
                                    <div key={i} className='w-[420px] relative'>
                                        <img src="/cuponn.png" alt="" />
                                        <h1 className='absolute top-16 left-12 Lato font-extrabold text-6xl text-white'>${item.DiscountAmount}</h1>
                                        <h1 className='absolute top-11 right-[54px] Lato font-bold text-[33px] text-[#d98d1a]'>{item.CouponCode}</h1>
                                        <p className='absolute top-[85px] right-[50px] Lato font-normal text-[11px] uppercase text-[#d98d1a]'>Exp on: {item.ExpiryDate}</p>
                                        <p className='absolute top-[90px] right-[44px] Lato font-normal text-[15px]  uppercase text-[#000000]'>. . . . . . . . . . . . . . . . . . . .</p>
                                        <p className='absolute top-[115px] right-[42px] Lato font-normal text-[10px] w-[120px] text-center text-[#d98d1a]'>{item.CouponDescription},</p>
                                    </div>
                                </SwiperSlide>

                            ))
                        }

                    </Swiper>


                </div>
            </div>
        </div>
    );
};

export default Home;
import React, { useEffect, useState } from 'react';
import { BiUpvote } from 'react-icons/bi';
import useAxiousPublic from '../hooks/useAxiousPublic';

const FeaturedProducts = () => {
    const axiosPublic = useAxiousPublic()
    const [product, setproduct] = useState([])
    useEffect(() => {
        axiosPublic.get('/product')
            .then(res => {
                setproduct(res.data)
            })
    }, [])
    return (
        <div className='mt-20 mb-16'>
            <h1 className='text-center text-4xl'>Featured Products</h1>

            <div className='flex justify-around flex-wrap  gap-5 mt-10'>
                {
                    product.map((item, i) => (
                        <div key={i} className='flex flex-col w-72 rounded-xl bg-[#E2FBFF]'>
                            <img src={item.image} alt="" className='rounded-t-xl  h-60' />
                            <h1 className='text-left text-2xl w-full p-2 m-0'>{item.name}</h1>
                            <h4 className='p-2 text-[#0F98FB]'><span className='text-black'>Tages:</span> {item.Tags.map((item) => ` #${item}`)}</h4>
                            <div className='flex justify-end pb-5 pr-5'>
                                <div className='btn bg-[#C2F3FD] hover:bg-transparent'>
                                    <BiUpvote className='text-2xl' />
                                    <span>00</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FeaturedProducts;
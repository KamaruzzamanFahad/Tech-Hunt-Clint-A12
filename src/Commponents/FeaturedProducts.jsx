import React, { useContext, useEffect, useState } from 'react';
import { BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import useAxiousPublic from '../hooks/useAxiousPublic';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiousSecure from '../hooks/useAxiousSecure';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
    const goto = useNavigate()
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiousPublic()
    const axiosSecure = useAxiousSecure()
    const [product, setproduct] = useState([])
    const [reload, setreload] = useState(0)

    useEffect(() => {
        axiosPublic.get('/product')
            .then(res => {
                setproduct(res.data)
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
                                <div disabled={item.OwnerEmail == user?.email && true} onClick={() => upvotehandle(item._id)} className={`btn bg-[#C2F3FD] hover:bg-transparent`}>
                                    {item?.votes?.includes(user?.email) ? <BiSolidUpvote className='text-2xl' /> : <BiUpvote className='text-2xl' />}
                                    <span>{item.votes.length}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    );
};

export default FeaturedProducts;
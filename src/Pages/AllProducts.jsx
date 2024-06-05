
import React, { useContext, useEffect, useState } from 'react';
import { BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import useAxiousPublic from '../hooks/useAxiousPublic';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiousSecure from '../hooks/useAxiousSecure';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
    const goto = useNavigate()
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiousPublic()
    const axiosSecure = useAxiousSecure()
    const [product, setproduct] = useState([])
    const [reload, setreload] = useState(0)

    useEffect(() => {
        axiosPublic.get('/products')
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


    const [text, settext] = useState([])

    const handlesearch = (e) => {
        settext(e.target.value)

    }

    useEffect(() => {
        axiosPublic.get(`/products-serch?text=${text}`)
            .then(res => {
                setproduct(res.data)
            })
    }, [text])


    //pagination
    const [count, setcount] = useState(0)
    useEffect(() => {
        axiosPublic.get('/productcount')
            .then(res => {
                setcount(res.data.count)
            })
    }, [])
    const productperpage = 4;
    const totalpage = (Math.ceil(parseInt(count) / productperpage))
    const pages = [];
    for (let i = 0; i < totalpage; i++) {
        pages.push(i)
    }
    return (
        <div className='mt-10 mb-16'>
            <div data-aos="fade-up"
                data-aos-duration="800" className='flex flex-col justify-center items-center'>
                <form data-aos="fade-up"
                    data-aos-duration="800" className="input input-bordered flex items-center gap-2 w-[90%] md:w-[50%]">
                    <input onChange={handlesearch} name='search' type="text" placeholder="Search" className="input w-full border-none" required />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </form>
            </div>
            {/* <h1 className='text-center text-4xl'>All Products</h1> */}

            <div className='grid grid-cols-3  gap-5 mt-10'>
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
            <div className='flex justify-center mt-10 mb-10'>
                {
                    pages.map((item, i) => (
                        <button className=' rounded-md border-2 border-[#109AFB] p-2 px-4'>1</button>
                    ))
                }
            </div>
        </div >
    );
};

export default AllProducts;